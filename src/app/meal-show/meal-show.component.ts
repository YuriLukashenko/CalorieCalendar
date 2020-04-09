import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IMeal} from '../interfaces/IMeal';
import {ISummary} from '../interfaces/ISummary';

@Component({
  selector: 'app-meal-show',
  templateUrl: './meal-show.component.html',
  styleUrls: ['./meal-show.component.css']
})
export class MealShowComponent implements OnInit {
  meal: IMeal;
  summary: ISummary;
  previousPage = '/dashboard';
  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.meal = JSON.parse(params.meal);
      this.previousPage = params.page;
      this.summary = JSON.parse(params.summary);
    });

    // this.meal = JSON.parse(this.route.snapshot['queryParams'].meal) as IMeal;
  }

  onCancel() {
    if (this.previousPage === '/summary') {
      this.router.navigate(['/summary'], {
        queryParams: {
          summary: JSON.stringify(this.summary)
        }
      });
    }
    if (this.previousPage === '/dashboard') {
      this.router.navigate(['/dashboard']);
    }
  }
}
