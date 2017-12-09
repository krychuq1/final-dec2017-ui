import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserComponent} from '../../pages/user/user.component';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'user-register',
    templateUrl: './user-register.html',
    styleUrls: ['./user-register.scss']
})
export class UserRegisterComponent {
  registerForm: FormGroup;
  emailController;
  EMAIL_PATTERN = /^[a-z]+[a-z0-9._]+@[a-z]+[a-z0-9._]+\.[a-z.]{2,5}$/;
  NAME_PATTERN = /^[a-z A-Z]*$/;
  firstNameController;
  lastNameController;
  passwordController;

  constructor(private formBuilder: FormBuilder, private userComponent: UserComponent,
              private userService: UserService, private router: Router, private appComponent: AppComponent) {
    this.buildForm();
    this.emailController.value = this.userComponent.getEmail();
  }
  public registerUser() {
    const user = {
      firstName: this.firstNameController.value,
      lastName: this.lastNameController.value,
      email: this.emailController.value,
      isAdmin: false,
      password: this.passwordController.value
    };
    // register user
    this.userService.registerUser(user).subscribe(res => {
      const localUserData = {
        token: res['token'],
        email: user.email
      }
      localStorage.setItem('user', JSON.stringify(localUserData));
      this.appComponent.checkLocalStorage();
      this.router.navigateByUrl('');
    },err => {
      console.log('user error ', err);

    })
  }
  private buildForm() {
    this.registerForm = this.formBuilder.group( {
      email: this.formBuilder.control(null, [Validators.pattern(this.EMAIL_PATTERN), Validators.required]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      firstName: this.formBuilder.control(null, [Validators.required, Validators.minLength(2), Validators.pattern(this.NAME_PATTERN)]),
      lastName: this.formBuilder.control(null, [Validators.required, Validators.minLength(2), Validators.pattern(this.NAME_PATTERN)])
    });
    this.emailController = this.registerForm.get('email');
    this.passwordController = this.registerForm.get('password');
    this.firstNameController = this.registerForm.get('firstName');
    this.lastNameController = this.registerForm.get('lastName');

  }
  public goBack() {
    this.userComponent.processing = false;
    this.router.navigateByUrl('/user');


  }
}
