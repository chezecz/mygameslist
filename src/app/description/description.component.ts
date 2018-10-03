import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Game } from '../../classes/game';

import { UniversalService } from '../service/universal.service';

@Component({
	selector: 'app-description',
	templateUrl: './description.component.html',
	styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

	game : Game = {
		id: null,
		name: "",
		description: ""
	};

	id: number;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private universalService: UniversalService
		) { }

	title = "Description";

	ngOnInit() {
		this.getId();
		this.getGame();
	}

	back(): void {
		this.location.back();
	}

	getId(): void {
		this.id = +this.route.snapshot.paramMap.get('id')
	}

	getGame(): void {
		this.universalService.getGame(this.id).subscribe(game => {
			this.game.id = game.data.game.gameid;
			this.game.name = game.data.game.gamename;
			this.game.description = game.data.game.gamedesc;
		});
		console.log(this.game)
	}

}
