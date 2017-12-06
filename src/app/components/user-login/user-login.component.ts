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

    constructor(private formBuilder: FormBuilder, private userController: UserComponent,
                private userService: UserService, private router: Router, private appComponent: AppComponent) {
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
        const user = {
            email: this.userController.getEmail(),
            password: this.passwordController.value
        };
        console.log('user data is : ', user);
        this.userService.getToken(user).subscribe(res => {
            console.log('token: ', res);
            const localUserData = {
                token: res.token,
                email: user.email
            }
            // save token in localstorage
            localStorage.setItem('user', JSON.stringify(localUserData));
            this.userValidation = false;
            this.appComponent.checkLocalStorage();
            this.router.navigateByUrl('?1');
        }, (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                this.userValidation = true;
                console.log('An error occurred:', err.error.message);
            } else {
                this.userValidation = true;
                console.log('should go to register');
                console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
        });
        // check if token + email = the user ---> api call gets that user of use ---> need firstname and lastname from it for login:

    }
}

