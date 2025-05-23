import { Component, OnInit } from '@angular/core';

import { Pricing } from './pricing.model';

import { pricingData } from './data';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  standalone:true,
  imports:[PagetitleComponent]
})

/**
 * Utility Pricing component
 */
export class PricingComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  pricingData: Pricing[];

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Utility' }, { label: 'Pricing', active: true }];

    this.pricingData = pricingData;
  }
}
