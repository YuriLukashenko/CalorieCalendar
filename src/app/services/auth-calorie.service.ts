import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {SettingsService} from './settings.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthCalorieService {
  user: SocialUser;
  isLoggedIn = false;
  constructor(private authService: AuthService,
              private settingsService: SettingsService,
              private router: Router) {
    this.isLoggedIn = this.settingsService.setting.isLoggedIn;
  }

  isAuth() {
    return new Promise((resolve, reject) => {
      resolve(this.isLoggedIn);
    });
  }

  logIn() {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
    //   console.log(user);
    //   this.user = user;
    //   this.isLoggedIn = (user != null);
    //   this.settingsService.setUser(this.user, this.isLoggedIn);
    //   if (this.isLoggedIn) {
    //     this.router.navigate(['/dashboard']);
    //   }
    // });
    this.isLoggedIn = true;
    this.router.navigate(['/dashboard']);
  }

  logOut() {
    this.authService.signOut().then(out => {
      this.user = null;
      this.isLoggedIn = false;
      this.settingsService.setUser(this.user, this.isLoggedIn);
    });
}
}
