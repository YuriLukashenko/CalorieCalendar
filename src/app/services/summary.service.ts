import {ISummary} from '../interfaces/ISummary';

export class SummaryService {
  private _selectedSummary: ISummary;

  get selectedSummary() {
    return this._selectedSummary;
  }

  set selectedSummary(selected) {
    this._selectedSummary = selected;
  }
}
