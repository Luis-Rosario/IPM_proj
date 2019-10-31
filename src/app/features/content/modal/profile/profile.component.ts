import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/core/state/session.query';
declare const getUser: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  email: any;
 
  constructor(
    private sessionQuery: SessionQuery,
  ) { }


  ngOnInit() {
    this.email= this.sessionQuery.getValue().email; 
    this.userInfo=getUser(this.email);
  }

}
