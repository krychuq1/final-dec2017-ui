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
    userIds_purchase = [];
    userIds_booked = [];
    attendeesPurchased = [];
    attendeesBooked = [];
    eventId;
    user;
    constructor (private eventService: EventService, private userService: UserService,
                 private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user) {
            this.eventId = this.route.snapshot.params.id;
            this.viewEvent(this.user.token, this.eventId );
            this.viewListOfAttendees(this.user.token, this.route.snapshot.params.id);
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
            this.bookings = res;
            for (var b = 0; b < this.bookings.length; b++) {
                if (this.bookings[b].transactionStatus === 'purchased') {
                    this.userIds_purchase.push(this.bookings[b].userId);
                }
                if (this.bookings[b].transactionStatus === 'booked') {
                    this.userIds_booked.push(this.bookings[b].userId);
                }
            }
            this.attendeesThatPurchasedTicket(this.spliceArray(this.userIds_purchase), token);
            this.attendeesThatBookedTicket(this.spliceArray(this.userIds_booked), token)
        });
    }
    public spliceArray(userIds_purchase){
        for (var i = 0; i < userIds_purchase.length; i++) {
            for (var k = 1; k < userIds_purchase.length; k++) {
                if (userIds_purchase[i] === userIds_purchase[k]) {
                    userIds_purchase.splice(k, 1);
                }
            }
        }
        return userIds_purchase;
    }
    public attendeesThatPurchasedTicket (arrayUsersPurchased, token) {
        for (var i = 0; i < arrayUsersPurchased.length; i++) {
            this.userService.getUserById(token, arrayUsersPurchased[i]).subscribe(res => {
                this.attendeesPurchased.push(res);
            });
        }
    }
    public attendeesThatBookedTicket (arrayUsersBooked, token) {
        for (var i = 0; i < arrayUsersBooked.length; i++){
            this.userService.getUserById(token, arrayUsersBooked[i]).subscribe(res => {
                this.attendeesBooked.push(res);
            });
        }
    }
}
