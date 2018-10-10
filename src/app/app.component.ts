import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'MYGAMELIST';
  isLogged = localStorage.getItem('token');

	logoutClick() {
	  localStorage.clear();
    this.isLogged = localStorage.getItem('token');
	}	

	id = Number(localStorage.getItem('id'));

	gameid = Math.floor(Math.random() * 8) + 1;

}

