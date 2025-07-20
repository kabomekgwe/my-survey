import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsObject,
  IsArray,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateSurveyDto {
  @ApiProperty({
    description: 'Survey title',
    example: 'Customer Satisfaction Survey',
    minLength: 3,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(200, { message: 'Title must not exceed 200 characters' })
  title: string;

  @ApiProperty({
    description: 'Survey description',
    example: 'Help us improve our services by sharing your feedback',
    required: false,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Description must not exceed 1000 characters' })
  description?: string;

  @ApiProperty({
    description: 'Survey settings as JSON object',
    example: {
      isPublic: true,
      allowAnonymous: true,
      requireLogin: false,
      allowMultipleResponses: false,
      showProgressBar: true,
      randomizeQuestions: false,
      theme: {
        primaryColor: '#0ea5e9',
        backgroundColor: '#ffffff',
        textColor: '#212529',
        fontFamily: 'Inter',
        borderRadius: 8,
      },
    },
    required: false,
  })
  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;

  @ApiProperty({
    description: 'Survey tags for categorization',
    example: ['customer-feedback', 'satisfaction', 'product'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    description: 'Survey slug for custom URLs',
    example: 'customer-satisfaction-2024',
    required: false,
  })
  @IsOptional()
  @IsString()
  slug?: string;
}
