import { Query } from '@datorama/akita';
import { Session, SessionStore } from './session.store';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<Session> {

  constructor(protected store: SessionStore) {
    super(store);
  }


  
}