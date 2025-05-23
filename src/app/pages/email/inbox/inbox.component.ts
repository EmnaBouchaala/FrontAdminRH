import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { fetchmailData } from 'src/app/store/Email/email.action';
import { selectData } from 'src/app/store/Email/email.selector';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  standalone:true,
  imports:[CommonModule,NgxEditorModule],
  schemas: [NO_ERRORS_SCHEMA]
})

/**
 * Email Inbox component
 */
export class InboxComponent implements OnInit {

  modalRef?: BsModalRef;

  editor: Editor;
  html = '<p>Content of the editor.</p>';
  // bread crumb items
  breadCrumbItems: Array<{}>;

  emailIds: number[] = [];
  emailData: any;
  // page number
  page: number = 1;
  // default page size
  pageSize: number = 15;
  // total number of records
  totalRecords: number = 0;
  returnedArray: any
  // start and end index
  startIndex: number = 1;
  endIndex: number = 15;

  constructor(private modalService: BsModalService, public store: Store) {
  }

  ngOnInit() {
    this.editor = new Editor();
    this.breadCrumbItems = [{ label: 'Email' }, { label: 'Inbox', active: true }];
    // this.emailData = emailData;

    // Fetch data
    this.store.dispatch(fetchmailData());
    this.store.select(selectData).subscribe(data => {
      this.emailData = data
      this.returnedArray = data
      // this.customersData = this.returnedArray.slice(0, 8)
    })
    this.totalRecords = this.emailData.length;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  open(content) {
    this.modalRef = this.modalService.show(content);
  }

  markUnread() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.emailIds.length; i++) {
      const obj = this.emailData.find(o => o.id === this.emailIds[i]);
      const index = this.emailData.indexOf(obj);
      this.emailData[index].unread = true;
    }
    this.emailIds = [];
  }

  selectMail(event, id) {
    if (event.target.checked) {
      this.emailIds.push(id);
    } else {
      this.emailIds.splice(this.emailIds.indexOf(id), 1);
    }
  }

  deleteMail() {
    const found = this.emailData.some(r => this.emailIds.indexOf(r.id) >= 0);
    if (found) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.emailIds.length; i++) {
        const obj = this.emailData.find(o => o.id === this.emailIds[i]);
        this.emailData.splice(this.emailData.indexOf(obj), 1);
      }
    }
    this.emailIds = [];
  }

  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.deleteMail();
        Swal.fire('Deleted!', 'Mail has been deleted.', 'success');
      }
    });
  }

  /**
   * Handle on page click event
   */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize + 1;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.emailData = this.returnedArray.slice(this.startIndex - 1, this.endIndex - 1);
  }

  /**
   * Category Filtering  
   */
  categoryFilter(e: any, name: any) {
    var removeClass = document.querySelectorAll('.mail-list a');
    removeClass.forEach((element: any) => {
      element.classList.remove('active');
    });
    e.target.closest('.mail-list a').classList.add('active')
    if (name == 'all') {
      this.emailData = this.returnedArray
    }
    else {
      this.emailData = this.returnedArray.filter((email: any) => {
        return email.category === name;
      });
    }
  }

}
