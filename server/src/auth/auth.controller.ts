import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response as ExpressResponse } from 'express';
import { ReqUser } from 'src/@types/req';
import { AuthService } from './auth.service';
import { DiscordAuthGuard } from './guards/discord-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(DiscordAuthGuard)
  @Get('discord')
  async login() {
    return;
  }

  @UseGuards(DiscordAuthGuard)
  @Get('discord/callback')
  async discordCallback(
    @Request() req: ReqUser,
    @Response() res: ExpressResponse,
  ) {
    const accessToken = await this.authService.signToken(req.user);

    return res
      .cookie('accessToken', accessToken)
      .redirect(this.configService.get('CLIENT_REDIRECT_URL'));
  }
}
