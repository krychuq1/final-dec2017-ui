import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'user-admin',
  templateUrl: './user-admin.html',
  styleUrls: ['./user-admin.scss']
})
export class UserAdminComponent {
  // Doughnut userGoal
  public doughnutChartLabels: string[] = ['Goal', 'Users'];
  public doughnutChartData: number[];
  public doughnutChartType: string = 'doughnut';
  // Doughnut gender
  public genderLabels: string[] = ['male', 'female'];
  public genderData: number[];
  user;
  userGoal: number;
  numberOfUsers;
  numberOfMaleUsers: number;
  numberOfFemaleUsers: number;
  constructor(private userService: UserService) {
    this.user = this.userService.getLocalUser();
    userService.getAllUsers(this.user.token).subscribe(res => {
      this.userGoal = 500;
      this.numberOfUsers = res.length;
      this.doughnutChartData = [this.userGoal, this.numberOfUsers];
      // get number of male users
      const maleUsers = res.filter(function( obj ) {
        return obj.gender === 'male';
      });
      this.numberOfMaleUsers = maleUsers.length;
      this.numberOfFemaleUsers = this.numberOfUsers - this.numberOfMaleUsers;
      this.genderData = [this.numberOfMaleUsers, this.numberOfFemaleUsers];
      console.log(this.genderData, " gender", this.numberOfMaleUsers, this.numberOfFemaleUsers)
    })
  }


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {

  }


}
