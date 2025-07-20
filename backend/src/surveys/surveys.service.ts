import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyStatus } from '@shared/types';

@Injectable()
export class SurveysService {
  private readonly logger = new Logger(SurveysService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createSurveyDto: CreateSurveyDto, userId: string) {
    const survey = await this.prisma.survey.create({
      data: {
        ...createSurveyDto,
        createdById: userId,
        settings: createSurveyDto.settings || {},
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        questions: {
          include: {
            options: true,
            logic: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    this.logger.log(`Survey created: ${survey.id} by user: ${userId}`);
    return survey;
  }

  async findAll(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [surveys, total] = await Promise.all([
      this.prisma.survey.findMany({
        where: {
          createdById: userId,
        },
        skip,
        take: limit,
        include: {
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          _count: {
            select: {
              questions: true,
              responses: true,
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      this.prisma.survey.count({
        where: {
          createdById: userId,
        },
      }),
    ]);

    return {
      data: surveys,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string, userId?: string) {
    const survey = await this.prisma.survey.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        questions: {
          include: {
            options: {
              orderBy: {
                order: 'asc',
              },
            },
            logic: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        _count: {
          select: {
            responses: true,
          },
        },
      },
    });

    if (!survey) {
      throw new NotFoundException('Survey not found');
    }

    // Check if user has access to this survey
    if (userId && survey.createdById !== userId) {
      // Check if survey is public or user has team access
      if (survey.status !== SurveyStatus.PUBLISHED) {
        throw new ForbiddenException('Access denied to this survey');
      }
    }

    return survey;
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto, userId: string) {
    const survey = await this.findOne(id, userId);

    if (survey.createdById !== userId) {
      throw new ForbiddenException('You can only update your own surveys');
    }

    const updatedSurvey = await this.prisma.survey.update({
      where: { id },
      data: updateSurveyDto,
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        questions: {
          include: {
            options: true,
            logic: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    this.logger.log(`Survey updated: ${id} by user: ${userId}`);
    return updatedSurvey;
  }

  async publish(id: string, userId: string) {
    const survey = await this.findOne(id, userId);

    if (survey.createdById !== userId) {
      throw new ForbiddenException('You can only publish your own surveys');
    }

    if (survey.status === SurveyStatus.PUBLISHED) {
      throw new ForbiddenException('Survey is already published');
    }

    const publishedSurvey = await this.prisma.survey.update({
      where: { id },
      data: {
        status: SurveyStatus.PUBLISHED,
        publishedAt: new Date(),
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        questions: {
          include: {
            options: true,
            logic: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    this.logger.log(`Survey published: ${id} by user: ${userId}`);
    return publishedSurvey;
  }

  async close(id: string, userId: string) {
    const survey = await this.findOne(id, userId);

    if (survey.createdById !== userId) {
      throw new ForbiddenException('You can only close your own surveys');
    }

    const closedSurvey = await this.prisma.survey.update({
      where: { id },
      data: {
        status: SurveyStatus.CLOSED,
        closedAt: new Date(),
      },
    });

    this.logger.log(`Survey closed: ${id} by user: ${userId}`);
    return closedSurvey;
  }

  async duplicate(id: string, userId: string) {
    const originalSurvey = await this.findOne(id, userId);

    if (originalSurvey.createdById !== userId) {
      throw new ForbiddenException('You can only duplicate your own surveys');
    }

    const duplicatedSurvey = await this.prisma.survey.create({
      data: {
        title: `${originalSurvey.title} (Copy)`,
        description: originalSurvey.description,
        settings: originalSurvey.settings,
        createdById: userId,
        questions: {
          create: originalSurvey.questions.map((question) => ({
            type: question.type,
            title: question.title,
            description: question.description,
            required: question.required,
            order: question.order,
            config: question.config,
            options: {
              create: question.options.map((option) => ({
                label: option.label,
                value: option.value,
                order: option.order,
                isOther: option.isOther,
              })),
            },
            logic: {
              create: question.logic.map((logic) => ({
                condition: logic.condition,
                action: logic.action,
                targetQuestionId: logic.targetQuestionId,
                value: logic.value,
              })),
            },
          })),
        },
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        questions: {
          include: {
            options: true,
            logic: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    this.logger.log(`Survey duplicated: ${id} -> ${duplicatedSurvey.id} by user: ${userId}`);
    return duplicatedSurvey;
  }

  async remove(id: string, userId: string) {
    const survey = await this.findOne(id, userId);

    if (survey.createdById !== userId) {
      throw new ForbiddenException('You can only delete your own surveys');
    }

    await this.prisma.survey.delete({
      where: { id },
    });

    this.logger.log(`Survey deleted: ${id} by user: ${userId}`);
    return { message: 'Survey successfully deleted' };
  }

  async getPublicSurvey(id: string) {
    const survey = await this.prisma.survey.findUnique({
      where: {
        id,
        status: SurveyStatus.PUBLISHED,
      },
      include: {
        questions: {
          include: {
            options: {
              orderBy: {
                order: 'asc',
              },
            },
            logic: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!survey) {
      throw new NotFoundException('Survey not found or not published');
    }

    return survey;
  }
}
