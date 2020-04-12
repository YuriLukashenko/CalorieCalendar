import { Component, OnInit } from '@angular/core';
import {ISummary} from '../interfaces/ISummary';
import {ActivatedRoute} from '@angular/router';
import {SettingsService} from '../services/settings.service';
import {ISettings} from '../interfaces/ISettings';
import {SummaryService} from '../services/summary.service';
import {IMeal} from '../interfaces/IMeal';
import {MealService} from '../services/meal.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  summary: ISummary;
  limitFromSettings: ISettings;
  limitCalories: number;
  constructor(private route: ActivatedRoute,
              private settingsService: SettingsService,
              private summaryService: SummaryService,
              private mealService: MealService) {
  }

  ngOnInit(): void {
    this.summary = this.summaryService.selectedSummary;
    this.limitFromSettings = this.settingsService.setting;
    if (this.summary.totalValues.totalKcal < this.limitFromSettings.minKcal) {
      this.limitCalories = this.limitFromSettings.minKcal;
    } else if (this.summary.totalValues.totalKcal < this.limitFromSettings.maxKcal) {
      this.limitCalories = this.limitFromSettings.maxKcal;
    } else {
      this.limitCalories = this.limitFromSettings.maxKcal;
    }
  }

  onClick(meal: IMeal) {
    this.mealService.selectedMeal = meal;
  }
}
