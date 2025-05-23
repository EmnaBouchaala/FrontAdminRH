import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { fetchCartData } from 'src/app/store/Cart/cart.action';
import { selectData } from 'src/app/store/Cart/cart-selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

/**
 * Ecommerce Cart component
 */
export class CartComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  value: number;

  cartData: any
  subtotal: any = 0;
  discount: any;
  discountRate = 0.15;
  shipping: any;
  shippingRate: any = '65.00';
  tax: any;
  taxRate = 0.125;
  totalprice: any;

  total: any;
  constructor(public store: Store) { }

  ngOnInit() {

    this.value = 4;
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Cart', active: true }];


    this.store.dispatch(fetchCartData());
    this.store.select(selectData).subscribe(data => {
      this.cartData = data;
      this.cartData.map((x: any) => {
        x['total'] = (x['qty'] * x['price']).toFixed(2)
        this.subtotal += parseFloat(x['total'])
      })
      this.subtotal = this.subtotal.toFixed(2)
      this.discount = (this.subtotal * this.discountRate).toFixed(2)
      this.tax = (this.subtotal * this.taxRate).toFixed(2);
      this.totalprice = (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shippingRate) - parseFloat(this.discount)).toFixed(2)
    }
    );

  }

  // Delete Data
  delete(event: any) {
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
          event.target.closest('tr')?.remove();
        }
      });
  }

  // Increment Decrement Quantity
  qty: number = 0;
  calculateQty(id: any, qty: any, i: any) {
    this.subtotal = 0;
    if (id == '0' && qty > 1) {
      qty--;
      this.cartData[i].qty = qty
      this.cartData[i].total = (this.cartData[i].qty * this.cartData[i].price).toFixed(2)
    }
    if (id == '1') {
      qty++;
      this.cartData[i].qty = qty
      this.cartData[i].total = (this.cartData[i].qty * this.cartData[i].price).toFixed(2)
    }
    this.cartData.map((x: any) => {
      this.subtotal += parseFloat(x['total'])
    })
    this.subtotal = this.subtotal.toFixed(2)
    this.discount = (this.subtotal * this.discountRate).toFixed(2)
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalprice = (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shippingRate) - parseFloat(this.discount)).toFixed(2)
  }

}
