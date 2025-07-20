import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    this.logger.log(`User created: ${user.email}`);
    return user;
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          avatar: true,
          isActive: true,
          emailVerified: true,
          lastLoginAt: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByPasswordResetToken(token: string) {
    return this.prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        isActive: true,
        emailVerified: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    this.logger.log(`User updated: ${updatedUser.email}`);
    return updatedUser;
  }

  async updatePassword(id: string, hashedPassword: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    this.logger.log(`Password updated for user: ${id}`);
  }

  async setPasswordResetToken(id: string, token: string, expires: Date) {
    await this.prisma.user.update({
      where: { id },
      data: {
        passwordResetToken: token,
        passwordResetExpires: expires,
      },
    });

    this.logger.log(`Password reset token set for user: ${id}`);
  }

  async resetPassword(id: string, hashedPassword: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    this.logger.log(`Password reset completed for user: ${id}`);
  }

  async resetLoginAttempts(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        loginAttempts: 0,
        lockedUntil: null,
      },
    });
  }

  async incrementLoginAttempts(id: string) {
    const maxAttempts = this.configService.get<number>('auth.lockout.maxAttempts', 5);
    const lockoutDuration = this.configService.get<number>('auth.lockout.lockoutDuration', 15 * 60 * 1000);

    const user = await this.findById(id);
    const newAttempts = user.loginAttempts + 1;

    const updateData: any = {
      loginAttempts: newAttempts,
    };

    // Lock account if max attempts reached
    if (newAttempts >= maxAttempts) {
      updateData.lockedUntil = new Date(Date.now() + lockoutDuration);
      this.logger.warn(`Account locked for user: ${id} after ${newAttempts} failed attempts`);
    }

    await this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async updateLastLogin(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }

  async deactivate(id: string) {
    const user = await this.findById(id);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        isActive: true,
        emailVerified: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    this.logger.log(`User deactivated: ${updatedUser.email}`);
    return updatedUser;
  }

  async activate(id: string) {
    const user = await this.findById(id);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { isActive: true },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        isActive: true,
        emailVerified: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    this.logger.log(`User activated: ${updatedUser.email}`);
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.findById(id);

    await this.prisma.user.delete({
      where: { id },
    });

    this.logger.log(`User deleted: ${user.email}`);
    return { message: 'User successfully deleted' };
  }
}
