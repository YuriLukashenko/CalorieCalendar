import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {SettingsService} from '../services/settings.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthCalorieService} from '../services/auth-calorie.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  constructor(private authCalorieService: AuthCalorieService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params?.page === 'setting') {
        this.onSignOut();
      }
    });
  }

  onSignIn() {
    this.authCalorieService.logIn();
  }

  onSignOut() {
    this.authCalorieService.logOut();
  }
}
