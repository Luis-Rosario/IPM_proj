import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/core/state/session.query';
declare const getUser: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  email: String;
  userInfo: any;

  constructor(
    private sessionQuery: SessionQuery,
  ) { }

  ngOnInit() {
    this.email= this.sessionQuery.getValue().email; //na store estara guardado o email
    this.userInfo =getUser(this.email);
    console.log(this.userInfo)
  }

}
/*
birthdate: "2019/01/09"
borrower_rating: 3
card_number: "00000000"
city: "Lissabona"
city_id: 1
email: "a@a.com"
expiration_date: "09/20"
first_name: "First"
gender: "M"
last_name: "Last"
lender_rating: 4.8
llama_points: 400
password: "abc"
postal_code: "7100-111"
security_code: "099"
street_address: "Rua cenas"
*/ 