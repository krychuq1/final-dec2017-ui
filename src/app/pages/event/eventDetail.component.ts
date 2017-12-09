import { Component, OnInit } from '@angular/core';
import { EventService } from "../../services/event.service";
import { EventComponent } from "./event.component";
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {EventModel} from "../../models/event.model";
import {BookingModel} from "../../models/booking.model";


@Component({
    selector: 'event-detail',
    templateUrl: './eventDetails.html',
    styleUrls: ['./eventDetails.scss']
})

export class EventDetailComponent implements OnInit{
    event: EventModel;
    bookings;
    constructor (private eventService: EventService, private userService: UserService,
                 private route: ActivatedRoute) {
    }
    ngOnInit() {
        console.log('nginit active +++!');
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.viewEvent(user.token, this.route.snapshot.params.id );
            this.viewListOfAttendees(user.token, this.route.snapshot.params.id);
        }
    }
    public viewEvent(token, id) {
        this.eventService.getEventById(token, id).subscribe(res => {
            this.event = new EventModel(res['title'], res['address'], res['city'],
            res['online_event'], res['start_date'], res['end_date'], res['image'],
            res['description'], res['category'], res['organizer_name'], res['number_of_places']);
        });
    }
    public viewListOfAttendees(token, id) {
        this.eventService.getListOfAttendees(token, id).subscribe(res => {
            this.bookings = res;
        });
    }
}
