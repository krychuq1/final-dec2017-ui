import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from "../models/user.model";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/observable/of';

@Injectable()
export class UserBookingService {
  url = 'http://localhost:7777/bookings/';
  constructor(private http: HttpClient ) {}

  getAll() {
    const url = this.url + 'events';
    return this.http.get(url);
  }
}
