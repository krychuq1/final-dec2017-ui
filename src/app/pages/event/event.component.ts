import { Component } from '@angular/core';
import { EventService } from "../../services/event.service";
import {AppComponent} from "../../app.component";
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {EventModel} from '../../models/event.model';
import {Router} from '@angular/router';

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
    constructor(private eventService: EventService, private appComponent: AppComponent, private userService: UserService,
                private router: Router) {
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
            this.events = res;
            console.log('Response is: ', res);
        })
    }
}
