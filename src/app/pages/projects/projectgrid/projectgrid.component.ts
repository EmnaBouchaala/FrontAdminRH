import { Component, OnInit } from '@angular/core';
import { DemandeConge } from 'src/app/core/models/interfaces/demande-conge';
import { DemandeCongeService } from 'src/app/core/models/services/demande-conge.service';


@Component({
  selector: 'app-projectgrid',
  templateUrl: './projectgrid.component.html',
  styleUrls: ['./projectgrid.component.scss']
})
export class ProjectgridComponent implements OnInit {

  breadCrumbItems: any[] = [];
  demandes: DemandeConge[] = [];
  returnedArray: DemandeConge[] = [];
  page = 1;
  endItem = 9;

  constructor(private demandeService: DemandeCongeService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Congés' }, { label: 'Demandes', active: true }];
    this.fetchDemandes();
  }

  fetchDemandes() {
    this.demandeService.getAll().subscribe(data => {
      this.demandes = data;
      this.returnedArray = data;
      this.updatePagination();
    });
  }

  updatePagination() {
    const startItem = (this.page - 1) * this.endItem;
    this.returnedArray = this.demandes.slice(startItem, startItem + this.endItem);
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.updatePagination();
  }

  updateEtat(demande: DemandeConge, etat: string) {
    const updated = { ...demande, etat };
    this.demandeService.update(updated).subscribe(() => {
      demande.etat = etat;
    });
  }
}
