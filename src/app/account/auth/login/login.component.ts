import { Component, OnInit } from '@angular/core';
import { FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FormsModule,

  ]
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted = false;
  error: string = '';
  authMode: 'matricule' | 'windows' | null = null;
  fieldTextType = false;
matricule: string = '';
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private authService: AuthfakeauthenticationService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }


  }

  chooseWindows() {
    this.authMode = 'windows';
    this.authService.windowsAuth().subscribe({
      next: user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/']);
      },
      error: () => this.error = "Échec de l'authentification Windows"
    });
  }

  chooseMatricule() {
    this.authMode = 'matricule';
  }


  onSubmit() {
    this.submitted = true;


console.log(this.matricule);

    this.authService.loginByMatricule(this.matricule).subscribe({
      next: user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log(user);
       this.router.navigate(['/']);
      },
      error: () => this.error = "Matricule incorrect ou inexistant"
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
