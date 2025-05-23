import { Component, OnInit } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,BsDropdownModule],
})

/**
 * UI-dropdown component
 */
export class DropdownsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  isDropup = true;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Dropdowns', active: true }];
  }
}
