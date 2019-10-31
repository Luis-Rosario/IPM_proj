import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../core/state/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  showerror: Boolean = false;

  constructor(
    public router: Router,
    private sessionService: SessionService,
    ) { }

  ngOnInit() {
  }


  login(username){
    if(username == null || username == '' || username ==undefined)
      this.showerror= true;

    else{
      this.showerror= true;
      this.sessionService.logUser(username);
      this.router.navigateByUrl('/home');
    }
    
  }
}
