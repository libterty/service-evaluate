import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as proxyaddr from 'proxy-addr';
import Redis from 'ioredis';
import moment from 'moment';
import { config } from '../../config';
const redisClient = new Redis(config.REDIS_URL);

interface IRateLimit {
  request_time: number;
  counter: number;
}

@Injectable()
export class RateMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const addrs: string[] = proxyaddr.all(req, 'uniquelocal');

    if (typeof addrs !== 'object') return res.sendStatus(401);

    if (addrs.length === 0) return res.sendStatus(401);

    // take only one IP
    const addr: string = addrs[0];
    redisClient.exists(addr, (err, reply) => {
      if (err) {
        Logger.log(err.message, 'REDIS-RATE-LIMIT-ERR', true);
        process.exit(0);
      }

      if (reply === 1) {
        redisClient.get(addr, (err, response) => {
          if (err) {
            Logger.log(err.message, 'REDIS-RATE-LIMIT-ERR', true);
          }

          const data = JSON.parse(response);
          const current_time: number = moment().unix();
          const idle_time: number = moment()
            .subtract(1, 'minute')
            .unix();
          const request_count_per_minutes = data.filter(
            item => item.request_time > idle_time,
          );

          let threshold = 0;
          Logger.log(
            JSON.stringify(request_count_per_minutes),
            'request_count_per_minutes',
            true,
          );
          request_count_per_minutes.forEach(item => {
            threshold += item.counter;
          });
          Logger.log(threshold, 'threshold', true);
          if (threshold >= 10) {
            Logger.log(addr, 'REDIS-RATE-LIMIT-ECEED', true);
            return res
              .status(429)
              .json({ status: 'error', message: 'Throttle Limit Exceeded' });
          }

          let is_found = false;

          data.forEach(element => {
            if (element.request_time) {
              is_found = true;
              element.counter++;
            }
          });

          if (!is_found) {
            data.push({
              request_time: current_time,
              counter: 1,
            });
          }
          Logger.log(
            `Address: ${addr} data: ${JSON.stringify(data)}`,
            'Check',
            true,
          );
          redisClient.set(addr, JSON.stringify(data));
          next();
        });
      } else {
        const data = [];
        data.push({
          request_time: moment().unix(),
          counter: 1,
        });
        redisClient.set(addr, JSON.stringify(data));
        next();
      }
    });
  }
}
