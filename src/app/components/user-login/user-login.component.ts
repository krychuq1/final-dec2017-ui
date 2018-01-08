import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserComponent} from "../../pages/user/user.component";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";

@Component({
    selector: 'user-login',
    templateUrl: './user-login.html',
    styleUrls: ['./user-login.scss']
})
export class UserLoginComponent {
    loginForm: FormGroup;
    passwordController;
    userValidation: boolean;
    processing;
    constructor(private formBuilder: FormBuilder, private userController: UserComponent,
                private userService: UserService, private router: Router, private appComponent: AppComponent) {
      this.processing = {
        completed: false,
        processing: true
      };
      if (this.router.url.indexOf('/login') > -1) {
        this.processing.completed = false;
        this.processing.processing = false;
      }else {
        this.processing.processing = true;
        this.processing.completed = true;
      }
        this.buildForm();
        this.userValidation = false;

    }

    private buildForm() {
        this.loginForm = this.formBuilder.group({
            password: this.formBuilder.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)])
        });
        this.passwordController = this.loginForm.get('password');
    }

    public login(): void {
        this.processing.processing = true;
        const user = {
            email: this.userController.getEmail(),
            password: this.passwordController.value
        };
        this.userService.getToken(user).subscribe(res => {
            const localUserData = {
                token: res['token'],
                email: user.email
            };
            // save token in localstorage
            localStorage.setItem('user', JSON.stringify(localUserData));
            this.userValidation = false;
            this.appComponent.checkLocalStorage();
            this.router.navigateByUrl('');
            this.processing.processing = false;
            this.processing.completed = true;

        }, (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                this.userValidation = true;
                console.log('An error occurred:', err.error.message);
              this.processing.processing = false;
              this.processing.completed = false;
            } else {
                this.userValidation = true;
              this.processing.processing = false;
              this.processing.completed = false;
                console.log('should go to register');
                console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
        });
        // check if token + email = the user ---> api call gets that user of use ---> need firstname and lastname from it for login:

    }
}

