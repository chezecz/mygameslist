import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Game } from '../game';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location
    ) {}

  user : User[] = [
  {
  	id: 1, name: "EternalDeze"
  },
  {
  	id: 2, name: "KKomrade"
  },
  {
  	id: 3, name: "NintendoNumberOneFan"
  }]

  games : Game[] = [
  {
  	id: 1, name: "Mario Odyssey", description: "Platformer & Adventure"
  },
  {
  	id: 2, name: "Breath of the Wild", description: "Adventure"
  },
  {
  	id: 3, name: "Skyrim", description: "RPG Adventure"
  },
  {
  	id: 4, name: "Octopath Traveler", description: "JRPG"
  },
  {
  	id: 5, name: "Dead Cells", description: "Rogue-lite"
  },
  {
  	id: 6, name: "Sonic Mania", description: "2D Platformer"
  },
  {
  	id: 7, name: "Hollow Knight", description: "Metroidvania"
  }]

  ngOnInit() {
}

  back(): void {
    this.location.back();
  }

}
