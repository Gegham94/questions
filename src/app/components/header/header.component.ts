import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderService } from 'src/app/core/services/header.service';

import { slider } from './route-animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [ slider ]
})
export class HeaderComponent implements OnInit {

  constructor( public headerService: HeaderService ) { }

  ngOnInit(): void { }
  public headerData = this.headerService.header;

  prepareRout(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
