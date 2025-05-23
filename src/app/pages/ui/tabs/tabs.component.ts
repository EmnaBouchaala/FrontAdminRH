import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,TabsModule,AccordionModule,CommonModule,CollapseModule],
})

/**
 * UI-tabs component
 */
export class TabsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Collapse declare
  isCollapsed: boolean;
  public firstColleaps:boolean = false;
  public secondColleaps:boolean = false;
  public bothColleaps:boolean = false;
  isFirstOpen:boolean = true;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Tabs & Accordions', active: true }];

    // Collapse value
    this.isCollapsed = false;
  }
}
