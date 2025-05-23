import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { RootReducerState } from 'src/app/store';
import { selectData } from 'src/app/store/filemanager/filemanager-selector';
import { fetchRecentFilesData } from 'src/app/store/filemanager/filemanager.actions';

@Component({
  selector: 'app-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,CommonModule,BsDropdownModule,CollapseModule,AlertModule,NgApexchartsModule]
})
export class FilemanagerComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  radialoptions: any;
  public isCollapsed: boolean = false;
  dismissible = true;
  Recentfile: any

  constructor(public router: Router, private store: Store<{ data: RootReducerState }>) {
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Apps' }, { label: 'File Manager', active: true }];

    this.store.dispatch(fetchRecentFilesData());
    this.store.select(selectData).subscribe(data => {
      this.Recentfile = data
    });


    this.radialoptions = {
      series: [76],
      chart: {
        height: 150,
        type: 'radialBar',
        sparkline: {
          enabled: true
        }
      },
      colors: ['#556ee6'],
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: '97%',
            margin: 5, // margin is in pixels
          },
          hollow: {
            size: '60%',
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: -2,
              fontSize: '16px'
            }
          }
        }
      },
      grid: {
        padding: {
          top: -10
        }
      },
      stroke: {
        dashArray: 3
      },
      labels: ['Storage'],
    }
  }


}
