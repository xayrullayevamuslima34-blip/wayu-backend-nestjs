import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RolesDecorator } from '@/core/decorators/role.decorators';
import { Role } from '@/core/enums/role.enum';

export interface JwtUser {
  id: number;
  login: string;
  fullName: string;
  role: Role;
}

// Verifies the bearer token on every route marked with @Roles().
// Routes without @Roles() (public API, login) stay open.
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(RolesDecorator, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<Request & { user?: JwtUser }>();
    const token = this.extractBearerToken(request);
    if (!token) throw new UnauthorizedException('Token topilmadi');

    try {
      request.user = await this.jwtService.verifyAsync<JwtUser>(token);
    } catch {
      throw new UnauthorizedException("Token yaroqsiz yoki muddati o'tgan");
    }
    return true;
  }

  private extractBearerToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
