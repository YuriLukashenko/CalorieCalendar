import {Component, Input, OnInit} from '@angular/core';
import {IMeal} from '../interfaces/IMeal';
import {MealService} from '../services/meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  @Input() meal: IMeal;
  @Input() isExist: boolean;
  constructor(private mealService: MealService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.mealService.selectedMeal = this.meal;
  }
}
