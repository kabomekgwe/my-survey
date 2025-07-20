import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3001,
  apiPrefix: process.env.API_PREFIX || 'api',
  apiVersion: process.env.API_VERSION || 'v1',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Rate limiting
  throttleTtl: parseInt(process.env.THROTTLE_TTL, 10) || 60,
  throttleLimit: parseInt(process.env.THROTTLE_LIMIT, 10) || 100,
  
  // File upload
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 10485760, // 10MB
  uploadDest: process.env.UPLOAD_DEST || './uploads',
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'debug',
  
  // Swagger
  swagger: {
    enabled: process.env.ENABLE_SWAGGER === 'true',
    title: process.env.SWAGGER_TITLE || 'My Survey API',
    description: process.env.SWAGGER_DESCRIPTION || 'Comprehensive survey management API',
    version: process.env.SWAGGER_VERSION || '1.0',
    path: process.env.SWAGGER_PATH || 'api/docs',
  },
  
  // Security
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 12,
  sessionSecret: process.env.SESSION_SECRET || 'your-session-secret',
}));
