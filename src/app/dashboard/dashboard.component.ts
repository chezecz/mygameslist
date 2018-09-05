import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { User } from '../../classes/user';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private location: Location,
		apollo: Apollo
	) { 
		apollo.query({query: gql`{users{username}}`}).subscribe(console.log)
	}

	user: User[] = [
	{
		id: 1, name: "EternalDeze"
	},
	{
		id: 2, name: "KKomrade"
	},
	{
		id: 3, name: "NintendoNumberOneFan"
	}]

	buttonClick() {
		
	}

	title = "MyGameList";

	ngOnInit() {
		this.query()
	}

	query(): void {
		
	}
}
