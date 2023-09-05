import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// ควร run code นี้ก่อนจะ load route แล้วมันจะให้ข้อมูล ActivatedRouteSnapshot/RouterStateSnapshot กับเรา
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  // เรียกใช้ได้ทั้งแบบ Async เพื่อส่งคืนสิ่งที่สังเกตได้ หรือใช้แบบ sync เพราะอาจมี guard ที่ run code บางตัวซึ่งทำงานบน client อย่างสมบูรณ์
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .isAuthenticated()
      .then((authenticateState: boolean) => {
        if (authenticateState) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      });
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    //   เรียกใช้ canActivate ได้เลยเพราะ ต้องการให้การทำงานเหมือนกัน
    return this.canActivate(route, state);
  }
}
