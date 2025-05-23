import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType } from './jobs.model';
import { jobViewChart, ApplicationChart, ApprovedChart, RejectedChart, emailSentBarChart, vacancyData, receivedTimeChart, recentJobsData } from './data';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,CommonModule,NgApexchartsModule,SimplebarAngularModule,BsDropdownModule,CarouselModule]
})

/**
 * Jobs Component
 */
export class JobsComponent implements OnInit {
  isDropup: boolean = true;
  constructor() { }

  jobViewChart: ChartType;
  ApplicationChart: ChartType;
  ApprovedChart: ChartType;
  RejectedChart: ChartType;
  emailSentBarChart: ChartType;
  showNavigationArrows: any;
  showNavigationIndicators: any;
  vacancyData: any;
  receivedTimeChart: ChartType;
  recentJobsData: any;
  isActive: string;

  @ViewChild("chart", { static: false }) chart: ChartComponent;

  ngOnInit(): void {
    this._fetchData();
  }

  private _fetchData() {
    this.jobViewChart = jobViewChart;
    this.ApplicationChart = ApplicationChart;
    this.ApprovedChart = ApprovedChart;
    this.RejectedChart = RejectedChart;
    this.emailSentBarChart = emailSentBarChart;
    this.vacancyData = vacancyData;
    this.receivedTimeChart = receivedTimeChart;
    this.recentJobsData = recentJobsData;
  }
  // on click chart render
  weeklyreport() {
    this.isActive = 'week';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }];
  }

  monthlyreport() {
    this.isActive = 'month';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series C',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }];
  }

  yearlyreport() {
    this.isActive = 'year';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }];
  }

  // updateOptions(option: any) {
  //   this.activeOptionButton = option;
  //   this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  // }
}
