import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { NewMealComponent } from './new-meal/new-meal.component';
import {SettingsService} from './services/settings.service';
import {FormsModule} from '@angular/forms';
import {MealService} from './services/meal.service';
import {LocalStorageService} from './services/local-storage.service';
import {DashboardService} from './services/dashboard.service';
import {MealComponent} from './meal/meal.component';
import { MealShowComponent } from './meal-show/meal-show.component';
import { SummaryComponent } from './summary/summary.component';
import { SummaryService } from './services/summary.service';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from 'angularx-social-login';
import {AuthCalorieService} from './services/auth-calorie.service';
import {AuthGuard} from './services/auth-guard.service';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('240038365999-1m2nsvo8ejhs5g54od55b9n3ljm7qga2.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    DashboardComponent,
    SettingsComponent,
    NewMealComponent,
    MealComponent,
    MealShowComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    LocalStorageService,
    SettingsService,
    MealService,
    DashboardService,
    SummaryService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthCalorieService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
