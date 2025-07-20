import { registerAs } from '@nestjs/config';

export const cacheConfig = registerAs('cache', () => ({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB, 10) || 0,
  },
  
  // Cache settings
  ttl: parseInt(process.env.CACHE_TTL, 10) || 300, // 5 minutes
  max: parseInt(process.env.CACHE_MAX, 10) || 100,
  
  // Bull queue settings
  bull: {
    redis: {
      host: process.env.BULL_REDIS_HOST || 'localhost',
      port: parseInt(process.env.BULL_REDIS_PORT, 10) || 6379,
      password: process.env.BULL_REDIS_PASSWORD,
      db: parseInt(process.env.BULL_REDIS_DB, 10) || 1,
    },
  },
}));
