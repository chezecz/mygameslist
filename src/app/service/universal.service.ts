import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  constructor(private apollo: Apollo,
    private http: HttpClient) { }

  logIn(name, password): Observable<any> {
    return this.http.post('/login', {"username": name, "password": password});
  }

  logOut(): void {
    this.http.get('/logout').subscribe();
  }

  getList(id): Observable<any> {
  	const currentQuery = gql`
  		query ($id: Int!) {
  			lists (id: $id) {
    			listid
    			user {
      				username
    			}
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

  getUser(id): Observable<any> {
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

  getGame(id): Observable<any>  {
  	const currentQuery = gql`
  		query ($id: Int!) {
  			game (id: $id) {
  				gamename
  				gamedesc
  				gameid
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

  getGames(id): Observable<any>  {
  	const currentQuery = gql`
  		query ($id: Int!) {
  			listgames (id: $id) {
    			game {
      				gamename
      				gamedesc
      				gameid
    			}
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

  setUser(name, password): void {
  	const currentMutation = gql`
  		mutation($name: String!, $password: String!) {
  			newuser(name: $name, password: $password) {
  				username
  			}
  		}
  	`;
  	this.apollo.mutate({
  		mutation: currentMutation,
  		variables: {
  			name,
  			password
  		}
  	}).subscribe()
  }

  checkUser(name, password): Observable<any> {
    const currentQuery = gql`
    query($name: String!, $password: String!) {
      checkuser(name: $name, password: $password) {
        username
        userid
        token
      }
    }
    `;
    return this.apollo.watchQuery<any>({
      query: currentQuery,
      variables: {
        name,
        password
      }
    }).valueChanges
  }

  getAllUsers(): Observable<any> {
    const currentQuery = gql`
    query {
      users {
        username
        userid
      }
    }`;
    return this.apollo.watchQuery<any>({
      query: currentQuery
    }).valueChanges
  }

  getAllGames(): Observable<any> {
    const currentQuery = gql`
    query {
      games {
        gamename
        gameid
      }
    }`;
    return this.apollo.watchQuery<any>({
      query: currentQuery
    }).valueChanges
  }
}
