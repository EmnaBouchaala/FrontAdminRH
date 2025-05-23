import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { fetchmailData } from 'src/app/store/Email/email.action';
import { selectData } from 'src/app/store/Email/email.selector';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emailread',
  templateUrl: './emailread.component.html',
  styleUrls: ['./emailread.component.scss'],
  standalone:true,
  imports:[CommonModule, NgxEditorModule],
  schemas: [NO_ERRORS_SCHEMA]
})

/**
 * Email read Component
 */
export class EmailreadComponent implements OnInit {

  modalRef?: BsModalRef;
  emailData: any;
  returnedArray: any
  public index: number;
  editor: Editor;
  html = '<p>Content of the editor.</p>';
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private modalService: BsModalService, public store: Store) {
    this.route.params.subscribe(params => {
      this.emailData = this.returnedArray.filter((email) => {
        // tslint:disable-next-line: radix
        return email.id === parseInt(params.id);
      });
      this.index = params.id;
    });
  }

  ngOnInit() {
    this.editor = new Editor();
    this.breadCrumbItems = [{ label: 'Email' }, { label: 'Read Email', active: true }];
    // Fetch data
    this.store.dispatch(fetchmailData());
    this.store.select(selectData).subscribe(data => {
      this.emailData = data
      this.returnedArray = data
      // this.customersData = this.returnedArray.slice(0, 8)
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  open(content) {
    this.modalRef = this.modalService.show(content);
  }
}
