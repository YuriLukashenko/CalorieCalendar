import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DashboardService {
  _firstDay: string;
  _lastDay: string;

  get firstDay() {
    return this._firstDay;
  }

  set firstDay(firstDay) {
    this._firstDay = firstDay;
  }

  get lastDay() {
    return this._lastDay;
  }

  set lastDay(lastDay) {
    this._lastDay = lastDay;
  }

  getCurrentWeek(): {day: number, month: string}[] {
    let weekNums: {day: number, month: string}[] = [];
    let dayOfWeek = moment().format('dddd');
    const now = moment().add(-7, 'days');
    switch (dayOfWeek) {
      case 'Monday':
        now.add(-1, 'days');
        break;
      case 'Tuesday':
        now.add(-2, 'days');
        break;
      case 'Wednesday':
        now.add(-3, 'days');
        break;
      case 'Thursday':
        now.add(-4, 'days');
        break;
      case 'Friday':
        now.add(-5, 'days');
        break;
      case 'Saturday':
        now.add(-6, 'days');
        break;
      case 'Sunday':
        now.add(-7, 'days');
        break;
    }
    for (let i = 0; i < 7; i++) {
      weekNums.push({
        day: +now.add(1, 'days').format('D'),
        month: now.format('MMMM')
      });
      if (i === 0) {
        this.firstDay = now.format('YYYY-MM-DD');
      }
      if (i === 6) {
        this.lastDay = now.format('YYYY-MM-DD');
      }
    }
    return weekNums;
  }
}
