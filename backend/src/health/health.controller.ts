import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  PrismaHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('health')
@Controller('health')
@Public()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prisma: PrismaHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    private prismaService: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Health check successful',
  })
  @ApiResponse({
    status: 503,
    description: 'Service unavailable',
  })
  check() {
    return this.health.check([
      // Database health check
      () => this.prisma.pingCheck('database', this.prismaService),
      
      // Memory health check (heap should not use more than 300MB)
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      
      // Memory health check (RSS should not use more than 300MB)
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
      
      // Disk health check (should not use more than 80% of available space)
      () => this.disk.checkStorage('storage', { 
        path: '/', 
        thresholdPercent: 0.8 
      }),
    ]);
  }

  @Get('ready')
  @ApiOperation({ summary: 'Readiness probe' })
  @ApiResponse({
    status: 200,
    description: 'Service is ready',
  })
  ready() {
    return this.health.check([
      () => this.prisma.pingCheck('database', this.prismaService),
    ]);
  }

  @Get('live')
  @ApiOperation({ summary: 'Liveness probe' })
  @ApiResponse({
    status: 200,
    description: 'Service is alive',
  })
  live() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
