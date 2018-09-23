import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Game } from '../../classes/game';
import { User } from '../../classes/user';

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
		id: 0,
		name: ""
	};

	games: Game[];

	ngOnInit() {
		// console.log(this.user);
		this.getId();
		this.getUser();
		// this.getList();
	}

	getId(): void {
		this.id = +this.route.snapshot.paramMap.get('id')
	}

	back(): void {
		this.location.back();
	}

	getUser(): void {
		this.universalService.getUser(this.id).subscribe(user => {
			this.user.id = user.data.user["userid"]
			this.user.name = user.data.user["username"]
			console.log(this.user)
		});
	}

	// getList(): void {
	// 	this.games = this.listService.getGames().subscribe(games => this.games = games);
	// }

}
