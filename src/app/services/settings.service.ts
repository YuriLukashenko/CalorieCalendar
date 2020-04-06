import {Injectable} from '@angular/core';
import {ISettings} from '../interfaces/ISettings';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class SettingsService {
  private _setting: ISettings;

  constructor(private localStorageService: LocalStorageService) {
    const tempSetting = this.localStorageService.itemFromLocalStorage('setting');
    this.setting = tempSetting != null ? tempSetting : this.setDefaults();
    console.log(this.setting);
  }

  setDefaults() {
    return {
      isMale: false,
      weight: 55,
      height: 160,
      minKcal: 1431,
      maxKcal: 1833,
      fats: 73,
      proteins: 462,
      carbs: 505
    };
  }

  get setting(): ISettings {
    return this._setting;
  }

  set setting(setting: ISettings) {
    this._setting = setting;
    this.localStorageService.itemToLocalStorage(setting, 'setting');
  }

  calculateCalories(): ISettings {
    // formula Harris–Benedict. Calculated for 25-years-old human
    const BMR = this._setting.isMale
      ? 66.5 + (13.75 * this._setting.weight) + (5 * this._setting.height) - (6.755 * 25)
      : 655.1 + (9.563 * this._setting.weight) + (1.85 * this._setting.height) - (4.676 * 25);
    const averangeCal = Math.floor(BMR * 1.2);
    const confidenceRange = this._setting.isMale ? 213 : 201;
    this._setting.maxKcal = averangeCal + confidenceRange;
    this._setting.minKcal = averangeCal - confidenceRange;

    // calculate FPC
    this._setting.proteins = Math.floor(this._setting.isMale
      ? this._setting.weight * 2.3 * 4
      : this._setting.weight * 2.1 * 4);
    this._setting.carbs = Math.floor(this._setting.isMale
      ? this._setting.weight * 2.5 * 4
      : this._setting.weight * 2.3 * 4) ;
    this._setting.fats = Math.floor((averangeCal - this._setting.proteins - this._setting.carbs) / 9);

    return this._setting;
  }
}
