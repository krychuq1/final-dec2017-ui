import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";
import {Router} from '@angular/router';


@Component({
  selector: 'header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
    user: UserModel;
    constructor(private userService: UserService, private router: Router) {

        this.userService.userUpdates.subscribe(
            (user) => {
              this.user = user;
            }
        );
       /* this.userService.getLocalUser().subscribe(res =>{
          console.log(res);
        });*/
    }
    logOut() {
      this.userService.logOut();
      this.router.navigateByUrl('');

    }
    goHome() {
      this.router.navigateByUrl('');

    }
}
