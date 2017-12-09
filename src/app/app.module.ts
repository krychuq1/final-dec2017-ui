import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from './components/header-component/header.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from "@angular/router";
import {routes} from "./app.routers";
import {UserComponent} from "./pages/user/user.component";
import {HomeComponent} from "./pages/home/home.component";
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {UserLoginComponent} from "./components/user-login/user-login.component";
import {EventComponent} from "./pages/event/event.component";
import {CreateEventComponent} from "./components/create-event/create-event.component";
import {UserRegisterComponent} from './components/user-register/user-register.component';
import {EventService} from "./services/event.service";
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {EventDetailComponent} from "./pages/event/eventDetail.component";
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from "@angular/material";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UserComponent,
        HomeComponent,
        UserLoginComponent,
        EventComponent,
        EventDetailComponent,
        CreateEventComponent,
        UserRegisterComponent
    ],
    imports: [
        BrowserModule,
        MatButtonModule,
        MatInputModule,
        MatTabsModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        RouterModule.forRoot(routes)
    ],
    providers: [FormBuilder, UserService, EventService],
    bootstrap: [AppComponent]
})
export class AppModule { }