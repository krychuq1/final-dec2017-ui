import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {EventService} from "./services/event.service";
import {WebsiteWatcherService} from './services/website-watcher.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private userService: UserService, private routeActive:ActivatedRoute,
              public websiteWatcherService: WebsiteWatcherService ) {
    routeActive.params.subscribe(val => {
      this.checkLocalStorage();
    });
  }
  public checkLocalStorage() {
    const obj = JSON.parse(localStorage.getItem('user'));

    if (obj) {
      this.userService.getUser(obj).subscribe(res => {
        res['token'] = obj.token;
        this.userService.setUser(res);
        this.websiteWatcherService.addUser(res['id']);
        /*console.log('test: 212121221212 ', this.websiteWatcherService.addUser(res['id']));*/
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
