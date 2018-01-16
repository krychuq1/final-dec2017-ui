import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as vars from '../config';
import * as moment from 'moment';


@Injectable()
export class WebsiteWatcherService {
  usersUrl = vars.websiteWatcherUrl + 'users/';
  actionsUrl = vars.websiteWatcherUrl + 'actions/';
  eventsUrl = vars.websiteWatcherUrl + 'events/';
  constructor(private http: HttpClient ) {}

  private getIp(){
    return this.http.get('https://ipinfo.io');
  }
  getDistance(location){
    let url = this.eventsUrl + 'distance/' + location.lat + '/' + location.lng;
    return this.http.get(url);
  }
  addEventToMongo(event){
    console.log('trying to add event to mongo', this.eventsUrl, event);
    this.http.post(this.eventsUrl, event).subscribe(res => {
      console.log(res);
    });
  }
  addUser(userMySqlIp){
     this.getIp().subscribe(res => {
      let user = {
        ip: res['ip'],
        city: res['city'],
        userMySqlIp: userMySqlIp,
        location: res['loc'],
        organization: res['org'],
        region: res['region'],
        startTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        endTime: ''
      };
      console.log(user);
      this.http.post(this.usersUrl, user).subscribe(addedUser => {
        //console.log('added', addedUser);
        localStorage.setItem('userId_mongo',addedUser['_id']);
      })
    })
  }
  logAdminPortalAction(action){
    console.log('Action id is: ', action);
    return this.http.post(this.actionsUrl, action);
  }
}
