import { Component, OnInit } from '@angular/core';
import {MealService} from '../services/meal.service';
import {IMeal} from '../interfaces/IMeal';

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.css']
})
export class NewMealComponent implements OnInit {
  newMeal: IMeal;
  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    this.newMeal = this.mealService.getDefaultMeal();
  }

  onAddMeal() {
    this.mealService.addMeal(this.newMeal);
    this.newMeal.id ++;
  }

}
