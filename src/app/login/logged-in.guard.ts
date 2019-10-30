import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  logged: boolean = true;

  constructor(public router: Router) { }

  /* Condição que verifica se esta loggado ou n, caso n esteja manda para a pagina de login */
  canActivate(): boolean {
   
    if (this.logged == false) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
