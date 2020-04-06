import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentMonth: string;
  constructor() { }

  ngOnInit(): void {
    this.currentMonth = moment().startOf('month').format('MMMM');
  }

}
