import {Component, OnInit} from '@angular/core';
import { EventComponent} from "../event/event.component";
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  user: UserModel;
  constructor(private userService: UserService) {
    this.checkLocalStorage();
    this.userService.userUpdates.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  public checkLocalStorage() {
    const obj = JSON.parse(localStorage.getItem('user'));
    if (obj) {
      this.userService.getUser(obj).subscribe(res => {
        res['token'] = obj.token;
        this.userService.setUser(res);
        this.user = this.userService.getLocalUser();
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
    }
  }

}
