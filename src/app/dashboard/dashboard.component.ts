import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { UniversalService } from '../service/universal.service';

import { User } from '../../classes/user';
import { Game } from '../../classes/game';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private universalService: UniversalService,
		private http: HttpClient
	) { 
		
	}

	games: Game[];
	users: User[];

	@Input() user: User = {
		name: "",
		id: null,
		password: "",
		token: ''
	};

	logUser: User = {
		name: "",
		id: null,
		password: "",
		token: ''
	};

	buttonClick(): void {
		this.universalService.setUser(this.user.name, this.user.password)
	}

	submitClick() {
	  this.universalService.logIn(this.user.name, this.user.password).subscribe(response => {
	  	console.log(response);
	  })
	}	

	logoutClick() {
	  this.universalService.logOut();
	}	

	title = "MyGameList";

	ngOnInit() {
		this.getGames();
		this.getUsers();
	}

	query(): void {
		
	}

	getGames(): void {
		this.universalService.getAllGames().subscribe(games => {
			this.games = games.data.games
		});
	}

	getUsers(): void {
		this.universalService.getAllUsers().subscribe(users => {
			this.users = users.data.users
		});
	}
}
