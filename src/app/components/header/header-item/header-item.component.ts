import { Component, Input, OnInit } from '@angular/core';
import { HeaderElem } from 'src/app/core/models/header';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.scss']
})
export class HeaderItemComponent implements OnInit {

  @Input() item!: HeaderElem;

  constructor() { }

  ngOnInit(): void {
  }

}
