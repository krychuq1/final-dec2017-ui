import {Route} from "@angular/router";
import {UserComponent} from "./pages/user/user.component";
import {HomeComponent} from "./pages/home/home.component";
import {UserLoginComponent} from "./components/user-login/user-login.component";

export const routes: Route[] = [
  { path: '', component: HomeComponent,  pathMatch: 'full'  },
  { path: 'user', component: UserComponent,
    children: [
      {path: 'login', component: UserLoginComponent}
      ]
  }
];

