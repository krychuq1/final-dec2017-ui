import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as vars from '../config';


@Injectable()
export class WebsiteWatcherService {
  usersUrl = vars.websiteWatcherUrl + 'users/';
  eventsUrl = vars.websiteWatcherUrl + 'events/';
  constructor(private http: HttpClient ) {}
  getIp(){
    return this.http.get('https://ipinfo.io');
  }
  addUser(user){
    return this.http.post(this.usersUrl, user)
  }
  logEvent(event){
    return this.http.post(this.eventsUrl, event)
  }
}
