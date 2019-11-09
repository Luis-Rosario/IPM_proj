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
 
    if(this.form.valid){
      addUser(this.form.value)
      this.router.navigateByUrl('/login');
    }
  }


  initForm() {
    this.form = this.fb.group({
      first_name: '',
      last_name: '',
      birthdate: '',
      gender: '',
      street_address: '',
      postal_code: '',
      city: '',
      email: '',
      password: '',
      PasswordConfim: '',
      card_number: '',
      expiration_date: '',
      security_code: '',
    })
  }

}
