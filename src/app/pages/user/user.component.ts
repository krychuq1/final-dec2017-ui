import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'user',
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserComponent {
  emailForm: FormGroup;
  emailControler;
  EMAIL_PATTERN = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

  constructor(private formBuilder: FormBuilder){
    this.buildForm();
  }

  private buildForm(){
    this.emailForm = this.formBuilder.group({
      email : this.formBuilder.control(null, [Validators.pattern(this.EMAIL_PATTERN), Validators.required])
    });
    this.emailControler = this.emailForm.get('email');
  }
  public onSubmitForm(){
    // make a call to api to check if email exits

    console.log(this.emailControler.value);
  }
}
