import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
	) { 
		
	}

	user: User[];

	buttonClick() {
		
	}

	title = "MyGameList";

	ngOnInit() {
		
	}

	query(): void {
		
	}
}
