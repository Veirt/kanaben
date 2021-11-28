import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateDiscordUserDto } from './dto/update-discord-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }

  async findByDiscordId(discordId: string) {
    const user = await this.usersRepository.findOne({ discord_id: discordId });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    const user = this.usersRepository.findOne(id);
    return user;
  }

  async updateDiscordUser(
    discordId: string,
    updateDiscordUserDto: UpdateDiscordUserDto,
  ) {
    return this.usersRepository.update(
      { discord_id: discordId },
      updateDiscordUserDto,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
