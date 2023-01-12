import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core'

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    /*const responseMessage = this.reflector.get<string>(
      ResponseMessageKey,
      context.getHandler()
    ) ?? ''*/

    return next.handle().pipe(
      map(data => ({ 
        statusCode: context.switchToHttp().getResponse().statusCode,
        res_code: context.switchToHttp().getResponse().statusCode,
        res_msg: '???',
        data,
        data_count: '?',
      }))
    );
  }
}
