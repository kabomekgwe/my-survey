import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateResponseDto, CreateAnswerDto } from './create-response.dto';
import { IsOptional, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateResponseDto {
  @ApiProperty({
    description: 'Array of answers to update',
    type: [CreateAnswerDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers?: CreateAnswerDto[];

  @ApiProperty({
    description: 'Additional metadata',
    example: { source: 'web', referrer: 'google' },
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
