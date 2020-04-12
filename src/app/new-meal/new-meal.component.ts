import {Component, Renderer2, OnInit} from '@angular/core';
import {MealService} from '../services/meal.service';
import {IMeal} from '../interfaces/IMeal';

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.css']
})
export class NewMealComponent implements OnInit {
  newMeal: IMeal;
  imgURL: any;
  constructor(private mealService: MealService, private rd: Renderer2) { }

  ngOnInit(): void {
    this.newMeal = this.mealService.getDefaultMeal();
    this.imgURL = 'assets/Rectangle.png';
  }

  onAddMeal() {
    console.log(this.newMeal);
    this.mealService.addMeal(this.newMeal);
    this.newMeal.id ++;
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
      this.newMeal.photoPath = this.imgURL;
    };
  }

}
