import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as vars from '../config';
import * as moment from 'moment';


@Injectable()
export class WebsiteWatcherService {
  usersUrl = vars.websiteWatcherUrl + 'users/';
  actionsUrl = vars.websiteWatcherUrl + 'actions/';
  constructor(private http: HttpClient ) {}
  private getIp(){
    return this.http.get('https://ipinfo.io');
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
      console.log(user)
       this.http.post(this.usersUrl, user).subscribe(addedUser => {
        console.log('added', addedUser)
      })

    });
  }
  logAdminPortalAction(event){
    return this.http.post(this.actionsUrl, event)
  }
}
