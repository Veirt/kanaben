import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Scope, Strategy } from '@oauth-everything/passport-discord';
import { UpdateDiscordUserDto } from 'src/users/dto/update-discord-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      clientID: configService.get('DISCORD_CLIENT_ID'),
      clientSecret: configService.get('DISCORD_CLIENT_SECRET'),
      callbackURL: configService.get('DISCORD_CALLBACK_URL'),
      scope: [Scope.IDENTIFY],
    });
  }

  async validate(_: string, __: string, profile: Profile) {
    const user = await this.usersService.findByDiscordId(profile.id);
    if (!user) {
      return this.usersService.create({
        discord_id: profile.id,
        avatar: profile.photos[0].value,
      });
    }

    const updateDiscordUserDto: UpdateDiscordUserDto = {
      avatar: profile.photos[0].value,
    };

    return this.usersService.updateDiscordUser(
      profile.id,
      updateDiscordUserDto,
    );
  }
}
