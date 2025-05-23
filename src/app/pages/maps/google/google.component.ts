import { Component, OnInit, Input, Inject, PLATFORM_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  }
};
@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,GoogleMapsModule,LeafletModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

/**
 * Google component
 */
export class GoogleComponent implements OnInit {
  longitude = -77.028333;
  latitude = -12.043333;
  zoom: number = 9;

  @Input() pitch: number = 10;
  @Input() scrollwheel: boolean = false;
  center: any;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  constructor(@Inject(PLATFORM_ID) private platformId: any,
    // private mapsAPILoader: MapsAPILoader
  ) { }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Maps' }, { label: 'Google Maps', active: true }];
  }
  mapOptions: google.maps.MapOptions = {
    center: { lat: 48.8588548, lng: 2.347035 },
    zoom: 13,
  };

  markers: MarkerProperties[] = [
    { position: { lat: 48.8584, lng: 2.2945 } }, // Eiffel Tower
    { position: { lat: 48.8606, lng: 2.3376 } }, // Louvre Museum
    { position: { lat: 48.8530, lng: 2.3499 } }, // Cathédrale Notre-Dame de Paris
  ];
}
