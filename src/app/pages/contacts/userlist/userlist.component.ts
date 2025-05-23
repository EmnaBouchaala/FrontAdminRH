import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/core/models/services/user.service';
import { RoleService } from 'src/app/core/models/services/role.service';
import { ServiceService } from 'src/app/core/models/services/service.service';
import { User } from 'src/app/core/models/interfaces/user';
import { Role } from 'src/app/core/models/interfaces/role';
import { Service } from 'src/app/core/models/interfaces/service';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ModalModule,
    CommonModule
  ]
})

export class UserlistComponent implements OnInit {
  users: User[] = [];
  roles: Role[] = [];
  services: Service[] = [];

  term = '';
  deleteId: number | null = null;
  newUser: User = this.getEmptyUser();
  currentUser: any = null;
  @ViewChild('newContactModal') newContactModal!: ModalDirective;
  @ViewChild('removeItemModal') removeItemModal!: ModalDirective;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private serviceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.roleService.getAll().subscribe(data => this.roles = data);
    this.serviceService.getAll().subscribe(data => this.services = data);
      const user = localStorage.getItem('currentUser');
    this.currentUser = user ? JSON.parse(user) : null;
    if (this.currentUser?.role !== 'Administrateur') {
      this.router.navigate(['/profile']);
    }
  }

  getEmptyUser(): User {
    return {
      id: 0,
      nom_complet: '',
      email: '',
      fonction: '',
      responsable: '',
      matricule: '',
      matriculeWindows: '',
      role_id: undefined,
      id_Service: undefined,
      etats: 1
    };
  }

  loadUsers() {
    this.userService.getAll().subscribe(data => this.users = data);
  }

  saveUser(form: NgForm) {
    if (form.invalid) return;

    if (this.newUser.id === 0) {
      // Create user
      this.userService.create(this.newUser).subscribe(() => {
        this.loadUsers();
        this.newUser = this.getEmptyUser();
        this.newContactModal.hide();
        form.resetForm(this.getEmptyUser());
      });
    } else {
      // Update user
      this.userService.update(this.newUser.id, this.newUser).subscribe(() => {
        this.loadUsers();
        this.newContactModal.hide();
        form.resetForm(this.getEmptyUser());
      });
    }
  }

  removeUser(id: number) {
    this.deleteId = id;
    this.removeItemModal.show();
  }

  confirmDelete() {
    if (!this.deleteId) return;
    this.userService.delete(this.deleteId).subscribe(() => {
      this.loadUsers();
      this.removeItemModal.hide();
    });
  }

  openModal() {
    this.newUser = this.getEmptyUser();
    this.newContactModal.show();
  }

  cancelModal() {
    this.newContactModal.hide();
  }
}
