import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,SlickCarouselModule]
})

/**
 * Utility timeline component
 */
export class TimelineComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Utility' }, { label: 'Timeline', active: true }];
  }

  // Timeline config
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: true
  };

}
