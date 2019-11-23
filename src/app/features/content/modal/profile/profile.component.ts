import { Component, OnInit } from "@angular/core";
import { SessionQuery } from "src/app/core/state/session.query";
declare const getUser: any;
declare const pagesFunctions: any;
declare const editUser: any;
declare const showToast: any;
declare const $: any;
declare const clearStorage: any
declare const pushData: any
declare const isConnectedToServer: any

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  email: any;
  validated: any = false;

  constructor(private sessionQuery: SessionQuery) { }

  ngOnInit() {
    this.email = this.sessionQuery.getValue().email;
    this.userInfo = getUser(this.email);
    document
      .querySelector(".container .edit-btn")
      .addEventListener("click", function () {
        if (
          !document.querySelector(".container").classList.contains("editable")
        ) {
          console.log(1);
          document.querySelector(".container").classList.add("editable");
        }
      });
    pagesFunctions.profile();
    setInterval(() => {
      $("#peerjs-status").text(isConnectedToServer ? "YES" : "NO")
    }, 500);
  }

  updateProfile() {

    if (this.formValidation()) {
      if (document.querySelector(".container.editable")) {
        let editObj = {

          email: this.email,

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
          postal_code1: (<HTMLInputElement>(
            document.querySelector("#postal-code1-input")
          )).value,
          postal_code2: (<HTMLInputElement>(
            document.querySelector("#postal-code2-input")
          )).value,
          city: (<HTMLInputElement>document.querySelector("#city-input")).value,
          card_number: (<HTMLInputElement>(
            document.querySelector("#card-num-input")
          )).value,
          expiration_date1: (<HTMLInputElement>(
            document.querySelector("#card-exp1-input")
          )).value,
          expiration_date2: (<HTMLInputElement>(
            document.querySelector("#card-exp2-input")
          )).value,
          security_code: (<HTMLInputElement>(
            document.querySelector("#card-cvv-input")
          )).value
        };
        editUser(editObj);
        showToast("Profile updated");
        let el = document.querySelector(".container.editable");
        setTimeout(() => {
          let el = document.querySelector(".container.editable");
          if (el) el.classList.remove("editable");
        }, 100);
      }
    }

  }

  formValidation() {
    $(".error-message").addClass("hidden");
    this.validated = true;
    let first_name = (<HTMLInputElement>(
      document.querySelector("#first-name-input")
    )).validity.valid;
    if (!first_name)
      $(document.querySelector("#first-name-input").parentElement).find(".error-message").removeClass("hidden")

    let last_name = (<HTMLInputElement>(
      document.querySelector("#last-name-input")
    )).validity.valid;
    if (!last_name)
      $(document.querySelector("#last-name-input").parentElement).find(".error-message").removeClass("hidden")

    let birthdate = (<HTMLInputElement>(
      document.querySelector("#birthdate-input")
    )).validity.valid;
    if (!birthdate)
      $(document.querySelector("#birthdate-input").parentElement).find(".error-message").removeClass("hidden")

    let gender = (<HTMLInputElement>(
      document.querySelector('input[name="gender"]:checked')
    )).validity.valid;
    if (!gender)
      $(document.querySelector('input[name="gender"]:checked').parentElement).find(".error-message").removeClass("hidden")


    let street_address = (<HTMLInputElement>(
      document.querySelector("#street-input")
    )).validity.valid;
    if (!street_address)
      $(document.querySelector("#street-input").parentElement).find(".error-message").removeClass("hidden")

    let postal_code1 = (<HTMLInputElement>(
      document.querySelector("#postal-code1-input")
    )).validity.valid;
    if (!postal_code1)
      $(document.querySelector("#postal-code1-input").parentElement).find(".error-message").removeClass("hidden")

    let postal_code2 = (<HTMLInputElement>(
      document.querySelector("#postal-code2-input")
    )).validity.valid;
    if (!postal_code2)
      $(document.querySelector("#postal-code2-input").parentElement).find(".error-message").removeClass("hidden")

    let city = (<HTMLInputElement>(
      document.querySelector("#city-input")
    )).validity.valid;
    if (!city)
      $(document.querySelector("#city-input").parentElement).find(".error-message").removeClass("hidden")

    let card_number = (<HTMLInputElement>(
      document.querySelector("#card-num-input")
    )).validity.valid;
    if (!card_number)
      $(document.querySelector("#card-num-input").parentElement).find(".error-message").removeClass("hidden")

    let expiration_date1 = (<HTMLInputElement>(
      document.querySelector("#card-exp1-input")
    )).validity.valid;
    if (!expiration_date1)
      $(document.querySelector("#card-exp1-input").parentElement).find(".error-message").removeClass("hidden")

    let expiration_date2 = (<HTMLInputElement>(
      document.querySelector("#card-exp2-input")
    )).validity.valid;
    if (!expiration_date2)
      $(document.querySelector("#card-exp2-input").parentElement).find(".error-message").removeClass("hidden")

    let security_code = (<HTMLInputElement>(
      document.querySelector("#card-cvv-input")
    )).validity.valid;
    if (!security_code)
      $(document.querySelector("#card-cvv-input").parentElement).find(".error-message").removeClass("hidden")

    return first_name && security_code && expiration_date1 && expiration_date2 && card_number && city && postal_code1 && postal_code2 && street_address && gender && birthdate && last_name
  }

  validInput(id) {
    setTimeout(() => {
      /*   console.log( (<HTMLInputElement>(document.getElementById(id))).validity.valid) */
      return (<HTMLInputElement>(document.getElementById(id))).validity.valid
    }, 100)

    /*   */
  }

  clearCache() {
    clearStorage();
    setTimeout(() => {
      window.location.reload(true);
    }, 1000)

  }
}
