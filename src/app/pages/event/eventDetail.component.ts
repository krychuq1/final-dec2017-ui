import { Component, OnInit } from '@angular/core';
import { EventService } from "../../services/event.service";
import { EventComponent } from "./event.component";
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'event-detail',
    templateUrl: './eventDetails.html',
    styleUrls: ['./event.scss']
})

export class EventDetailComponent {
/*    userToken;
    user: UserModel;
    constructor (private eventService: EventService, private userService: UserService,
                 private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.userService.userUpdates.subscribe(
            (user) => {
                if (user) {
                    this.userToken = user.token;
                }
                this.user = user;
            }
        );
        console.log(this.route.snapshot.params.id);
        this.viewEvent(this.route.snapshot.params.id, this.userToken)
    }
    public viewEvent(token, id) {
        this.eventService.getEventById(token, id).subscribe(res => {
            const response = res;
            console.log('Response is: ', response);
        });
    }*/
}