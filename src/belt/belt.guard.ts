import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BeltGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest(); // get the request object

    // validate the request object whether to allow it to move forward or not
    // const hasBlackBelt = request.user.belts.includes('black');
    // return hasBlackBelt;

    return true;
  }
}
