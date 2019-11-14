import { Component, OnInit } from "@angular/core";
import { SessionQuery } from "src/app/core/state/session.query";
declare const getUser: any;
declare const pagesFunctions: any;
declare const editUser: any;
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
    document
      .querySelector(".container .edit-btn")
      .addEventListener("click", function() {
        if (
          !document.querySelector(".container").classList.contains("editable")
        ) {
          console.log(1);
          document.querySelector(".container").classList.add("editable");
        }
      });
    pagesFunctions.profile();
  }

  updateProfile() {
    if (document.querySelector(".container.editable")) {
      let editObj = {
        //"password":"x",
        email: this.email,
        //"password": (<HTMLInputElement>document.querySelector("")).value,

        first_name: (<HTMLInputElement>(
          document.querySelector("#first-name-input")
        )).value,
        last_name: (<HTMLInputElement>(
          document.querySelector("#last-name-input")
        )).value,
        birthdate: (<HTMLInputElement>(
          document.querySelector("#birthdate-input")
        )).value,
        gender: (<HTMLInputElement>(
          document.querySelector('input[name="gender"]:checked')
        )).value,

        street_address: (<HTMLInputElement>(
          document.querySelector("#street-input")
        )).value,
        postal_code: (<HTMLInputElement>(
          document.querySelector("#postal-code-input")
        )).value,
        city: (<HTMLInputElement>document.querySelector("#city-input")).value,
        //"city_id": (<HTMLInputElement>document.querySelector("")).value,
        card_number: (<HTMLInputElement>(
          document.querySelector("#card-num-input")
        )).value,
        expiration_date: (<HTMLInputElement>(
          document.querySelector("#card-exp-input")
        )).value,
        security_code: (<HTMLInputElement>(
          document.querySelector("#card-cvv-input")
        )).value
        // "lender_rating": (<HTMLInputElement>document.querySelector("")).value,
        // "borrower_rating": (<HTMLInputElement>document.querySelector("")).value,
        // "llama_points": (<HTMLInputElement>document.querySelector("")).value,
        // "total_borrowed": (<HTMLInputElement>document.querySelector("")).value,
        // "total_lent": (<HTMLInputElement>document.querySelector(""))).value,
      };
      editUser(editObj);
      alert("Profile updated");
      let el = document.querySelector(".container.editable");
      setTimeout(() => {
        let el = document.querySelector(".container.editable");
        if (el) el.classList.remove("editable");
      }, 100);
    }
  }
}
