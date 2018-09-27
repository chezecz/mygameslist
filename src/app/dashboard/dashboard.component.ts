import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UniversalService } from '../service/universal.service';

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
		private universalService: UniversalService
	) { 
		
	}

	@Input() user: User = {
		name: "",
		id: null,
		password: ""
	};

	buttonClick() {
		this.universalService.setUser(this.user.name, this.user.password)
	}

	title = "MyGameList";

	ngOnInit() {
		
	}

	query(): void {
		
	}
}
