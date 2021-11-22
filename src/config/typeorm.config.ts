import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

const TypeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const development = configService.get('NODE_ENV') === 'development';

    return {
      type: 'postgres',
      url: configService.get('DATABASE_URL'),
      synchronize: development,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    };
  },
};

export default TypeOrmConfig;
