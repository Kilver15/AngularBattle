import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from '../cookies.service';

@Injectable({
 providedIn: 'root',
})
export class LoginGuard implements CanActivate {
 constructor(private cookieService: CookieService, private router: Router) {}

 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const hasauthToken = this.cookieService.getCookie('authToken') !== null;

    if (!hasauthToken) {
      return this.router.createUrlTree(['/verificacion']);
    }

    return true;
 }
}
