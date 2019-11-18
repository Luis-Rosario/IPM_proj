import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../core/state/session.service';

declare const getUser;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit, OnChanges {
  loginError: boolean = false;
  passwordError: boolean = false;
  errorMessage: string ="";
  constructor(
    public router: Router,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.ngOnInit();
    console.log("change")
  }


  login(username, password) {
    this.loginError= false;
    this.passwordError = false;

    if (username == null || username == '' || username == undefined){
      this.loginError = true;
      this.errorMessage = "Incorrect e-mail address";
    } else {
      let user = getUser(username)

      if(user == undefined){
       this.loginError = true;
       this.errorMessage ="Incorrect e-mail address"
      } else {
       if(user.password == password){
            
         this.sessionService.logUser(username);
         setTimeout(() => {
         this.router.navigate(['home']);
         }, 1); //lol 
       }
       else{
         if(!this.loginError) {
          this.passwordError = true
          this.errorMessage = "Incorrect password"
         }
       }
      }
     }

    }
    
    // else if (password == null || password == '' || password == undefined){
    //   this.passwordError = true;
    //   if(!this.loginError)
    //     this.errorMessage ="Incorrect password"
    // }
     
    



}
