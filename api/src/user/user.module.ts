import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.serivce';

@Module({
  imports: [ConfigModule],
  controllers: [UserController],
  providers: [UserService, ConfigService, PrismaService],
})
export class UserModule {}
