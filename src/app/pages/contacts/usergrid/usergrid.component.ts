import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ServiceService } from 'src/app/core/models/services/service.service';
import { Service } from 'src/app/core/models/interfaces/service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PagetitleComponent],
})
export class UsergridComponent implements OnInit {
  breadCrumbItems: Array<{}> = [];
  modalRef?: BsModalRef;

  serviceForm: UntypedFormGroup;
  submitted = false;

  services: Service[] = [];
  editMode: boolean = false;
currentUser: any = null;
  constructor(
    private modalService: BsModalService,
    private fb: UntypedFormBuilder,
    private serviceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Gestion' }, { label: 'Services', active: true }];
    const user = localStorage.getItem('currentUser');
    this.currentUser = user ? JSON.parse(user) : null;
    if (this.currentUser?.role !== 'Administrateur') {
      this.router.navigate(['/profile']);
    }

    this.serviceForm = this.fb.group({
      id: [0],
      nom: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.loadServices();
  }

  get f() {
    return this.serviceForm.controls;
  }

  openModal(template: any, service?: Service) {
    this.editMode = !!service;

    if (service) {
      this.serviceForm.patchValue(service);
    } else {
      this.serviceForm.reset({ id: 0 });
    }

    this.modalRef = this.modalService.show(template);
  }

  loadServices() {
    this.serviceService.getAll().subscribe((data) => {
      this.services = data;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.serviceForm.invalid) return;

    const service = this.serviceForm.value;

    if (this.editMode) {
      this.serviceService.update(service.id, service).subscribe(() => {
        this.loadServices();
        this.modalRef?.hide();
      });
    } else {
      this.serviceService.create(service).subscribe(() => {
        this.loadServices();
        this.modalRef?.hide();
      });
    }
  }

  deleteService(id: number) {
    if (confirm('Supprimer ce service ?')) {
      this.serviceService.delete(id).subscribe(() => {
        this.loadServices();
      });
    }
  }
}
