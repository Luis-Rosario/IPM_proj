import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
    this.router.navigateByUrl('/login');

  }

  
  initForm() {
    this.form = this.fb.group({
      FirsName: '',
      LastName: '',
      DateOfBirth: '',
      Gender: '',
      Address: '',
      PostalCode1: '',
      PostalCode2: '',
      City: '',
      Email: '',
      Password: '',
      PasswordConfim: '',
      CardNumber: '',
      ExpirationDate: '',
      SecurityCode1: '',
      SecurityCode2: ''
    })
  }

}
