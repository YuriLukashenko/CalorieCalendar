import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StartComponent} from './start/start.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {NewMealComponent} from './new-meal/new-meal.component';

const appRoutes: Routes = [
  {path: '', component: StartComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'new-meal', component: NewMealComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
