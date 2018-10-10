import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Game } from '../../classes/game';
import { List } from '../../classes/list';

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

	lists: List[];

	userid: number;

	id: number;

	selected: string;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private universalService: UniversalService
		) { }

	title = "Description";

	ngOnInit() {
		this.getId();
		this.getGame();
		this.getLists();
	}

	back(): void {
		this.location.back();
	}

	getId(): void {
		this.id = +this.route.snapshot.paramMap.get('id')
	}

	addGame(): void {
		this.universalService.addGame(this.selected, this.id).subscribe(response => {
			location.reload();
		})
	}

	getLists(): void {
		this.userid = Number(localStorage.getItem('id'));
		this.universalService.getList(this.userid).subscribe(response => {
			this.lists = response.data.lists;
		})
	}

	getGame(): void {
		this.universalService.getGame(this.id).subscribe(game => {
			this.game.id = game.data.game.gameid;
			this.game.name = game.data.game.gamename;
			this.game.description = game.data.game.gamedesc;
		});
	}

}
