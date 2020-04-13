import {Component, Input, OnInit} from '@angular/core';
import {SettingsService} from '../services/settings.service';
import {ISettings} from '../interfaces/ISettings';
import {AuthService} from 'angularx-social-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  personalSettings: ISettings;
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.personalSettings = this.settingsService.setting;
  }

  selectMale() {
    this.personalSettings.isMale = true;
  }

  selectFemale() {
    this.personalSettings.isMale = false;
  }

  onCalculateRate() {
    this.personalSettings = this.settingsService.calculateCalories();
  }

  onSaveSettings() {
    console.log(this.personalSettings);
    this.settingsService.setting = this.personalSettings;
  }
}
