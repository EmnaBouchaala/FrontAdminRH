import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// routing
import { ProjectsRoutingModule } from './projects-routing.module';

// simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// dropzone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// FlatPicker
import { FlatpickrModule } from 'angularx-flatpickr';

// bootstrap component
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// apexchart
import { NgApexchartsModule } from 'ng-apexcharts';

// component
import { ProjectgridComponent } from './projectgrid/projectgrid.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [ProjectgridComponent, ProjectlistComponent, OverviewComponent, CreateComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    NgApexchartsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    SimplebarAngularModule,
    FlatpickrModule.forRoot(),
    PagetitleComponent,
    DropzoneModule],
  providers: [{
    provide: DROPZONE_CONFIG,
    useValue: DEFAULT_DROPZONE_CONFIG
  }]
})

export class ProjectsModule { }
