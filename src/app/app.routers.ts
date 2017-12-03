import {Route} from "@angular/router";
import {AppComponent} from "./app.component";
import {UserComponent} from "./pages/user/user.component";
import {HomeComponent} from "./pages/home/home.component";

export const routes: Route[] = [
  { path: '', component: HomeComponent,  pathMatch: 'full'  },
  { path: 'user', component: UserComponent, pathMatch: 'full',
    }
];

//children: [{path: 'user/login', component: }]
