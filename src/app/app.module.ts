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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [FormBuilder, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
