import { EventModel } from "../models/event.model";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Injectable} from "@angular/core";
import * as vars from '../config';

@Injectable()
export class EventService {
    urlEvent = vars.apiUrl + 'events/';
    urlBooking = vars.apiUrl + 'bookings/';
    constructor(private http: HttpClient) {}

    getEvents(token) {
        // get all events by making call to api and returning response
        const header = new HttpHeaders().set('x-access-token', token); // create header object
        const url = this.urlEvent + 'event';
        return this.http.get(url, {headers: header});
    }
    getAllEvents_allAccess() {
        const url = this.urlEvent + 'event/all';
        return this.http.get(url);
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
    deleteEvent(token, eventId) {
      const header = new HttpHeaders().set('x-access-token', token); // create header object
      const url = this.urlEvent + 'event/' + eventId;
      return this.http.delete(url, {headers: header});
    }
    saveImage(img) {
      const url = this.urlEvent + 'image';
      return this.http.post(url, {src: img.src});
    }
}
