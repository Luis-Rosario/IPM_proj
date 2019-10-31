import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';


export interface Session {
    email: string;
    data: any;
    logged: boolean;
}

/**Creates the model to be stored in the store, in our case it will store the logged user's permissions and it's role */
export function createInitialState(): Session {
    return {
        email: '',
        data: '',
        logged: false
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<Session> {

    constructor() {
        super(createInitialState());
    }

}
