import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class UserService {

  url = 'https://translation.dev.insightapi.io/api/brand/';

  constructor(private http: HttpClient ) {

  }

  checkIfUserExists(): any {
    return this.http.get(this.url);
  }
}
