import { Component, OnInit } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-steptwoverification',
  templateUrl: './steptwoverification.component.html',
  styleUrls: ['./steptwoverification.component.scss'],
  standalone:true,
  imports:[NgOtpInputModule],
})
export class SteptwoverificationComponent implements OnInit {

  constructor() { }
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
  ngOnInit(): void {
    document.body.classList.remove('auth-body-bg')
  }
  // set the currenr year
  year: number = new Date().getFullYear();
}
