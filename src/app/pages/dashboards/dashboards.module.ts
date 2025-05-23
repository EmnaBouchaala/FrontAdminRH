import { NgModule } from '@angular/core';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { BsDropdownConfig} from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [],
  imports: [
    DashboardsRoutingModule,
  ],
  providers: [BsDropdownConfig],
})
export class DashboardsModule { }
