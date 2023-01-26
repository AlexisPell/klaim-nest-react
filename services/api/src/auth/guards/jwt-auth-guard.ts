import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MyRequest } from 'src/common/interfaces/request.interface';
import { User } from 'src/user/user.model';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  unauthorizedMsg = 'User is unauthorized';
  constructor(private JwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req: MyRequest = context.switchToHttp().getRequest();
      const { authorization: authHeader } = req.headers;

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(this.unauthorizedMsg);
      }
      const user: User = this.JwtService.verify(token, {
        secret: process.env.PRIVATE_JWT_KEY,
      });
      req.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(this.unauthorizedMsg);
    }
  }
}
