import { Component, QueryList, ViewChildren } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { addCustomerlist, fetchCustomerData, updateCustomerlist } from 'src/app/store/customer/customer.action';
import { selectData } from 'src/app/store/customer/customer-selector';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [DecimalPipe]
})

/**
 * Ecomerce Customers component
 */
export class CustomersComponent {
  endItem: any
  modalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: UntypedFormGroup;
  submitted: boolean = false;
  term: any;

  // page
  currentpage: number;
  returnedArray: any
  // Table data
  content?: any;
  customersData: any;
  total: Observable<number>;

  constructor(private modalService: BsModalService, private formBuilder: UntypedFormBuilder, private datePipe: DatePipe, public store: Store) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Customers', active: true }];

    this.formData = this.formBuilder.group({
      id: [''],
      username: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      rating: [''],
      balance: ['', [Validators.required]],
      date: null
    });

    this.currentpage = 1;

    // Fetch data
    this.store.dispatch(fetchCustomerData());
    this.store.select(selectData).subscribe(data => {
      this.customersData = data
      this.returnedArray = data
      this.customersData = this.returnedArray.slice(0, 8)
    })
  }

  get form() {
    return this.formData.controls;
  }

  validateForm() {
    const form = this.formData;

    if (form.invalid) {
      // Display error messages and prevent form submission
      form.markAllAsTouched();
      return false;
    }

    return true;
  }
  /**
   * Open modal
   * @param content modal content
  */
  openModal(content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content);
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  editDataGet(id: any, content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Customer';
    var updateBtn = document.getElementById('btn-save-event') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";
    this.formData.patchValue(this.customersData[id]);
  }

  // Save customer
  saveCustomer() {
    if (this.formData.valid) {
      if (this.formData.get('id')?.value) {
        const updatedData = this.formData.value;
        this.store.dispatch(updateCustomerlist({ updatedData }));
      } else {
        const dates = new Date();
        const formattedDate = this.datePipe.transform(dates, 'dd MMM, yyyy');
        this.formData.controls['date'].setValue(formattedDate);

        const newData = this.formData.value
        this.store.dispatch(addCustomerlist({ newData }));
      }
      this.modalService?.hide()
      setTimeout(() => {
        this.formData.reset();
      }, 2000);
      this.submitted = true
    }
    // }
  }

  // Delete Data
  delete(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          document.getElementById('c_' + id)?.remove();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }
  page: any = 1;
  // pagechanged
  pageChanged(event: any) {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.customersData = this.returnedArray.slice(startItem, this.endItem)
  }

  // fiter job
  selectname() {
    if (this.term) {
      this.customersData = this.returnedArray.filter((es: any) => {
        return es.username.toLowerCase().includes(this.term.toLowerCase())
      })
    } else {
      this.customersData = this.returnedArray
    }
  }
} 