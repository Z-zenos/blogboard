import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastService: ToastService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (JSON.parse(localStorage.getItem('user') as string) && JSON.parse(localStorage.getItem('user') as string).email) {
      this._authService.isLoggedInGuard = true;
    }


    if (this._authService.isLoggedInGuard) {
      return true;
    }
    else {
      this._toastService.warning('Warn', "Please login before using my service :)");
      this._router.navigate(['/login']);
      return false;
    }
  }

}
