import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SurveysService } from '../surveys/surveys.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';

@Injectable()
export class ResponsesService {
  private readonly logger = new Logger(ResponsesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly surveysService: SurveysService,
  ) {}

  async create(createResponseDto: CreateResponseDto, userId?: string, ipAddress?: string, userAgent?: string) {
    const { surveyId, answers, metadata } = createResponseDto;

    // Verify survey exists and is published
    const survey = await this.surveysService.getPublicSurvey(surveyId);

    // Check if multiple responses are allowed
    if (!survey.settings?.allowMultipleResponses && userId) {
      const existingResponse = await this.prisma.response.findFirst({
        where: {
          surveyId,
          userId,
        },
      });

      if (existingResponse) {
        throw new BadRequestException('Multiple responses not allowed for this survey');
      }
    }

    // Create response with answers
    const response = await this.prisma.response.create({
      data: {
        surveyId,
        userId,
        ipAddress,
        userAgent,
        metadata: metadata || {},
        isComplete: true,
        completedAt: new Date(),
        answers: {
          create: answers.map((answer) => ({
            questionId: answer.questionId,
            value: answer.value,
          })),
        },
      },
      include: {
        answers: {
          include: {
            question: {
              select: {
                id: true,
                type: true,
                title: true,
              },
            },
          },
        },
        survey: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    this.logger.log(`Response created: ${response.id} for survey: ${surveyId}`);
    return response;
  }

  async createDraft(surveyId: string, userId?: string, ipAddress?: string, userAgent?: string) {
    // Verify survey exists and is published
    await this.surveysService.getPublicSurvey(surveyId);

    const response = await this.prisma.response.create({
      data: {
        surveyId,
        userId,
        ipAddress,
        userAgent,
        metadata: {},
        isComplete: false,
      },
    });

    this.logger.log(`Draft response created: ${response.id} for survey: ${surveyId}`);
    return response;
  }

  async updateDraft(id: string, updateResponseDto: UpdateResponseDto) {
    const response = await this.prisma.response.findUnique({
      where: { id },
    });

    if (!response) {
      throw new NotFoundException('Response not found');
    }

    if (response.isComplete) {
      throw new BadRequestException('Cannot update completed response');
    }

    const { answers } = updateResponseDto;

    // Update or create answers
    if (answers && answers.length > 0) {
      // Delete existing answers for this response
      await this.prisma.answer.deleteMany({
        where: { responseId: id },
      });

      // Create new answers
      await this.prisma.answer.createMany({
        data: answers.map((answer) => ({
          responseId: id,
          questionId: answer.questionId,
          value: answer.value,
        })),
      });
    }

    const updatedResponse = await this.prisma.response.update({
      where: { id },
      data: {
        metadata: updateResponseDto.metadata || response.metadata,
        updatedAt: new Date(),
      },
      include: {
        answers: {
          include: {
            question: {
              select: {
                id: true,
                type: true,
                title: true,
              },
            },
          },
        },
      },
    });

    this.logger.log(`Draft response updated: ${id}`);
    return updatedResponse;
  }

  async completeDraft(id: string) {
    const response = await this.prisma.response.findUnique({
      where: { id },
      include: {
        answers: true,
      },
    });

    if (!response) {
      throw new NotFoundException('Response not found');
    }

    if (response.isComplete) {
      throw new BadRequestException('Response is already completed');
    }

    const completedResponse = await this.prisma.response.update({
      where: { id },
      data: {
        isComplete: true,
        completedAt: new Date(),
      },
      include: {
        answers: {
          include: {
            question: {
              select: {
                id: true,
                type: true,
                title: true,
              },
            },
          },
        },
        survey: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    this.logger.log(`Response completed: ${id}`);
    return completedResponse;
  }

  async findAllBySurvey(surveyId: string, userId: string, page = 1, limit = 10) {
    // Verify user owns the survey
    await this.surveysService.findOne(surveyId, userId);

    const skip = (page - 1) * limit;

    const [responses, total] = await Promise.all([
      this.prisma.response.findMany({
        where: {
          surveyId,
          isComplete: true,
        },
        skip,
        take: limit,
        include: {
          answers: {
            include: {
              question: {
                select: {
                  id: true,
                  type: true,
                  title: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: {
          completedAt: 'desc',
        },
      }),
      this.prisma.response.count({
        where: {
          surveyId,
          isComplete: true,
        },
      }),
    ]);

    return {
      data: responses,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string, userId?: string) {
    const response = await this.prisma.response.findUnique({
      where: { id },
      include: {
        answers: {
          include: {
            question: {
              select: {
                id: true,
                type: true,
                title: true,
              },
            },
          },
        },
        survey: {
          select: {
            id: true,
            title: true,
            createdById: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!response) {
      throw new NotFoundException('Response not found');
    }

    // Check if user has access to this response
    if (userId && response.survey.createdById !== userId && response.userId !== userId) {
      throw new NotFoundException('Response not found');
    }

    return response;
  }

  async remove(id: string, userId: string) {
    const response = await this.findOne(id, userId);

    // Only survey owner can delete responses
    if (response.survey.createdById !== userId) {
      throw new BadRequestException('You can only delete responses from your own surveys');
    }

    await this.prisma.response.delete({
      where: { id },
    });

    this.logger.log(`Response deleted: ${id} by user: ${userId}`);
    return { message: 'Response successfully deleted' };
  }

  async exportResponses(surveyId: string, userId: string, format: 'csv' | 'json' = 'csv') {
    // Verify user owns the survey
    await this.surveysService.findOne(surveyId, userId);

    const responses = await this.prisma.response.findMany({
      where: {
        surveyId,
        isComplete: true,
      },
      include: {
        answers: {
          include: {
            question: {
              select: {
                id: true,
                type: true,
                title: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        completedAt: 'desc',
      },
    });

    this.logger.log(`Responses exported: ${responses.length} responses for survey: ${surveyId}`);
    return {
      format,
      data: responses,
      count: responses.length,
      exportedAt: new Date(),
    };
  }
}
