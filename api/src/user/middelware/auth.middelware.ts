import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';
import { ExpressRequestInterface } from '../../types/expres-request.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddelware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    req.user = null;

    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const { id } = verify(token, this.configService.get('JWT_SECRET')) as {
          id: number;
        };
        req.user = await this.userService.findById(id);
      } catch (e) {
        req.user = null;
      }
    }

    next();
  }
}
