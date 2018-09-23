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

	game : Game;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private universalService: UniversalService
		) { }

	title = "Description";

	ngOnInit() {
		
	}

	back(): void {
		this.location.back();
	}

	// getGames(): void {
	// 	this.game = this.universalService.getGame().subscribe(game => this.game = game);
	// }

}
