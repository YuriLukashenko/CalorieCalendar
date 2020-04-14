import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DashboardService {
  private _firstDay: string;
  private _lastDay: string;
  private _monthName: string;
  weekOffset = 0;

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

  weekInc() {
    this.weekOffset++;
  }

  weekDec() {
    this.weekOffset--;
  }

  get monthName() {
    return this._monthName;
  }

  getCurrentWeek(): {day: number, month: string}[] {
    let weekNums: {day: number, month: string}[] = [];
    let dayOfWeek = moment().format('dddd');
    const now = moment();
    switch (dayOfWeek) {
      case 'Monday':
        now.add(-1 + this.weekOffset * 7, 'days');
        break;
      case 'Tuesday':
        now.add(-2 + this.weekOffset * 7, 'days');
        break;
      case 'Wednesday':
        now.add(-3 + this.weekOffset * 7, 'days');
        break;
      case 'Thursday':
        now.add(-4 + this.weekOffset * 7, 'days');
        break;
      case 'Friday':
        now.add(-5 + this.weekOffset * 7, 'days');
        break;
      case 'Saturday':
        now.add(-6 + this.weekOffset * 7, 'days');
        break;
      case 'Sunday':
        now.add(-7 + this.weekOffset * 7, 'days');
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
        this._monthName = now.format('MMMM');
      }
    }
    return weekNums;
  }
}
