import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgStepperModule } from 'angular-ng-stepper';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  standalone:true,
  imports:[CommonModule,PagetitleComponent,NgStepperModule,CdkStepperModule ]
})

/**
 * Form wizard component
 */
export class WizardComponent implements OnInit {
 // bread crumb items
 breadCrumbItems: Array<{}>;

 constructor() { }

 ngOnInit() {
   this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Wizard', active: true }];
 }

}
