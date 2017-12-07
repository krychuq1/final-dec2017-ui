import { EventModel } from "../models/event.model";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Injectable} from "@angular/core";

@Injectable()
export class EventService {
    url = 'http://localhost:7777/events/';

    constructor(private http: HttpClient) {}

    getEvents(obj) {
        console.log('AT GET EVENTS! IN EVENT.SERVICE:');
        const header = new HttpHeaders().set('x-access-token', obj.token); // create header object
        console.log('Im the token: ', obj.token);
        const url = this.url + 'event';
        return this.http.get(url, {headers: header});
    }
}