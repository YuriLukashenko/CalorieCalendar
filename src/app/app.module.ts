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

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    DashboardComponent,
    SettingsComponent,
    NewMealComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    LocalStorageService,
    SettingsService,
    MealService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
