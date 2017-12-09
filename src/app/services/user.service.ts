import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from "../models/user.model";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {
    userUpdates: EventEmitter<UserModel> = new EventEmitter();
    user: UserModel;
    url = 'http://localhost:7777/users/';
    constructor(private http: HttpClient ) {}

    checkIfUserExists(email): any {
        const url = this.url + 'checkEmail/' + encodeURIComponent(email);
        return this.http.get(url);
    }
    getToken(user){
        const url = this.url + 'authenticate/' + encodeURIComponent(user.email) + '/' + encodeURIComponent(user.password);
        return this.http.get(url);
    }
    getUser(obj) {
        // create header with token
        const headers = new HttpHeaders().set('x-access-token', obj.token); // create header object
        // get url api call
        const url = this.url + 'user/' + encodeURIComponent(obj.email);
        // return the res from api call
        return this.http.get(url, {headers: headers});
    }
    registerUser(user) {
      const url = this.url + 'user';
      return this.http.post(url, user);
    }
    setUser(obj) {
        this.user = new UserModel(obj.firstName, obj.lastName, obj.email, obj.isAdmin, obj.token);
        this.userUpdates.emit(this.user);
    }
    getLocalUser(): UserModel {
        return this.user;
    }
    logOut() {
        localStorage.removeItem('user')
        this.user = null;
        this.userUpdates.emit(this.user);
    }
}
