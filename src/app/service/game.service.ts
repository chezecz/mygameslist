import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Game } from '../../classes/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }
}