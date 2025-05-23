import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { InvoicesRoutingModule } from './invoices-routing.module';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    TooltipModule.forRoot(),
    PagetitleComponent
  ]
})
export class InvoicesModule { }
