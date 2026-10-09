import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { RolesDecorator } from '@/core/decorators/role.decorators';
import { JwtUser } from '@/core/guards/auth.guard';

// Runs after AuthenticationGuard. A super admin may access every admin route.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(RolesDecorator, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest<{ user?: JwtUser }>();
    if (!user) throw new UnauthorizedException();

    if (user.role !== Role.SuperAdmin && !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied');
    }
    return true;
  }
}
