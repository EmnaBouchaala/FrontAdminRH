import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  standalone:true,
  imports:[PagetitleComponent]
})

/**
 * Toasts Component
 */
export class ToastsComponent implements OnInit {
  
  // bread crumb items
  breadCrumbItems: Array<{}>;
  show:boolean = true;
  translucent:boolean = true;
  stacking:boolean = true;
  stackingSec:boolean = true;
  polite:boolean= true;

  show1:boolean = false;
  autohide:boolean = true;

  constructor(public toastr:ToastrService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Toasts', active: true }];

    // this.showSuccess()
  }


   showSuccess() {
    this.toastr.success('Hello, world! This is a toast message.', 'Bootstrap');
  }


}
