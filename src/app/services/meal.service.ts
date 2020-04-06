import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {IMeal} from '../interfaces/IMeal';
import * as moment from 'moment';

@Injectable()
export class MealService {
  private _mealCount: number;

  constructor(private localStorageService: LocalStorageService) {
    const tempMealCount = this.localStorageService.itemFromLocalStorage('mealCount');
    this._mealCount = tempMealCount != null ? tempMealCount : 0;

    let now = moment();
    console.log(now.format());
    console.log(now.add(-7, 'months').format());
  }

   getDefaultMeal(): IMeal {
    return {
      id: this._mealCount + 1,
      title: '',
      kcal: null,
      time: null,
      date: new Date().toJSON().slice(0, 10),
      carbs: null,
      fats: null,
      photoPath: '',
      proteins: null
    };
  }

  get mealCount() {
    return this._mealCount;
  }

  set mealCount(mealCount: number ) {
    this._mealCount = mealCount;
    this.localStorageService.itemToLocalStorage(mealCount, 'mealCount');
  }

  addMeal(meal: IMeal) {
    this.localStorageService.itemToLocalStorage(meal, 'meal_' + meal.id);
    this.mealCount ++;
  }
}
