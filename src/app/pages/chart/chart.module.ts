import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgApexchartsModule } from "ng-apexcharts";
import { BaseChartDirective } from "ng2-charts";
import { ChartistModule } from "ng-chartist";
import { NgxEchartsModule } from "ngx-echarts";

import { ChartRoutingModule } from "./chart-routing.module";

import { ApexComponent } from "./apex/apex.component";
import { ChartjsComponent } from "./chartjs/chartjs.component";
import { ChartistComponent } from "./chartist/chartist.component";
import { EchartComponent } from "./echart/echart.component";

@NgModule({
  declarations: [
    ApexComponent,
    ChartjsComponent,
    ChartistComponent,
    EchartComponent,
  ],
  imports: [
    CommonModule,
    ChartRoutingModule,
    NgApexchartsModule,
    BaseChartDirective,
    ChartistModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChartModule {}
