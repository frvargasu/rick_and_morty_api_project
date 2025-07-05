const config = {
  development: {
    port: process.env.PORT || 3000,
    apiUrl: process.env.RICK_AND_MORTY_API_URL || 'https://rickandmortyapi.com/api',
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || null,
    },
    cache: {
      ttl: parseInt(process.env.CACHE_TTL) || 900, // 15 minutes
    },
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requests per window
    },
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
    },
  },
  test: {
    port: process.env.PORT || 3001,
    apiUrl: process.env.RICK_AND_MORTY_API_URL || 'https://rickandmortyapi.com/api',
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || null,
    },
    cache: {
      ttl: parseInt(process.env.CACHE_TTL) || 60, // 1 minute for tests
    },
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    },
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
    },
  },
  production: {
    port: process.env.PORT || 3000,
    apiUrl: process.env.RICK_AND_MORTY_API_URL || 'https://rickandmortyapi.com/api',
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || null,
    },
    cache: {
      ttl: parseInt(process.env.CACHE_TTL) || 900,
    },
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    },
    cors: {
      origin: process.env.CORS_ORIGIN || false, // Be more restrictive in production
      credentials: true,
    },
  },
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];