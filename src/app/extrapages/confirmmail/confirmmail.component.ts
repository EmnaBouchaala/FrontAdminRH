import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmmail',
  templateUrl: './confirmmail.component.html',
  styleUrls: ['./confirmmail.component.scss'],
  standalone:true,
  imports:[RouterModule],
})
export class ConfirmmailComponent implements OnInit {
  // set the currenr year
  year: number = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
    document.body.classList.remove('auth-body-bg')
  }

}
