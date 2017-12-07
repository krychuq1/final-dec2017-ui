import { EventModel } from "../models/event.model";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Injectable} from "@angular/core";

@Injectable()
export class EventService {
    url = 'http://localhost:7777/events/';

    constructor(private http: HttpClient) {}

    getEvents(token) {
        console.log('AT GET EVENTS! IN EVENT.SERVICE:');
        const header = new HttpHeaders().set('x-access-token', token); // create header object
        const url = this.url + 'event';
        return this.http.get(url, {headers: header});
    }
    saveImage(img) {
      const url = this.url + 'image';

      console.log("gonna send ", {src: img.src});
      return this.http.post(url, {src: img.src});
    }
}
