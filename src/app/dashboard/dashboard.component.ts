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

	submitClick() {
	  this.universalService.checkUser(this.user.name, this.user.password).subscribe(response => {
	  	console.log(response)
	  	if (response.data.checkuser == null) {
	  		return "Wrong Username/Password"
	  	} else {
	  		this.logUser.name = response.data.checkuser.username;
	  		this.logUser.id = response.data.checkuser.userid;
	  		this.logUser.token = response.data.checkuser.token;
	  		localStorage.setItem('mygameslist', JSON.stringify(this.logUser));
	  		localStorage.setItem('token', response.data.checkuser.token);
	  	}
	  })
	}	

	signUpClick() {
		this.universalService.setUser(this.user.name, this.user.password)
	}

	logoutClick() {
	  this.universalService.logOut();
	  localStorage.removeItem('mygameslist');
	}	

	title = "MyGameList";

	ngOnInit() {
		this.getGames();
		this.getUsers();
		if (localStorage.getItem('token') == undefined) {
			localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAiLCJuYW1lIjoiIiwiaWF0IjoxNTE2MjM5MDIyfQ.jOcjEhc41gaNRvvE48IEyKyV8_cR-HSVgNNj6lPSxJg");
		}
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
