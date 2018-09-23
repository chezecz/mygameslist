import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subscription } from 'rxjs';

import { List } from '../../classes/list';
import { User } from '../../classes/user';
import { Game } from '../../classes/game';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class UniversalService {

  list: List;
  game: Game;
  user: User;
  private querySubscription: Observable<any>;

  constructor(private apollo: Apollo) { }

  getList(): Observable<any> {
  	return ;
  }

  getUser(id): Observable<any> {
  	console.log(id)
  	const currentQuery = gql`
  		query ($id: Int!) {
  			user (id: $id) {
  				username
  				userid
  			}
  		}
  	`;
  	return this.apollo.watchQuery<any>({
  		query: currentQuery,
  		variables: {
  			id
  		},
  	}).valueChanges
  }

  // getGame(): void {
  // 	var id = 2;
  // 	const currentQuery = gql`
  // 		query ($id: Int!) {
  // 			game (id: $id) {
  // 				gamename
  // 				gamedesc
  // 			}
  // 		}
  // 	`;
  // 	this.querySubscription = this.apollo.watchQuery<any>({
  // 		query: currentQuery,
  // 		variables: {
  // 			id
  // 		},
  // 	}).valueChanges.subscribe(({data}) => {
  // 		this.game = data
  // 	});
  // }

  // getGames(): void {
  // 	var id = 2;
  // 	const currentQuery = gql`
  // 		query ($id: Int!) {
  // 			game (id: $id) {
  // 				gamename
  // 				gamedesc
  // 			}
  // 		}
  // 	`;
  // 	this.querySubscription = this.apollo.watchQuery<any>({
  // 		query: currentQuery,
  // 		variables: {
  // 			id
  // 		},
  // 	}).valueChanges.subscribe(({data}) => {
  // 		this.game = data
  // 	});
  // }

}
