import { Injectable } from '@angular/core';
import { HeaderElem } from '../models/header'

@Injectable({
  providedIn: 'root'
})

export class HeaderService {
  constructor() {}

  private headerData: HeaderElem[] = [
    {
      name: 'Management Question',
      route: ['/management-question'],
    },
    {
      name: 'Create Question',
      route: ['/create-question'],
    },
    {
      name: 'Edit Question',
      route: ['/edit-question'],
    },
    {
      name: 'Questions List',
      route: ['/list-questions'],
    },
  ];

  get header(): HeaderElem[] {
    return this.headerData;
  }
}
