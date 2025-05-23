import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-dripicons',
  templateUrl: './dripicons.component.html',
  styleUrls: ['./dripicons.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,CommonModule]
})

/**
 * Dripicons component
 */
export class DripiconsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Icons' }, { label: 'Dripicons', active: true }];
  }
}
