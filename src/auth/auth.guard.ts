import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { IReq } from "src/interfaces/request.interface";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService
      ) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);

        if(!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload: IReq = await this.jwtService.verifyAsync(token, { secret: this.config.get<string>("jwtSecret")});
            req.user = payload;
        } catch {
          throw new UnauthorizedException();
        }

        return true;
    }

  private extractTokenFromHeader(req: Request): string | undefined {
    // destructuring assignment, optional chaining, and the nullish coalescing operator
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}