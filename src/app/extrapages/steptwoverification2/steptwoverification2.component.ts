import { Component, OnInit } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-steptwoverification2',
  templateUrl: './steptwoverification2.component.html',
  styleUrls: ['./steptwoverification2.component.scss'],
  standalone:true,
  imports:[NgOtpInputModule,SlickCarouselModule],
})
export class Steptwoverification2Component implements OnInit {

  constructor() { }
  // set the currenr year
  year: number = new Date().getFullYear();
  ngOnInit(): void {
  }
  config: any = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '80px',
      'height': '50px'
    }
  };
  // swiper config
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true
  };
}
