import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Game } from '../../classes/game';
import { User } from '../../classes/user';
import { List } from '../../classes/list';

import { UniversalService } from '../service/universal.service';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private universalService: UniversalService,
		private apollo: Apollo
		) {}

	id: number;

	user: User = {
		id: null,
		name: "",
		password: "",
		token: ""
	};

	games: Game[];

	lists: List[];

	ngOnInit() {
		this.getId();
		this.getUser();
		this.getList();
		this.getGames();
	}

	getId(): void {
		this.id = +this.route.snapshot.paramMap.get('id')
	}

	back(): void {
		this.location.back();
	}

	getUser(): void {
		this.universalService.getUser(this.id).subscribe(user => {
			this.user.name = user.data.user.username;
			this.user.id = user.data.user.userid;
		});
	}

	getList(): void {
		this.universalService.getList(this.id).subscribe(list => {
			this.lists = list.data.lists;
		});
	}

	getGames(): void {
		this.universalService.getGames(this.id).subscribe(games => {
			this.games = games.data.listgames
		});
	}

}
