import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string) {
    return await this.cache.get<T>(key);
  }

  async set(key: string, value: any, ttl?: number) {
    await this.cache.set(key, value, ttl);
  }

  async del(key: string) {
    await this.cache.del(key);
  }

  async clear() {
    await this.cache.clear();
  }

  onModuleDestroy() {
    this.cache.stores.forEach((asd) => {
      asd.disconnect();
    });
  }
}
