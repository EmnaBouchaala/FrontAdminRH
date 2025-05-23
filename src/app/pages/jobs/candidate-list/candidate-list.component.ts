import { Component, OnInit } from '@angular/core';
// store
import { Store } from '@ngrx/store';
import { fetchCandidatelistData } from 'src/app/store/Candidate/candidate.actions';
import { selectData } from 'src/app/store/Candidate/candidate-selector';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})

/**
 * Candidate List Component
 */
export class CandidateListComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  lists: any;
  alllists: any;
  term: any;
  searchterm: any
  public isCollapsed: boolean = true;

  constructor(public store: Store) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Jobs' }, { label: 'Candidate List', active: true }];

    /**
   * fetches data
   */
    this.store.dispatch(fetchCandidatelistData());
    this.store.select(selectData).subscribe(data => {
      this.lists = data;
      this.alllists = cloneDeep(data)
      this.lists = this.alllists.slice(0, 8)
    });
  }

  // filter status
  taskFilter() {
    var status = (document.getElementById("idType") as HTMLInputElement).value;
    if (status) {
      this.lists = this.alllists.filter((data: any) => {
        return data.type === status;
      });
    }
    else {
      this.lists = this.alllists
    }
  }
  // search term
  searchTerm() {
    if (this.term) {
      this.lists = this.alllists.filter((el: any) => {
        return el.name.toLowerCase().includes(this.term.toLowerCase())
      });
    } else {
      this.lists = this.alllists
    }
  }

  // location
  Location() {
    if (this.searchterm) {
      this.lists = this.alllists.filter((el: any) => {
        return el.location.toLowerCase().includes(this.searchterm.toLowerCase())
      });
    } else {
      this.lists = this.alllists
    }
  }
  /**
   * Active Toggle navbar
   */
  activeMenu(id: any) {
    document.querySelector('.active_' + id)?.classList.toggle('active');
  }

}
