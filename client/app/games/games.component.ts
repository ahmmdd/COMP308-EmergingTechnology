import { Component } from '@angular/core';
import { GamesService } from './games.service';

@Component({
  selector: 'games',
  template: '<router-outlet></router-outlet>',
  //template: '<h1>GAMES!!!</h1>',
  providers: [GamesService]
})
export class GamesComponent {

  constructor() {
    console.log("---- GAMES!!! ----");
  }
}
