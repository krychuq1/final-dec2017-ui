import {Route} from "@angular/router";
import {UserComponent} from "./pages/user/user.component";
import {HomeComponent} from "./pages/home/home.component";
import {UserLoginComponent} from "./components/user-login/user-login.component";
import {EventComponent} from "./pages/event/event.component";
import {CreateEventComponent} from "./components/create-event/create-event.component";
import {UserRegisterComponent} from './components/user-register/user-register.component';
import {EventDetailComponent} from "./components/event-detail/eventDetail.component";
import {TicketComponent} from './components/ticket-component/ticket.component';
import {AddTicketComponent} from './components/add-ticket/add-ticket.component';
import {UserAdminComponent} from "./pages/users-admin/user-admin.component";

export const routes: Route[] = [
    { path: '', component: HomeComponent,  pathMatch: 'full'  },
    { path: 'user', component: UserComponent,
        children: [
            {path: 'login', component: UserLoginComponent, pathMatch: 'full'},
            {path: 'register', component: UserRegisterComponent}
        ]
    },
    {path: 'event', component: EventComponent,
        children: [
           {path: 'create', component: CreateEventComponent},
          {path: 'one/:id', component: EventDetailComponent},
          {path: 'tickets/:id', component: TicketComponent, children: [{
            path: 'create/:id', component: AddTicketComponent
            }]}
        ]
    },
  {path: 'user-admin', component: UserAdminComponent}

];
