import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

// Mock bcrypt
jest.mock('bcryptjs');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;
  let configService: jest.Mocked<ConfigService>;

  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'hashedPassword',
    role: 'CREATOR',
    avatar: null,
    isActive: true,
    emailVerified: false,
    emailVerifiedAt: null,
    passwordResetToken: null,
    passwordResetExpires: null,
    lastLoginAt: null,
    loginAttempts: 0,
    lockedUntil: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            resetLoginAttempts: jest.fn(),
            updateLastLogin: jest.fn(),
            incrementLoginAttempts: jest.fn(),
            updatePassword: jest.fn(),
            setPasswordResetToken: jest.fn(),
            findByPasswordResetToken: jest.fn(),
            resetPassword: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
    configService = module.get(ConfigService);

    // Setup default config values
    configService.get.mockImplementation((key: string) => {
      const config = {
        'auth.jwt.secret': 'test-secret',
        'auth.jwt.expiresIn': '7d',
        'auth.jwt.refreshSecret': 'test-refresh-secret',
        'auth.jwt.refreshExpiresIn': '30d',
        'app.bcryptRounds': 12,
      };
      return config[key];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const registerDto: RegisterDto = {
      email: 'test@example.com',
      password: 'SecurePass123!',
      firstName: 'John',
      lastName: 'Doe',
    };

    it('should successfully register a new user', async () => {
      // Arrange
      usersService.findByEmail.mockResolvedValue(null);
      mockedBcrypt.hash.mockResolvedValue('hashedPassword');
      usersService.create.mockResolvedValue(mockUser);
      jwtService.signAsync.mockResolvedValueOnce('access-token').mockResolvedValueOnce('refresh-token');

      // Act
      const result = await service.register(registerDto);

      // Assert
      expect(usersService.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(mockedBcrypt.hash).toHaveBeenCalledWith(registerDto.password, 12);
      expect(usersService.create).toHaveBeenCalledWith({
        email: registerDto.email,
        password: 'hashedPassword',
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
      });
      expect(result).toEqual({
        user: expect.objectContaining({
          id: mockUser.id,
          email: mockUser.email,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
        }),
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      // Arrange
      usersService.findByEmail.mockResolvedValue(mockUser);

      // Act & Assert
      await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
      expect(usersService.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(usersService.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'SecurePass123!',
    };

    it('should successfully login with valid credentials', async () => {
      // Arrange
      const userWithoutPassword = { ...mockUser };
      delete userWithoutPassword.password;
      
      usersService.findByEmail.mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockResolvedValue(true);
      usersService.resetLoginAttempts.mockResolvedValue(undefined);
      usersService.updateLastLogin.mockResolvedValue(undefined);
      jwtService.signAsync.mockResolvedValueOnce('access-token').mockResolvedValueOnce('refresh-token');

      // Act
      const result = await service.login(loginDto);

      // Assert
      expect(usersService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(mockedBcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
      expect(usersService.resetLoginAttempts).toHaveBeenCalledWith(mockUser.id);
      expect(usersService.updateLastLogin).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual({
        user: expect.objectContaining({
          id: mockUser.id,
          email: mockUser.email,
        }),
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      // Arrange
      usersService.findByEmail.mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockResolvedValue(false);
      usersService.incrementLoginAttempts.mockResolvedValue(undefined);

      // Act & Assert
      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(usersService.incrementLoginAttempts).toHaveBeenCalledWith(mockUser.id);
    });

    it('should throw UnauthorizedException for non-existent user', async () => {
      // Arrange
      usersService.findByEmail.mockResolvedValue(null);

      // Act & Assert
      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for inactive user', async () => {
      // Arrange
      const inactiveUser = { ...mockUser, isActive: false };
      usersService.findByEmail.mockResolvedValue(inactiveUser);
      mockedBcrypt.compare.mockResolvedValue(true);

      // Act & Assert
      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for locked account', async () => {
      // Arrange
      const lockedUser = { ...mockUser, lockedUntil: new Date(Date.now() + 10000) };
      usersService.findByEmail.mockResolvedValue(lockedUser);
      mockedBcrypt.compare.mockResolvedValue(true);

      // Act & Assert
      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('changePassword', () => {
    const changePasswordDto: ChangePasswordDto = {
      currentPassword: 'OldPass123!',
      newPassword: 'NewPass123!',
    };

    it('should successfully change password', async () => {
      // Arrange
      usersService.findById.mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockResolvedValue(true);
      mockedBcrypt.hash.mockResolvedValue('newHashedPassword');
      usersService.updatePassword.mockResolvedValue(undefined);

      // Act
      await service.changePassword(mockUser.id, changePasswordDto);

      // Assert
      expect(usersService.findById).toHaveBeenCalledWith(mockUser.id);
      expect(mockedBcrypt.compare).toHaveBeenCalledWith(changePasswordDto.currentPassword, mockUser.password);
      expect(mockedBcrypt.hash).toHaveBeenCalledWith(changePasswordDto.newPassword, 12);
      expect(usersService.updatePassword).toHaveBeenCalledWith(mockUser.id, 'newHashedPassword');
    });

    it('should throw BadRequestException for invalid current password', async () => {
      // Arrange
      usersService.findById.mockResolvedValue(mockUser);
      mockedBcrypt.compare.mockResolvedValue(false);

      // Act & Assert
      await expect(service.changePassword(mockUser.id, changePasswordDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for non-existent user', async () => {
      // Arrange
      usersService.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.changePassword('invalid-id', changePasswordDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('forgotPassword', () => {
    const forgotPasswordDto: ForgotPasswordDto = {
      email: 'test@example.com',
    };

    it('should process forgot password request for existing user', async () => {
      // Arrange
      usersService.findByEmail.mockResolvedValue(mockUser);
      usersService.setPasswordResetToken.mockResolvedValue(undefined);

      // Act
      await service.forgotPassword(forgotPasswordDto);

      // Assert
      expect(usersService.findByEmail).toHaveBeenCalledWith(forgotPasswordDto.email);
      expect(usersService.setPasswordResetToken).toHaveBeenCalledWith(
        mockUser.id,
        expect.any(String),
        expect.any(Date),
      );
    });

    it('should silently handle non-existent user', async () => {
      // Arrange
      usersService.findByEmail.mockResolvedValue(null);

      // Act
      await service.forgotPassword(forgotPasswordDto);

      // Assert
      expect(usersService.findByEmail).toHaveBeenCalledWith(forgotPasswordDto.email);
      expect(usersService.setPasswordResetToken).not.toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    const resetPasswordDto: ResetPasswordDto = {
      token: 'valid-token',
      newPassword: 'NewPass123!',
    };

    it('should successfully reset password with valid token', async () => {
      // Arrange
      const userWithResetToken = {
        ...mockUser,
        passwordResetToken: 'valid-token',
        passwordResetExpires: new Date(Date.now() + 10000),
      };
      usersService.findByPasswordResetToken.mockResolvedValue(userWithResetToken);
      mockedBcrypt.hash.mockResolvedValue('newHashedPassword');
      usersService.resetPassword.mockResolvedValue(undefined);

      // Act
      await service.resetPassword(resetPasswordDto);

      // Assert
      expect(usersService.findByPasswordResetToken).toHaveBeenCalledWith(resetPasswordDto.token);
      expect(mockedBcrypt.hash).toHaveBeenCalledWith(resetPasswordDto.newPassword, 12);
      expect(usersService.resetPassword).toHaveBeenCalledWith(mockUser.id, 'newHashedPassword');
    });

    it('should throw BadRequestException for invalid token', async () => {
      // Arrange
      usersService.findByPasswordResetToken.mockResolvedValue(null);

      // Act & Assert
      await expect(service.resetPassword(resetPasswordDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for expired token', async () => {
      // Arrange
      const userWithExpiredToken = {
        ...mockUser,
        passwordResetToken: 'valid-token',
        passwordResetExpires: new Date(Date.now() - 10000),
      };
      usersService.findByPasswordResetToken.mockResolvedValue(userWithExpiredToken);

      // Act & Assert
      await expect(service.resetPassword(resetPasswordDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('refreshToken', () => {
    it('should successfully refresh token', async () => {
      // Arrange
      const payload = { sub: mockUser.id, email: mockUser.email, role: mockUser.role };
      jwtService.verify.mockReturnValue(payload);
      usersService.findById.mockResolvedValue(mockUser);
      jwtService.signAsync.mockResolvedValueOnce('new-access-token').mockResolvedValueOnce('new-refresh-token');

      // Act
      const result = await service.refreshToken('valid-refresh-token');

      // Assert
      expect(jwtService.verify).toHaveBeenCalledWith('valid-refresh-token', {
        secret: 'test-refresh-secret',
      });
      expect(usersService.findById).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual({
        user: expect.objectContaining({
          id: mockUser.id,
          email: mockUser.email,
        }),
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      });
    });

    it('should throw UnauthorizedException for invalid refresh token', async () => {
      // Arrange
      jwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act & Assert
      await expect(service.refreshToken('invalid-token')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for inactive user', async () => {
      // Arrange
      const payload = { sub: mockUser.id, email: mockUser.email, role: mockUser.role };
      jwtService.verify.mockReturnValue(payload);
      usersService.findById.mockResolvedValue({ ...mockUser, isActive: false });

      // Act & Assert
      await expect(service.refreshToken('valid-refresh-token')).rejects.toThrow(UnauthorizedException);
    });
  });
});
