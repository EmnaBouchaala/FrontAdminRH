import { Component, OnInit } from '@angular/core';
import { LoaderService } from "../../../core/services/loader.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone:true,
  imports:[CommonModule]
})
export class LoaderComponent implements OnInit {

  loading: boolean = true;

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading.subscribe((v) => {
      setTimeout(() => {
        this.loading = v;
      }, 1500);     
    });
  }
  ngOnInit(): void {
  }

}
