import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productModel, productList } from '../product.model';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})

/**
 * Ecommerce product-detail component
 */
export class ProductdetailComponent implements OnInit {
  carouselReference: any
  breadCrumbItems: Array<{}>;
  public productDetail: productModel[];

  isImage: string;
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params =>
      this.productDetail = productList.filter(function (product) {
        return product.id == parseInt(params.id)
      })
    );
    this.isImage = this.productDetail[0].images[0];
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Product Detail', active: true }];
  }

  /**
   * onclick Image show
   * @param event image passed
   */
  imageShow(event) {
    const image = event.target.src;
    this.isImage = image;
    const expandImg = document.getElementById('expandedImg') as HTMLImageElement;
    expandImg.src = image;
  }

  // tabbed-carousel.component.ts
  carouselOptions = {
    items: 1,
    nav: false,
    dots: false,
    loop: false,
    autoplay: false, // You can set this to true if you want automatic sliding.
  };

  tabs = [
    { image: 'assets/images/product/img-1.png', selected: true },
    { image: 'assets/images/product/img-2.png', selected: false },
    { image: 'assets/images/product/img-3.png', selected: false },
    { image: 'assets/images/product/img-4.png', selected: false },
    // Add more tabs and images as needed
  ];


  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    // rtl: this.isRTL
  };

  config = {
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    arrows: false,
  }

  // slick tab change
  slickChange(event: any) {
    const swiper = document.querySelectorAll('.nav-link')
  }
  slidePreview(id: any, event: any) {
    const swiper = document.querySelectorAll('.nav-link')
    swiper.forEach((el: any) => {
      el.classList.remove('active')
    })
    event.target.closest('.nav-link').classList.add('active')
    this.slickModal.slickGoTo(id)
  }

}
