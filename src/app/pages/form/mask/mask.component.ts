import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DROPZONE_CONFIG, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { provideNgxMask } from 'ngx-mask';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@Component({
  selector: 'app-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.scss'],
  standalone:true,
  imports:[CommonModule,PagetitleComponent],
  providers: [provideNgxMask(),
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }]
})

/**
 * Form mask component
 */
export class MaskComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Mask', active: true }];
  }
}
