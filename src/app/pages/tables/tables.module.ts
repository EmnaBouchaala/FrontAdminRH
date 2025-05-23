import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { TablesRoutingModule } from './tables-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TablesRoutingModule,
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
  ]
})
export class TablesModule { }
