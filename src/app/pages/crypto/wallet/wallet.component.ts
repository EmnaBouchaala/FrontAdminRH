import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';


import { ChartType, Activities } from './wallet.model';
import { selectData } from 'src/app/store/Crypto/crypto-selector';
import { OveviewChart } from './data';
import { Store } from '@ngrx/store';
import { fetchorderData } from 'src/app/store/Crypto/crypto.actions';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  providers: [DecimalPipe],
  standalone:true,
  imports:[PagetitleComponent,NgApexchartsModule,TabsModule,FormsModule,PaginationModule,CommonModule]
})
export class WalletComponent implements OnInit {
  orderList: any
  // breadcrumb items
  breadCrumbItems: Array<{}>;
  OveviewChart: ChartType;
  endItem: any
  activitieslist: any;
  returnedArray: any
  activities$: Observable<Activities[]>;
  total: Observable<number>;
  direction: any = 'asc';
  storagetable: any;
  pageSize = 10; // Default page size
  constructor(public store: Store) { }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Crypto' }, { label: 'Wallets', active: true }];

    this.OveviewChart = OveviewChart;
    // store
    this.store.dispatch(fetchorderData());
    this.store.select(selectData).subscribe(data => {
      this.orderList = data
      this.returnedArray = data
      this.orderList = this.returnedArray.slice(0, 10);
    })
  }
  // pageper item selected
  updatePageSize() {
    this.orderList = this.returnedArray.slice(0, this.pageSize);
  }
  /**
 * Sort table data
 * @param param0 sort the column
 *
 */  // Sort Data

  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.storagetable]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.storagetable = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }
  // pagechanged
  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.orderList = this.returnedArray.slice(startItem, this.endItem);
  }

}
