import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'Question ID',
    example: 'question-123',
  })
  @IsString()
  questionId: string;

  @ApiProperty({
    description: 'Answer value (can be string, number, array, or object)',
    example: 'Very satisfied',
  })
  value: any;
}

export class CreateResponseDto {
  @ApiProperty({
    description: 'Survey ID',
    example: 'survey-123',
  })
  @IsString()
  surveyId: string;

  @ApiProperty({
    description: 'Array of answers',
    type: [CreateAnswerDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];

  @ApiProperty({
    description: 'Additional metadata',
    example: { source: 'web', referrer: 'google' },
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
