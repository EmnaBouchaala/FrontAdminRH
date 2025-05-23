import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap/rating';
import { LoaderComponent } from 'src/app/shared/ui/loader/loader.component';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,LoaderComponent,RatingModule,FormsModule ],
})

/**
 * Rating Component
 */
export class RatingComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  readonly:boolean = false;
  currentRate :number= 0;
  stepRate:number = 2;
  readRate:number = 3;
  hoverSelect:number = 2;
  customColor:number = 4;
  clearRate:number = 2;
  stepHeart:number = 2;
  x:number = 5;
  y:number = 2;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Rating', active: true }];
  }

}
