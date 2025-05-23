import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

// Date Format
import { DatePipe } from '@angular/common';

import { selectData } from 'src/app/store/orders/order-selector';
import { addEcoOrders, deleteEcoOrders, fetchEcoorderDataData, updateEcoOrders } from 'src/app/store/orders/order.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})

/**
 * Ecommerce orders component
 */
export class OrdersComponent {
  enditem: any
  modalRef?: BsModalRef;
  masterSelected!: boolean;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  orderlist: any
  ordersForm!: UntypedFormGroup;
  submitted = false;
  content?: any;
  orderes?: any;
  total: Observable<number>;
  page: any = 1;
  deletId: any;
  Allorderlist: any
  @ViewChild('showModal', { static: false }) showModal?: ModalDirective;
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;

  constructor(private modalService: BsModalService, private formBuilder: UntypedFormBuilder, private datePipe: DatePipe, private store: Store) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'O rders', active: true }];

    /**
     * Form Validation
     */
    this.ordersForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      total: ['', [Validators.required]],
      status: ['', [Validators.required]],
      payment: ['', [Validators.required]]
    });

    // fetch data
    this.store.dispatch(fetchEcoorderDataData());
    this.store.select(selectData).subscribe(data => {
      this.orderlist = data;
      this.Allorderlist = data;
    });
  }

  /**
   * Open modal
   * @param content modal content
   */
  openViewModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.orderes.forEach((x: { state: any; }) => x.state = ev.target.checked)
  }

  checkedValGet: any[] = [];
  // Delete Data
  deleteData(id: any) {
    if (id) {
      document.getElementById('lj_' + id)?.remove();
    }
    else {
      this.checkedValGet.forEach((item: any) => {
        document.getElementById('lj_' + item)?.remove();
      });
    }
  }

  // Delete Data
  confirm(id: any) {
    this.deletId = id
    this.removeItemModal.show();
  }
  // delete order
  deleteOrder() {
    this.store.dispatch(deleteEcoOrders({ ids: this.deletId }));
    this.removeItemModal.hide();
  }

  // fiter job
  searchOrder() {
    if (this.term) {
      this.orderlist = this.Allorderlist.filter((data: any) => {
        return data.name.toLowerCase().includes(this.term.toLowerCase())
      })
    } else {
      this.orderlist = this.Allorderlist
    }
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }
  /**
   * Form data get
   */
  get form() {
    return this.ordersForm.controls;
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.ordersForm.valid) {
      if (this.ordersForm.get('id')?.value) {
        const updatedData = this.ordersForm.value;
        this.store.dispatch(updateEcoOrders({ updatedData }));
      } else {
        this.ordersForm.controls['id'].setValue(this.orderlist.length + 1)
        const currentDate = new Date();
        const formattedDate = this.datePipe.transform(currentDate, 'yyyy-mm-dd');
        this.ordersForm.controls['date'].setValue(formattedDate);
        const newData = this.ordersForm.value;
        this.store.dispatch(addEcoOrders({ newData }))
      }
      this.showModal?.hide()

      setTimeout(() => {
        this.ordersForm.reset();
      }, 0);
      this.submitted = true
    }
  }
  /**
   * Open Edit modal
   * @param content modal content
   */
  editModal(id: any) {
    this.submitted = false;
    this.showModal?.show()
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Order';
    var updateBtn = document.getElementById('addNewOrder-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";
    this.ordersForm.patchValue(this.orderlist[id])
  }

  // pagination
  pagechanged(event: any) {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.enditem = event.page * event.itemsPerPage;
    this.orderlist = this.orderlist.slice(startItem, this.enditem)
  }
}
