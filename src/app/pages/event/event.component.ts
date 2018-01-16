import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import {AppComponent} from '../../app.component';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {EventModel} from '../../models/event.model';
import {Router} from '@angular/router';
import {UserBookingService} from "../../services/user-booking.service";
import {WebsiteWatcherService} from "../../services/website-watcher.service";
import * as moment from 'moment';

@Component({
    selector: 'event',
    templateUrl: './event.html',
    styleUrls: ['./event.scss']
})
export class EventComponent {
    test: string;
    user: UserModel;
    events;
    showEvents;
    availableSets;
    userBookings;
    eventDistance;
    constructor(private eventService: EventService, private websiteWatcherService: WebsiteWatcherService, private appComponent: AppComponent, private userService: UserService,
                private router: Router, private userBookingService: UserBookingService) {
      this.test = 'hello';
      this.showEvents = true;
      this.user = this.userService.getLocalUser();
      this.getEvents(this.user.token);
      navigator.geolocation.getCurrentPosition(position =>{
        let location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.websiteWatcherService.getDistance(location).subscribe(distance => {
          this.eventDistance = distance;
        })
      });
      console.log("show cuurent location ", navigator.geolocation);
      this.router.events.subscribe(event => {
        const url = event['url'];
        if (url && url.indexOf('create') > -1 || url && url.indexOf('one') > -1
        || url && url.indexOf('tickets') > -1) {
          console.log(event['url']);
          this.showEvents = false;

        }
      });


    }
    public getDistance(id){
      for(let i in this.eventDistance){
        if(this.eventDistance[i].eventId === id){
          return this.eventDistance[i]['distance']
        }
      }


    }
    public deleteEvent(id) {
      console.log('we are gonna delete ', id);
      //add record in mongodb
      this.recordEventDeletion(id);
      //delete record from mysql db
      this.eventService.deleteEvent(this.user.token, id).subscribe(res => {
        this.getEvents(this.user.token);
      });
    }
    private getEvents(token) {
        this.eventService.getEvents(token).subscribe(res => {
          this.userBookingService.getAll().subscribe(bookings => {
            this.userBookings = bookings;
            this.events = res;
            console.log(res);
            this.events.forEach(obj => {
              if(this.userBookings[obj.id]) {
                console.log('match', this.userBookings[obj.id].lenght);
                obj['percentage'] = 100 - ((this.userBookings[obj.id].length / obj.number_of_places ) * 100);
                obj.number_of_places = obj.number_of_places - this.userBookings[obj.id].length;
                console.log(obj['percentage'], 'this is percentage')
              }
            });
          })
        })
    }
    private recordEventDeletion(id) {
      //save a record of delete event action in mongodb
      let action = {
        /*user id, start time and name of action*/
        userId: localStorage.getItem('userId_mongo'),
        mysql_eventId:id,
        action_name: document.getElementById('delete-event-icon').textContent,
        startTime: moment().format("YYYY-MM-DD HH:mm:ss")
      };
      console.log('Action for userId is: ', action.userId);
      this.websiteWatcherService.logAdminPortalAction(action).subscribe(e => {
        console.log("we are here ", e)
      });
    }

}
