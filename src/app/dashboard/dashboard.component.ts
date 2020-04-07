import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {DashboardService} from '../services/dashboard.service';
import {IMeal} from '../interfaces/IMeal';
import {MealService} from '../services/meal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentMonthName: string;
  weekNums: number[] = [];
  meals: IMeal[] = [];
  monday: {meal: IMeal, isExist: boolean}[] = [];
  tuesday: {meal: IMeal, isExist: boolean}[] = [];
  wednesday: {meal: IMeal, isExist: boolean}[] = [];
  thursday: {meal: IMeal, isExist: boolean}[] = [];
  friday: {meal: IMeal, isExist: boolean}[] = [];
  saturday: {meal: IMeal, isExist: boolean}[] = [];
  sunday: {meal: IMeal, isExist: boolean}[] = [];

  constructor(private dashboardService: DashboardService, private mealService: MealService) {
    this.clearDays();
    this.currentMonthName = moment().format('MMMM');
  }

  ngOnInit(): void {
    this.weekNums = this.dashboardService.getCurrentWeek();
    this.meals = this.mealService.getAllMealsForCurrentWeek();
    for (const meal of this.meals) {
      switch (meal.dayOfWeek) {
        case 'Monday':
          this.monday[this.getMealOffset(meal)].meal = meal;
          this.monday[this.getMealOffset(meal)].isExist = true;
          break;
        case 'Tuesday':
          this.tuesday[this.getMealOffset(meal)].meal = meal;
          this.tuesday[this.getMealOffset(meal)].isExist = true;
          break;
        case 'Wednesday':
          this.wednesday[this.getMealOffset(meal)].meal = meal;
          this.wednesday[this.getMealOffset(meal)].isExist = true;
          break;
        case 'Thursday':
          this.thursday[this.getMealOffset(meal)].meal = meal;
          this.thursday[this.getMealOffset(meal)].isExist = true;
          break;
        case 'Friday':
          this.friday[this.getMealOffset(meal)].meal = meal;
          this.friday[this.getMealOffset(meal)].isExist = true;
          break;
        case 'Saturday':
          this.saturday[this.getMealOffset(meal)].meal = meal;
          this.saturday[this.getMealOffset(meal)].isExist = true;
          break;
        case 'Sunday':
          this.sunday[this.getMealOffset(meal)].meal = meal;
          this.sunday[this.getMealOffset(meal)].isExist = true;
          break;
        default:
          break;
      }
    }
  }

  clearDays() {
    for (let i = 0; i < 12; i++) {
      this.monday.push({ meal: null, isExist: false});
      this.tuesday.push({ meal: null, isExist: false});
      this.wednesday.push({ meal: null, isExist: false});
      this.thursday.push({ meal: null, isExist: false});
      this.friday.push({ meal: null, isExist: false});
      this.saturday.push({ meal: null, isExist: false});
      this.sunday.push({ meal: null, isExist: false});
    }
  }

  getMealOffset(meal: IMeal): number {
    const hours = + meal?.time.split(':')[0] ?? 0;
    if (hours < 8 && hours > 19) {
      return -1;
    } else {
      return hours - 8;
    }
  }
}
