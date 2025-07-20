import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSurveyDto } from './create-survey.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { SurveyStatus } from '@shared/types';

export class UpdateSurveyDto extends PartialType(CreateSurveyDto) {
  @ApiProperty({
    description: 'Survey status',
    enum: SurveyStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(SurveyStatus, { message: 'Status must be a valid survey status' })
  status?: SurveyStatus;
}
