import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('-----------------------------');
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.originalUrl);
    console.log('Time:', new Date().toLocaleString());
    console.log('-----------------------------');

    next(); 
  }
}
