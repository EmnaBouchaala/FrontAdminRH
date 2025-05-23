import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Fourniture } from 'src/app/core/models/interfaces/fourniture';
import { Matiere } from 'src/app/core/models/interfaces/matiere';
import { TypeFourniture } from 'src/app/core/models/interfaces/type-fourniture';

import { FournitureService } from 'src/app/core/models/services/fourniture.service';
import { MatiereService } from 'src/app/core/models/services/matiere.service';
import { TypeFournitureService } from 'src/app/core/models/services/type-fourniture.service';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CreatetaskComponent implements OnInit {

  fourniture: Fourniture = {
    id: 0,
    nom: '',
    quantite: 1,
    date: new Date(),
    etats: 'En attente',
    type: '', // sera le matricule Windows
    MatiereId: null,
    TypeFournitureId: null
  };

  matieres: Matiere[] = [];
  types: TypeFourniture[] = [];

  constructor(
    private matiereService: MatiereService,
    private typeFournitureService: TypeFournitureService,
    private fournitureService: FournitureService
  ) {}

  ngOnInit(): void {
    this.loadLists();

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user?.matriculeWindows) {
      this.fourniture.type = user.matriculeWindows;
    }
  }

  loadLists() {
    this.matiereService.getAll().subscribe(data => this.matieres = data);
    this.typeFournitureService.getAll().subscribe(data => this.types = data);
  }

  onSubmit() {
    this.fournitureService.create(this.fourniture).subscribe({
      next: () => {
        alert('Demande enregistrée avec succès !');
        this.resetForm();
      },
      error: () => {
        alert("Une erreur s'est produite lors de l'envoi.");
      }
    });
  }

  resetForm() {
    this.fourniture = {
      id: 0,
      nom: '',
      quantite: 1,
      date: new Date(),
      etats: 'En attente',
      type: this.fourniture.type,
      MatiereId: null,
      TypeFournitureId: null
    };
  }
}
