import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IMeal} from '../interfaces/IMeal';

@Component({
  selector: 'app-meal-show',
  templateUrl: './meal-show.component.html',
  styleUrls: ['./meal-show.component.css']
})
export class MealShowComponent implements OnInit {
  meal: IMeal;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.meal = JSON.parse(this.route.snapshot['queryParams'].meal) as IMeal;
  }

}
