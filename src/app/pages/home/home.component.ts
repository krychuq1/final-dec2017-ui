import {Component, OnInit} from '@angular/core';
import { EventComponent} from "../event/event.component";
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {EventService} from "../../services/event.service";
import {EventModel} from "../../models/event.model";
import * as vars from "../../config"
import {RouterLink} from "@angular/router";
import * as moment from 'moment';
import {WebsiteWatcherService} from "../../services/website-watcher.service";
@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  user: UserModel;
  event;
  apiUrl;
  constructor(private userService: UserService, private eventService: EventService, private websiteWatcherService: WebsiteWatcherService) {
    this.apiUrl = vars.apiUrl;
    this.checkLocalStorage();
    this.displayAllActiveEvents();
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

  public displayAllActiveEvents(){
    this.eventService.getAllEvents_allAccess().subscribe(event => {
      this.event = event;
    });
  }
  public adminAction_createEvent(){
    console.log('Im working');
    let action = {
      /*user id, start time and name of action*/
      userId: localStorage.getItem('userId_mongo'),
      action_name: document.getElementById('create-event-btn').textContent,
      startTime: moment().format("YYYY-MM-DD HH:mm:ss")
    };
    console.log('Action is: ', action);
    this.websiteWatcherService.logAdminPortalAction(action).subscribe(e => {
      console.log("we are here ", e)
    });
  }

}
