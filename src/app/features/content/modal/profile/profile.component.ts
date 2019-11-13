import { Component, OnInit } from "@angular/core";
import { SessionQuery } from "src/app/core/state/session.query";
declare const getUser: any;
declare const pagesFunctions: any;
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  email: any;

  constructor(private sessionQuery: SessionQuery) {}

  ngOnInit() {
    this.email = this.sessionQuery.getValue().email;
    this.userInfo = getUser(this.email);
    document.querySelector(".edit-btn").addEventListener("click", function() {
      document.querySelector(".container").classList.toggle("editable");
    });
    pagesFunctions.profile();
  }

  updateProfile() {
    alert("todo");
  }
}
