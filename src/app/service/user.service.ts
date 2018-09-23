import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { User } from '../../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): void {
  	return;
  }
}
