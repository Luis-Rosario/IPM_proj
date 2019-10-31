import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { SessionService } from '../core/state/session.service'

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  logged: Boolean;

  constructor(
    public router: Router,
    private sessionService: SessionService,
    ) { }

  /* Condição que verifica se esta loggado ou n, caso n esteja manda para a pagina de login */
  canActivate(): boolean {
   
    this.logged= this.sessionService.isLogged();

    if (this.logged == false) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
