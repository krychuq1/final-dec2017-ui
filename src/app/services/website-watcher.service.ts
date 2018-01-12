import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as vars from '../config';


@Injectable()
export class WebsiteWatcherService {
  usersUrl = vars.websiteWatcherUrl + 'users/';
  actionsUrl = vars.websiteWatcherUrl + 'actions/';
  constructor(private http: HttpClient ) {}
  getIp(){
    return this.http.get('https://ipinfo.io');
  }
  addUser(user){
    return this.http.post(this.usersUrl, user)
  }
  logAdminPortalAction(event){
    return this.http.post(this.actionsUrl, event)
  }
}
