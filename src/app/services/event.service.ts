import { EventModel } from "../models/event.model";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Injectable} from "@angular/core";

@Injectable()
export class EventService {
    urlEvent = 'http://localhost:7777/events/';
    urlBooking = 'http://localhost:7777/bookings/';

    constructor(private http: HttpClient) {}

    getEvents(token) {
        // get all events by making call to api and returning response
        const header = new HttpHeaders().set('x-access-token', token); // create header object
        const url = this.urlEvent + 'event';
        return this.http.get(url, {headers: header});
    }
    getEventById(token, id) {
        // create header with token
        const header = new HttpHeaders().set('x-access-token', token); // create header object
        // get url api call
        const url = this.urlEvent + 'event/' + encodeURIComponent(id);
        // return the res from api call
        return this.http.get(url, {headers: header});
    }
    getListOfBookingsForEvent(token, id){
         // create header with token
         const header = new HttpHeaders().set('x-access-token', token); // create header object
         // get url api call
         const url = this.urlBooking + 'users/' + encodeURIComponent(id);
         // return the res from api call
         return this.http.get(url, {headers: header});
    }
    createEvent(token, event) {
      const url = this.urlEvent + 'event';
      const header = new HttpHeaders().set('x-access-token', token); // create header object
      return this.http.post(url, event, {headers: header});

    }
    saveImage(img) {
      const url = this.urlEvent + 'image';
      return this.http.post(url, {src: img.src});
    }
}
