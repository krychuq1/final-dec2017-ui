import { Component, OnInit } from '@angular/core';
import { EventService } from "../../services/event.service";
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {EventModel} from "../../models/event.model";
import {forEach} from "@angular/router/src/utils/collection";
import {attachEmbeddedView} from "@angular/core/src/view";
import {UserModel} from "../../models/user.model";


@Component({
    selector: 'event-detail',
    templateUrl: './eventDetails.html',
    styleUrls: ['./eventDetails.scss']
})

export class EventDetailComponent implements OnInit{
    event: EventModel;
    bookings;
    userIds = [];
    attendees = [];
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
        this.eventService.getListOfBookingsForEvent(token, id).subscribe(res => {
            // returns the data displayed in user_event table specific for this eventId in json object form, no index
            this.bookings = res;
            for (var index in this.bookings) {
                this.userIds.push(this.bookings[index].userId);
            }
            const length = this.userIds.length;
            for (var i = 0; i < length; i++) {
                for (var k = 1; k < length; k++) {
                    if (this.userIds[i] === this.userIds[k]) {
                        this.userIds.splice(i, 1);
                    }
                }
            }
            console.log('The user ids who attend event: ', this.userIds);
            for (var i = 0; i < this.userIds.length; i++){
                this.userService.getUserById(token, this.userIds[i]).subscribe(res => {
                    this.attendees.push(res);
                });
            }
            console.log('Things that are stuck in attendees: ', this.attendees);
        });
    }
}