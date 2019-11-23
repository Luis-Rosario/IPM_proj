import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../core/state/session.service';

declare const getUser;
declare const showToast;
declare const json;
declare const passwordEyeHandler;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit, OnChanges {
  loginError: boolean = false;
  passwordError: boolean = false;
  errorMessage: string = "";
  constructor(
    public router: Router,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    passwordEyeHandler();
  }

  ngOnChanges() {
    this.ngOnInit();
  }


  login(username, password) {
    this.loginError = false;
    this.passwordError = false;

    if (username == null || username == '' || username == undefined) {
      this.loginError = true;
      this.errorMessage = "Incorrect e-mail address";
    } else {
      let user = getUser(username)

      if (user == undefined) {
        this.loginError = true;
        this.errorMessage = "Incorrect e-mail address"
      } else {
        if (user.password == password) {

          this.sessionService.logUser(username);
          setTimeout(() => {
            let userInfo = getUser(username)
            /*  showToast("Xilema, pls"); */
            showToast("Welcome back, " + userInfo.first_name + " " + userInfo.last_name + "!");
            setTimeout(() => {
              if (json && json.pending_reviews && json.pending_reviews[username]) {
                let review = json.pending_reviews[username].pop();
                if (review) {
                  let lenderName = getUser(review).first_name + " " + getUser(review).last_name;
                  $("#rate-borrower").modal("show");
                  $("#rate-borrower").attr("data-email", review);
                  $("#rate-borrower").attr("data-type", "lender");
                  $("#rate-borrower .modal-header").text("Rate " + lenderName);
                }
              }
            }, 200)

            this.router.navigate(['home']);
          }, 1); //lol 
        }
        else {
          if (!this.loginError) {
            this.passwordError = true
            this.errorMessage = "Incorrect password"
          }
        }
      }
    }

  }

  keypress(username, password, ev) {
    if (ev.key == "Enter") {
      this.login(username, password)
    }
  }

}
