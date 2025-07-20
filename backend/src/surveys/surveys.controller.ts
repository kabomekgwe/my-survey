import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('surveys')
@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new survey' })
  @ApiResponse({
    status: 201,
    description: 'Survey successfully created',
  })
  async create(@Body() createSurveyDto: CreateSurveyDto, @Request() req) {
    return this.surveysService.create(createSurveyDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all surveys for current user' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Surveys retrieved successfully',
  })
  async findAll(
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.surveysService.findAll(req.user.id, page, limit);
  }

  @Get('public/:id')
  @Public()
  @ApiOperation({ summary: 'Get public survey for response submission' })
  @ApiResponse({
    status: 200,
    description: 'Public survey retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Survey not found or not published',
  })
  async getPublicSurvey(@Param('id') id: string) {
    return this.surveysService.getPublicSurvey(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get survey by ID' })
  @ApiResponse({
    status: 200,
    description: 'Survey retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Survey not found',
  })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.surveysService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update survey' })
  @ApiResponse({
    status: 200,
    description: 'Survey updated successfully',
  })
  async update(
    @Param('id') id: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
    @Request() req,
  ) {
    return this.surveysService.update(id, updateSurveyDto, req.user.id);
  }

  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Publish survey' })
  @ApiResponse({
    status: 200,
    description: 'Survey published successfully',
  })
  async publish(@Param('id') id: string, @Request() req) {
    return this.surveysService.publish(id, req.user.id);
  }

  @Patch(':id/close')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Close survey' })
  @ApiResponse({
    status: 200,
    description: 'Survey closed successfully',
  })
  async close(@Param('id') id: string, @Request() req) {
    return this.surveysService.close(id, req.user.id);
  }

  @Post(':id/duplicate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Duplicate survey' })
  @ApiResponse({
    status: 201,
    description: 'Survey duplicated successfully',
  })
  async duplicate(@Param('id') id: string, @Request() req) {
    return this.surveysService.duplicate(id, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete survey' })
  @ApiResponse({
    status: 200,
    description: 'Survey deleted successfully',
  })
  async remove(@Param('id') id: string, @Request() req) {
    return this.surveysService.remove(id, req.user.id);
  }
}
