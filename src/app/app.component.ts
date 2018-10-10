import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'MYGAMELIST';

	logoutClick() {
	  localStorage.clear();
	}	

	id = Number(localStorage.getItem('id'));

	gameid = Math.floor(Math.random() * 8) + 1;

}

