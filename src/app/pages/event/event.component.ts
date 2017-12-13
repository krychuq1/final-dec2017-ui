import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import {AppComponent} from '../../app.component';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {EventModel} from '../../models/event.model';
import {Router} from '@angular/router';
import {UserBookingService} from "../../services/user-booking.service";

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
    constructor(private eventService: EventService, private appComponent: AppComponent, private userService: UserService,
                private router: Router, private userBookingService: UserBookingService) {
      this.test = 'hello';
      this.showEvents = true;
      this.user = this.userService.getLocalUser();
      this.getEvents(this.user.token);
      this.router.events.subscribe(event => {
        const url = event['url'];
        if (url && url.indexOf('create') > -1 || url && url.indexOf('one') > -1
        || url && url.indexOf('tickets') > -1) {
          console.log(event['url']);
          this.showEvents = false;

        }
      });

    }
    public deleteEvent(id) {
      console.log('we are gonna delete ', id);
      this.eventService.deleteEvent(this.user.token, id).subscribe(res => {
        this.getEvents(this.user.token);
      });
    }
    private getEvents(token) {
        this.eventService.getEvents(token).subscribe(res => {
          this.userBookingService.getAll().subscribe(bookings => {
            this.userBookings = bookings;
            this.events = res;
            console.log(res[0]);
            this.events.forEach(obj => {
              if(this.userBookings[obj.id]) {
                console.log('match', this.userBookings[obj.id].lenght);
                obj['percentage'] = 100 - ((this.userBookings[obj.id].length / obj.number_of_places ) * 100);
                obj.number_of_places = obj.number_of_places - this.userBookings[obj.id].length;
                console.log(obj['percentage'], 'this is percentage')
              }
              // console.log(obj.number_of_places, obj.id);
            });
          })
        })
    }
}
