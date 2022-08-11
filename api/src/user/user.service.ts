import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.serivce';
import { UserDto } from './dto/user.dto';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(userDto: UserDto) {
    const userByLogin = await this.prismaService.user.findFirst({
      where: { login: userDto.login },
    });

    if (userByLogin) {
      throw new HttpException(
        'Login are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.prismaService.user.create({
      data: { login: userDto.login, password: userDto.password },
    });
  }

  async login(userDto: UserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { login: userDto.login },
    });

    if (!user) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(userDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;

    return user;
  }

  findById(id) {
    return this.prismaService.user.findFirst({ where: { id } });
  }

  generateJwt(user): string {
    return sign(
      {
        id: user.id,
        login: user.login,
      },
      this.configService.get('JWT_SECRET'),
    );
  }

  buildUserResponse(user) {
    return {
      id: user.id,
      login: user.login,
      token: this.generateJwt(user),
    };
  }
}
