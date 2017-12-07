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
   /* myBool$: Observable<boolean>;
    private boolSubject: Subject<boolean>;*/
    constructor(private http: HttpClient ) {
       /* this.boolSubject = new Subject<boolean>();
        this.myBool$ = this.boolSubject.asObservable();
       /!* this.myBool$ = Observable.of(false);*!/*/
    }

    checkIfUserExists(email): any {
        const url = this.url + 'checkEmail/' + encodeURIComponent(email);
        return this.http.get(url);
    }
    getToken(user){
        console.log('Im at getToken!');
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
        /*this.myBool$ = Observable.of(true);
        console.log('inside set user! ', this.myBool$);
        this.boolSubject.next(true);*/
        console.log(this.user);
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
