import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,CommonModule]
})
export class BasicComponent implements OnInit {

  breadCrumbItems: Array<{}>;
// set the currenr year
year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Email Template' }, { label: 'Basic Action', active: true }];

  }
}
