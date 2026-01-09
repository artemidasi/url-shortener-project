import { Injectable } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';
import { DatabaseService } from './database/database.service';
import { CacheService } from './core/cache/cache.service';

@Injectable()
export class AppService {
  private context = 'AppService';

  constructor(
    private readonly logger: LoggerService,
    private readonly databaseService: DatabaseService,
    private readonly cache: CacheService,
  ) {}

  async getHello() {
    this.logger.log('getHello', this.context, {
      isTest: true,
    });

    await this.databaseService.user.findMany();

    await this.cache.set('key', 'asdasd', 1000);

    const cacheValue = await this.cache.get<string>('key');

    return cacheValue;
  }
}
