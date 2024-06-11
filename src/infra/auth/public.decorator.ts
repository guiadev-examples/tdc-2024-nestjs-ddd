import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export const Public = () => SetMetadata('isPublic', true);

export function methodIsPublic(
  reflector: Reflector,
  context: ExecutionContext,
) {
  const isPublic = reflector.get<boolean>('isPublic', context.getHandler());

  return isPublic;
}
