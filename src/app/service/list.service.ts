import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { List } from '../../classes/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  list: List;

  constructor() { }

  getList(): void {
  	return;
  }
}
