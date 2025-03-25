import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Suponiendo que el usuario está en `req.user`

    return requiredRoles.some((role) => user.role === role);
  }
}