import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StartComponent} from './start/start.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {NewMealComponent} from './new-meal/new-meal.component';
import {MealShowComponent} from './meal-show/meal-show.component';
import {SummaryComponent} from './summary/summary.component';

const appRoutes: Routes = [
  {path: '', component:
          localStorage.getItem('setting') === null ? StartComponent :
          JSON.parse(localStorage.getItem('setting')).isLoggedIn ? DashboardComponent : StartComponent},
  {path: 'start', component: StartComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'new-meal', component: NewMealComponent},
  {path: 'meal-show', component: MealShowComponent},
  {path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
