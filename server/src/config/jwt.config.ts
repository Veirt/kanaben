import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

const JwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  async useFactory(configService: ConfigService) {
    return {
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '15m' },
    };
  },
};

export default JwtConfig;
