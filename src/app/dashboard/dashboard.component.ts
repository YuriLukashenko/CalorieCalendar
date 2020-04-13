import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {DashboardService} from '../services/dashboard.service';
import {IMeal} from '../interfaces/IMeal';
import {MealService} from '../services/meal.service';
import {IDay} from '../interfaces/IDay';
import {ITotal} from '../interfaces/ITotal';
import {SettingsService} from '../services/settings.service';
import {ISettings} from '../interfaces/ISettings';
import {ActivatedRoute, Router} from '@angular/router';
import {ISummary} from '../interfaces/ISummary';
import {SummaryService} from '../services/summary.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentMonthName: string;
  currentDayNum: number;
  week: {day: number, month: string}[] = [];
  meals: IMeal[] = [];
  monday: IDay[] = [];
  tuesday: IDay[] = [];
  wednesday: IDay[] = [];
  thursday: IDay[] = [];
  friday: IDay[] = [];
  saturday: IDay[] = [];
  sunday: IDay[] = [];
  totalSummary: ITotal[] = [];
  setting: ISettings;

  constructor(private dashboardService: DashboardService,
              private mealService: MealService,
              private settingsService: SettingsService,
              private summaryService: SummaryService,
              private route: ActivatedRoute,
              private router: Router) {
    this.clearDays();
    this.currentMonthName = moment().format('MMMM');
    this.currentDayNum = +moment().add(-7, 'days').format('D');
  }

  ngOnInit(): void {
    this.week = this.dashboardService.getCurrentWeek();
    this.meals = this.mealService.getAllMealsForCurrentWeek();
    this.setting = this.settingsService.setting;

    let index = 0;
    for (const meal of this.meals) {
      switch (meal.dayOfWeek) {
        case 'Monday':
          index = this.getMealOffset(meal);
          this.monday[index] = {meal, isExist: true};
          this.incrementTotalValues(meal, 0);
          break;
        case 'Tuesday':
          index = this.getMealOffset(meal);
          this.tuesday[index] = {meal, isExist: true};
          this.incrementTotalValues(meal, 1);
          break;
        case 'Wednesday':
          index = this.getMealOffset(meal);
          this.wednesday[index] = {meal, isExist: true};
          this.incrementTotalValues(meal, 2);
          break;
        case'Thursday':
          index = this.getMealOffset(meal);
          this.thursday[index] = {meal, isExist: true};
          this.incrementTotalValues(meal, 3);
          break;
        case'Friday':
          index = this.getMealOffset(meal);
          this.friday[index] = {meal, isExist: true};
          this.incrementTotalValues(meal, 4);
          break;
        case'Saturday':
          index = this.getMealOffset(meal);
          this.saturday[index] = {meal, isExist: true};
          this.incrementTotalValues(meal, 5);
          break;
        case'Sunday':
          index = this.getMealOffset(meal);
          this.sunday[index] = {meal, isExist: true};
          this.incrementTotalValues(meal, 6);
          break;
        default:
          break;
      }
    }
  }

  clearDays() {
    const defaultDay: IDay = {
      meal: null,
      isExist: false,
    };
    const defaultTotal: ITotal = {
      totalKcal: 0,
      totalFats: 0,
      totalProts: 0,
      totalCarbs: 0
    };
    // 12 parts of day from 08:00 to 20:00
    for (let i = 0; i < 12; i++) {
      this.monday.push(Object.assign({}, defaultDay));
      this.tuesday.push(Object.assign({}, defaultDay));
      this.wednesday.push(Object.assign({}, defaultDay));
      this.thursday.push(Object.assign({}, defaultDay));
      this.friday.push(Object.assign({}, defaultDay));
      this.saturday.push(Object.assign({}, defaultDay));
      this.sunday.push(Object.assign({}, defaultDay));
    }
    // 7 days
    for (let i = 0; i < 7; i++) {
      this.totalSummary.push(Object.assign({}, defaultTotal));
    }
  }

  private getMealOffset(meal: IMeal): number {
    const hours = + meal?.time.split(':')[0] ?? 0;
    if (hours < 8 && hours > 19) {
      return -1;
    } else {
      return hours - 8;
    }
  }

  private incrementTotalValues(meal: IMeal, dayOfWeek: number) {
    this.totalSummary[dayOfWeek].totalKcal += (+meal?.kcal) ?? 0;
    this.totalSummary[dayOfWeek].totalFats += (+meal?.fats) ?? 0;
    this.totalSummary[dayOfWeek].totalProts += (+meal?.proteins) ?? 0;
    this.totalSummary[dayOfWeek].totalCarbs += (+meal?.carbs) ?? 0;
  }

  onSelectDay(index: number) {
    const summary: ISummary = {
      title: this.week[index].day === this.currentDayNum
        ? 'Today'
        : this.week[index].month + ' ' + this.week[index].day,
      totalValues: this.totalSummary[index],
      mealsOfDay: null
    };
    switch (index) {
      case 0: summary.mealsOfDay = this.monday; break;
      case 1: summary.mealsOfDay = this.tuesday; break;
      case 2: summary.mealsOfDay = this.wednesday; break;
      case 3: summary.mealsOfDay = this.thursday; break;
      case 4: summary.mealsOfDay = this.friday; break;
      case 5: summary.mealsOfDay = this.saturday; break;
      case 6: summary.mealsOfDay = this.sunday; break;
    }
    // this.router.navigate(['/summary'], {
    //   queryParams: {
    //     summary: JSON.stringify(summary)
    //   }
    // });
    this.summaryService.selectedSummary = summary;
    this.router.navigate(['/summary']);
  }
}
