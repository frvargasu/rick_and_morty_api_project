# API Endpoints Summary

## Base URL: `http://localhost:3000`

### Health & Documentation
- `GET /` - Welcome message and API overview
- `GET /health` - Health check endpoint
- `GET /api/docs` - Swagger API documentation

### Characters (`/api/characters`)
- `GET /api/characters` - Get all characters with optional pagination
  - Query parameters: `page`, `name`, `status`, `species`, `gender`
- `GET /api/characters/:id` - Get specific character by ID
- `GET /api/characters/search/:name` - Search characters by name
- `GET /api/characters/filter` - Filter characters by status, species, gender
  - Query parameters: `status`, `species`, `gender`, `page`

### Episodes (`/api/episodes`)
- `GET /api/episodes` - Get all episodes with pagination
  - Query parameters: `page`
- `GET /api/episodes/:id` - Get specific episode by ID
- `GET /api/episodes/season/:season` - Get episodes by season (1-10)

### Locations (`/api/locations`)
- `GET /api/locations` - Get all locations with pagination
  - Query parameters: `page`
- `GET /api/locations/:id` - Get specific location by ID
- `GET /api/locations/search/:name` - Search locations by name

## Features Implemented

✅ **Complete REST API** with Express.js and Node.js
✅ **Character endpoints** with search, filtering, and pagination
✅ **Episode endpoints** with season filtering
✅ **Location endpoints** with search functionality
✅ **Caching system** with Redis support (optional, falls back to memory)
✅ **Rate limiting** (100 requests per 15 minutes)
✅ **Swagger documentation** with interactive UI
✅ **Error handling** with Winston logging
✅ **CORS support** for cross-origin requests
✅ **Environment configuration** via .env file
✅ **Unit tests** with Jest framework
✅ **Proper project structure** as specified

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - HTTP client for external API calls
- **Redis** - Optional caching layer
- **Winston** - Logging system
- **Swagger** - API documentation
- **Jest** - Testing framework
- **Express Rate Limit** - Rate limiting middleware

## Configuration

The API is configurable via environment variables:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/test/production)
- `RICK_AND_MORTY_API_URL` - External API URL
- `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` - Redis configuration
- `CACHE_TTL` - Cache time-to-live (default: 900 seconds)
- `RATE_LIMIT_WINDOW_MS` - Rate limit window (default: 15 minutes)
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window (default: 100)
- `CORS_ORIGIN` - CORS origin configuration

## Usage

1. **Development**: `npm run dev`
2. **Production**: `npm start`
3. **Testing**: `npm test`

## API Documentation

Interactive Swagger documentation is available at `/api/docs` when the server is running.