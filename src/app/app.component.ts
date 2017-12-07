import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {EventService} from "./services/event.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private router: Router, private userService: UserService, private routeActive:ActivatedRoute,
                private eventService: EventService ) {
        routeActive.params.subscribe(val => {
            console.log('Im here');
            this.checkLocalStorage();
        });
    }
    public checkLocalStorage() {
        const obj = JSON.parse(localStorage.getItem('user'));
         if (obj) {
           this.userService.getUser(obj).subscribe(res => {
                res['token'] = obj.token;
                this.userService.setUser(res);
                console.log(this.userService.getLocalUser());
           }, (err: HttpErrorResponse) => {
               if (err.error instanceof Error) {
                   console.log('An error occurred:', err.error.message);
               } else {
                   console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
               }
           });
         }
    }
    public parseLocalStorageToken() {
        console.log('AT app.components parseLocalStorage');
        const obj = JSON.parse(localStorage.getItem('user'));
        return obj;
    }
}
