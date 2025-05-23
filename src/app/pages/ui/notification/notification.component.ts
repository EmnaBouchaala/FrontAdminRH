import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,FormsModule],
})

/**
 * Notification Component
 */
export class NotificationComponent implements OnInit {

  modalRef?: BsModalRef;
  message: any;
  title: any;
  newestOnTop: any;
  progressbar: any;
  toastType: any = 'success';
  easeToast:any = 'ease-in'
  // bread crumb items
  breadCrumbItems: Array<{}>;
  closeButton: any;
  position: any = 'toast-top-right';
  timeouttoast: number = 5000;
  extended: number = 1000;

  constructor(public toastService: ToastrService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Notifications', active: true }];
  }

  /**
   * Standard message
   */
  showStandard() {
    var text = this.title ? this.title : 'Welcome';
    var msg = this.message ? this.message : '';
    var newestontop = this.newestOnTop == true ? true : false
    var progress = this.progressbar == true ? true : false
    var closebtn = this.closeButton == true ? true : false
    // var position = this.position == this.position ? this.position : 'toast-top-right'

      if (this.toastType == 'success') {
        this.toastService.success(text, msg, { timeOut: this.timeouttoast, newestOnTop: newestontop, progressBar: progress, closeButton: closebtn,positionClass:this.position,easing:this.easeToast,extendedTimeOut:this.extended });
      }
  
      if (this.toastType == 'info') {
        this.toastService.info(text, msg, { timeOut: this.timeouttoast, newestOnTop: newestontop, progressBar: progress, closeButton: closebtn,positionClass:this.position,easing:this.easeToast ,extendedTimeOut:this.extended});
      }
  
      if (this.toastType == 'warning') {
        this.toastService.warning(text, msg, { timeOut: this.timeouttoast, newestOnTop: newestontop, progressBar: progress, closeButton: closebtn,positionClass:this.position,easing:this.easeToast,extendedTimeOut:this.extended });
      }
  
      if (this.toastType == 'error') {
        this.toastService.error(text, msg, { timeOut: this.timeouttoast, newestOnTop: newestontop, progressBar: progress, closeButton: closebtn,positionClass:this.position,easing:this.easeToast,extendedTimeOut:this.extended });
      }
   
  
  }


  closetoast() {
    this.toastService.clear()
  }

  closelasttoast() {
    this.toastService.remove(this.toastService.currentlyActive)
  }

}
