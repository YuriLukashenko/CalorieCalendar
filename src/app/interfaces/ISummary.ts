import {ITotal} from './ITotal';
import {IDay} from './IDay';

export interface ISummary {
  title: string;
  totalValues: ITotal;
  mealsOfDay: IDay[];
}
