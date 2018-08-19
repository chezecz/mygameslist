import { Component, OnInit } from '@angular/core';

import { Game } from '../game';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  constructor() { }

  title = "Game List"

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

}
