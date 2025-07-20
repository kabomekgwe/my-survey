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
  Ip,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('responses')
@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a survey response' })
  @ApiResponse({
    status: 201,
    description: 'Response successfully submitted',
  })
  async create(
    @Body() createResponseDto: CreateResponseDto,
    @Request() req,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const userId = req.user?.id;
    return this.responsesService.create(createResponseDto, userId, ip, userAgent);
  }

  @Post('draft')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a draft response' })
  @ApiResponse({
    status: 201,
    description: 'Draft response created',
  })
  async createDraft(
    @Body() body: { surveyId: string },
    @Request() req,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const userId = req.user?.id;
    return this.responsesService.createDraft(body.surveyId, userId, ip, userAgent);
  }

  @Patch('draft/:id')
  @Public()
  @ApiOperation({ summary: 'Update a draft response' })
  @ApiResponse({
    status: 200,
    description: 'Draft response updated',
  })
  async updateDraft(
    @Param('id') id: string,
    @Body() updateResponseDto: UpdateResponseDto,
  ) {
    return this.responsesService.updateDraft(id, updateResponseDto);
  }

  @Patch('draft/:id/complete')
  @Public()
  @ApiOperation({ summary: 'Complete a draft response' })
  @ApiResponse({
    status: 200,
    description: 'Response completed',
  })
  async completeDraft(@Param('id') id: string) {
    return this.responsesService.completeDraft(id);
  }

  @Get('survey/:surveyId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all responses for a survey' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Responses retrieved successfully',
  })
  async findAllBySurvey(
    @Param('surveyId') surveyId: string,
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.responsesService.findAllBySurvey(surveyId, req.user.id, page, limit);
  }

  @Get('survey/:surveyId/export')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Export survey responses' })
  @ApiQuery({ name: 'format', required: false, enum: ['csv', 'json'] })
  @ApiResponse({
    status: 200,
    description: 'Responses exported successfully',
  })
  async exportResponses(
    @Param('surveyId') surveyId: string,
    @Request() req,
    @Query('format') format: 'csv' | 'json' = 'csv',
  ) {
    return this.responsesService.exportResponses(surveyId, req.user.id, format);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get response by ID' })
  @ApiResponse({
    status: 200,
    description: 'Response retrieved successfully',
  })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.responsesService.findOne(id, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete response' })
  @ApiResponse({
    status: 200,
    description: 'Response deleted successfully',
  })
  async remove(@Param('id') id: string, @Request() req) {
    return this.responsesService.remove(id, req.user.id);
  }
}
