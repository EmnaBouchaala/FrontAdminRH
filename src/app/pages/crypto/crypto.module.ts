import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgApexchartsModule } from 'ng-apexcharts';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { SimplebarAngularModule } from 'simplebar-angular';

import { CryptoRoutingModule } from './crypto-routing.module';
import { LendingComponent } from './lending/lending.component';
import { KycapplicationComponent } from './kycapplication/kycapplication.component';


import { OrdersComponent } from './orders/orders.component';
// dropzone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [LendingComponent, KycapplicationComponent, OrdersComponent],
  imports: [
    CommonModule,
    CryptoRoutingModule,
    BsDropdownModule.forRoot(),
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CdkStepperModule,
    NgStepperModule,
    SimplebarAngularModule,
    DropzoneModule,
    PagetitleComponent
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class CryptoModule { }
