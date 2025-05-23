import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

import { ChartType, Notification } from './exchange.model';

import { priceCandlestickChart, notificationData } from './data';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,TabsModule,NgApexchartsModule,SimplebarAngularModule]
})
export class ExchangeComponent implements OnInit {
  // breadcrumb items
  breadCrumbItems: Array<{}>;

  priceCandlestickChart: ChartType;

  notificationData: Notification[];

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Crypto' }, { label: 'Exchange', active: true }];

    this.priceCandlestickChart = priceCandlestickChart;
    this.notificationData = notificationData;
  }

}
