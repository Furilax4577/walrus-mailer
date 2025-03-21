import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { hostToClient } from '../../config/clients';

@Injectable()
export class DnsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const host = request.headers.host?.toLowerCase().split(':')[0];

    if (!host || !hostToClient[host]) {
      console.warn(`[DnsGuard] Host non autorisé : ${host}`);
      throw new ForbiddenException(
        'Ce domaine n’est pas autorisé à accéder à l’API.',
      );
    }

    // Injection du client dans la requête pour utilisation ultérieure
    (request as any).client = hostToClient[host];
    return true;
  }
}
