import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IMeal} from '../interfaces/IMeal';
import {ISummary} from '../interfaces/ISummary';
import {MealService} from '../services/meal.service';

@Component({
  selector: 'app-meal-show',
  templateUrl: './meal-show.component.html',
  styleUrls: ['./meal-show.component.css']
})
export class MealShowComponent implements OnInit {
  meal: IMeal;
  summary: ISummary;
  imgURL: any;
  previousPage = '/dashboard';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private mealService: MealService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.previousPage = params.page;
    });
    this.meal = this.mealService.selectedMeal;
    this.imgURL = (this.meal.photoPath === '' || this.meal.photoPath === undefined)
      ? 'assets/Rectangle.png'
      : this.meal.photoPath;
  }

  onCancel() {
    this.router.navigate([this.previousPage]);
  }
}
