const redis = require('redis');

class CacheService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.TTL = parseInt(process.env.CACHE_TTL) || 900; // 15 minutes default
    
    // Initialize Redis client if available
    this.initializeRedis();
  }

  async initializeRedis() {
    try {
      if (process.env.REDIS_HOST || process.env.NODE_ENV === 'production') {
        this.client = redis.createClient({
          host: process.env.REDIS_HOST || 'localhost',
          port: process.env.REDIS_PORT || 6379,
          password: process.env.REDIS_PASSWORD || undefined,
        });

        this.client.on('error', (err) => {
          console.warn('Redis Client Error:', err);
          this.isConnected = false;
        });

        this.client.on('connect', () => {
          console.log('✅ Redis connected');
          this.isConnected = true;
        });

        await this.client.connect();
      } else {
        console.log('📝 Redis not configured, using in-memory cache');
        this.memoryCache = new Map();
      }
    } catch (error) {
      console.warn('Redis connection failed, falling back to memory cache:', error.message);
      this.memoryCache = new Map();
    }
  }

  async get(key) {
    try {
      if (this.client && this.isConnected) {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
      } else if (this.memoryCache) {
        const cached = this.memoryCache.get(key);
        if (cached && cached.expiry > Date.now()) {
          return cached.data;
        } else if (cached) {
          this.memoryCache.delete(key);
        }
        return null;
      }
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key, value) {
    try {
      if (this.client && this.isConnected) {
        await this.client.setEx(key, this.TTL, JSON.stringify(value));
      } else if (this.memoryCache) {
        this.memoryCache.set(key, {
          data: value,
          expiry: Date.now() + (this.TTL * 1000)
        });
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async del(key) {
    try {
      if (this.client && this.isConnected) {
        await this.client.del(key);
      } else if (this.memoryCache) {
        this.memoryCache.delete(key);
      }
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async clear() {
    try {
      if (this.client && this.isConnected) {
        await this.client.flushAll();
      } else if (this.memoryCache) {
        this.memoryCache.clear();
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  async disconnect() {
    try {
      if (this.client && this.isConnected) {
        await this.client.disconnect();
        this.isConnected = false;
      }
    } catch (error) {
      console.error('Cache disconnect error:', error);
    }
  }
}

module.exports = new CacheService();