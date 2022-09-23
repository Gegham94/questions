import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slider ]
})
export class AppComponent {
  title = 'questions';
  prepareRout(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
