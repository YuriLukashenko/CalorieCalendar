import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StartComponent} from './start/start.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {NewMealComponent} from './new-meal/new-meal.component';
import {MealShowComponent} from './meal-show/meal-show.component';
import {SummaryComponent} from './summary/summary.component';
import {AuthGuard} from './services/auth-guard.service';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'start', component: StartComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'new-meal', component: NewMealComponent, canActivate: [AuthGuard]},
  {path: 'meal-show', component: MealShowComponent, canActivate: [AuthGuard]},
  {path: 'summary', component: SummaryComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
