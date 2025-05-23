import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss'],
  standalone:true,
  imports:[CommonModule,PagetitleComponent,TabsModule,RouterModule,TooltipModule]
})
export class BloglistComponent implements OnInit {

   // bread crumb items
   breadCrumbItems: Array<{}>;
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Blog' }, { label: 'Blog List', active: true }];

  }

}
