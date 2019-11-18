import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

declare const addUser: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submited: boolean = false;
  noMatch: boolean = false;

  constructor(
    public router: Router,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.initForm();
  }


  register() {
    //logic to update the JSON object
    /*   */
    this.noMatch=false;
    if(this.form.controls['password'].value != this.form.controls['PasswordConfim'].value ){
      this.noMatch = true;
    }
    /* console.log(this.form) */
    this.submited= false;
    if(this.form.valid && !this.noMatch){
      addUser(this.form.value)
      this.router.navigateByUrl('/login');
    }
    else{this.submited= true;}
  }


  initForm() {
    this.form = this.fb.group({
      first_name: '',
      last_name: '',
      birthdate: '',
      gender: '',
      street_address: '',
      postal_code1: '',
      postal_code2: '', 
      city: '',
      email: '',
      password: '',
      PasswordConfim: '',
      card_number: '',
      expiration_date1: '',
      expiration_date2: '',
      security_code: '',
    })
  }

}
