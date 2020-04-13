import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {SettingsService} from '../services/settings.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  constructor(private authService: AuthService,
              private settingsService: SettingsService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.user = null;
    this.loggedIn = false;
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (params?.page === 'setting') {
        this.onSignOut();
      }
    });
  }

  onSignIn() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      console.log(user);
      this.user = user;
      this.loggedIn = (user != null);
      this.settingsService.setUser(this.user, this.loggedIn);
      if (this.loggedIn) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSignOut() {
    this.authService.signOut();
    this.user = null;
    this.loggedIn = false;
    this.settingsService.setUser(this.user, this.loggedIn);
  }
}
