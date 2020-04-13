import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthCalorieService} from './auth-calorie.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authCalorieService: AuthCalorieService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authCalorieService.isAuth().then((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['/start']);
        return false;
      }
    });
  }
}
