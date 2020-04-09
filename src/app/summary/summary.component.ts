import { Component, OnInit } from '@angular/core';
import {ISummary} from '../interfaces/ISummary';
import {ActivatedRoute} from '@angular/router';
import {SettingsService} from '../services/settings.service';
import {ISettings} from '../interfaces/ISettings';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  summary: ISummary;
  limitFromSettings: ISettings;
  limitCalories: number;
  constructor(private route: ActivatedRoute, private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
       const summary = JSON.parse(params['summary']);
       this.summary = summary;
       this.limitFromSettings = this.settingsService.setting;
       if (this.summary.totalValues.totalKcal < this.limitFromSettings.minKcal) {
         this.limitCalories = this.limitFromSettings.minKcal;
       } else if (this.summary.totalValues.totalKcal < this.limitFromSettings.maxKcal) {
         this.limitCalories = this.limitFromSettings.maxKcal;
       } else {
         this.limitCalories = this.limitFromSettings.maxKcal;
       }
    });
  }
}
