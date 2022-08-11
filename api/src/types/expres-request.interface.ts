import { Request } from 'express';

export interface ExpressRequestInterface extends Request {
  user: {
    login: string;
    password: string;
  };
}
