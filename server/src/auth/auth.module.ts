import JwtConfig from '@config/jwt.config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './strategies/discord.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync(JwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, DiscordStrategy],
})
export class AuthModule {}
