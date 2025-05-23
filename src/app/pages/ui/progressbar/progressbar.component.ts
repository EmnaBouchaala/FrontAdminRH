import { Component, OnInit } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,ProgressbarModule],
})

/**
 * UI-progressbar component
 */
export class ProgressbarComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Progress Bars', active: true }];
  }
}
