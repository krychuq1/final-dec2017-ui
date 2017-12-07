import { Component } from '@angular/core';
import { EventService } from "../../services/event.service";
import {AppComponent} from "../../app.component";

@Component({
    selector: 'event',
    template: 'this is events component {{events[0].text}}'
    /* templateUrl: './event.html',
     styleUrls: ['./event.scss']*/
})
export class EventComponent {
    constructor(private eventService: EventService, private appComponent: AppComponent) {}
    events =  this.eventService.getEvents(this.appComponent.parseLocalStorageToken());
}
