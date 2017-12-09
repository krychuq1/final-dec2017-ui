import { Component } from '@angular/core';
import { EventService } from "../../services/event.service";
import {AppComponent} from "../../app.component";
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {EventModel} from '../../models/event.model';

@Component({
    selector: 'event',
    templateUrl: './event.html',
    styleUrls: ['./event.scss']
})
export class EventComponent {
    test: string
    user: UserModel;
    events;
    constructor(private eventService: EventService, private appComponent: AppComponent, private userService: UserService) {
        this.test = 'hello';
        this.userService.userUpdates.subscribe(
            (user) => {
                if (user) {
                    this.getEvents(user.token);
                    // get events
                }else {
                    // event to null
                    this.events = null;
                }
                this.user = user;
            }
        );
    }
    private getEvents(token) {
        this.eventService.getEvents(token).subscribe(res => {
            this.events = res;
            console.log('Response is: ', res);
        })
    }
}
