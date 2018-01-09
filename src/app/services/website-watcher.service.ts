import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as vars from '../config';


@Injectable()
export class WebsiteWatcherService {
  url = vars.websiteWatcherUrl + 'users/';
  constructor(private http: HttpClient ) {}
  getIp(){
    return this.http.get('https://ipinfo.io');
  }
  addUser(user){
    return this.http.post(this.url, user)
  }
}
