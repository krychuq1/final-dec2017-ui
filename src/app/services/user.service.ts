import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class UserService {

  url = 'http://localhost:7777/users/';

  constructor(private http: HttpClient ) {

  }

  checkIfUserExists(email): any {
    const url = this.url + 'checkEmail/' + encodeURIComponent(email);
    return this.http.get(url);
  }
}
