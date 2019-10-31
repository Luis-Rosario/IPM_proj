import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';
import { SessionQuery } from './session.query';



@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,

  ) { }


  logUser(name){
    this.sessionStore.update({
        username: name,
        data: '',
        logged: true, 
      })
  }

  isLogged() : Boolean{
      return this.sessionQuery.getValue().logged;
  }

}