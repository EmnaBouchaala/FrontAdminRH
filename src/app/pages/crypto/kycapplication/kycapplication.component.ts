import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-kycapplication',
  templateUrl: './kycapplication.component.html',
  styleUrls: ['./kycapplication.component.scss']
})
export class KycapplicationComponent implements OnInit {
  // breadcrumb items
  breadCrumbItems: Array<{}>;
  modalRef?: BsModalRef;
  files: File[] = [];

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Crypto' }, { label: 'KYC Application', active: true }];
  }
  /**
   * Open modal
   * @param content modal content
   */
  verificationModal(content: any) {
    this.modalRef = this.modalService.show(content, { class: 'modal-lg' });
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
    }, 100);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }
}