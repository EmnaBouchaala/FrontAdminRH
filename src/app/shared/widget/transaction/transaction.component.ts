import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  standalone:true,
  imports:[CommonModule,ModalModule]

})
export class TransactionComponent implements OnInit {

  modalRef?: BsModalRef;

  @Input() transactions: Array<{
    id?: string;
    index?: number,
    name?: string,
    date?: string,
    total?: string,
    status?: string,
    payment?: string[],
  }>;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

}
