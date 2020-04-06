import {Time} from '@angular/common';

export interface IMeal {
  id: number;
  title: string;
  kcal: number;
  date: string;
  time: Time;
  fats: number;
  proteins: number;
  carbs: number;
  photoPath: string;
}
