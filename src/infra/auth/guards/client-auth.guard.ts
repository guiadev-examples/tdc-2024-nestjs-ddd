import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { methodIsPublic } from '../public.decorator';

@Injectable()
export class ClientAuthGuard extends AuthGuard(['api-key']) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    if (methodIsPublic(this.reflector, context)) {
      return true;
    }

    return super.canActivate(context);
  }
}
