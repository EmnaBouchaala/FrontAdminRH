import { Component, OnInit } from '@angular/core';

import { revenueBarChart, statData } from './data';

import { ChartType } from './profile.model';
import { CommonModule } from '@angular/common';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserService } from 'src/app/core/models/services/user.service';
import { User } from 'src/app/core/models/interfaces/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:true,
  imports:[CommonModule,PagetitleComponent,NgApexchartsModule,FormsModule]
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  currentUser: User;
 // get today's date (day)
  today: Date = new Date();
  me:any;
users: User[] = [];
  revenueBarChart: ChartType;
  statData:any;
  constructor(private userProfile:UserService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    //get this user localStorage.setItem('currentUser', JSON.stringify(user));
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.me = user;
this.getUsers();
    this.currentUser = user;
    // set the chart data

    // fetches the data
    this._fetchData();
  }
  // get users
  getUsers() {
    this.userProfile.getAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }


// update the user profile
  updateUserProfile() {
    this.userProfile.update(this.currentUser.id, this.currentUser).subscribe({
      next: () => {
        console.log('User updated successfully');

      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
  }


  /**
   * Fetches the data
   */
  private _fetchData() {
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
  }
}
