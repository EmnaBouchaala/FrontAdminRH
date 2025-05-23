import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { NgxMasonryComponent, NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  imports: [PagetitleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

/**
 * UI-cards component
 */
export class CardsComponent implements OnInit {
  breadCrumbItems: Array<{}>;


  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Carousel', active: true }];
  }

}
