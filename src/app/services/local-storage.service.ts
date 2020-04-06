import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {
  }

  itemToLocalStorage(item: any, itemName: string) {
    const serializedItem = JSON.stringify(item);
    localStorage.setItem(itemName, serializedItem);
  }

  itemFromLocalStorage(itemName: string) {
    return JSON.parse(localStorage.getItem(itemName));
  }
}
