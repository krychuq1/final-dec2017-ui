import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'user',
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserComponent {
  emailForm: FormGroup;
  emailControler;
  EMAIL_PATTERN = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.buildForm();
  }

  private buildForm() {
    this.emailForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.pattern(this.EMAIL_PATTERN), Validators.required])
    });
    this.emailControler = this.emailForm.get('email');
  }

  public onSubmitForm() {
    // make a call to api to check if email exits
    this.userService.checkIfUserExists(this.emailControler.value).subscribe(res => {
      this.router.navigateByUrl('/user/login');

    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        console.log('should go to register');

        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        // console.log('should go to login');

        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    });

  }
  public getEmail(): string {
      return this.emailControler.value;
  }
}
