import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss'],
  standalone:true,
  imports:[CommonModule,PagetitleComponent,DropzoneModule]
})

/**
 * Form uploads component
 */
export class UploadsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  files: File[] = [];

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form File Upload', active: true }];
  }

  // file upload
  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false
  };

  uploadedFiles: any[] = [];

  // File Upload
  imageURL: any;
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

}