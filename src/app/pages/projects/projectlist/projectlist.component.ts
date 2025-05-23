import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Demande } from 'src/app/core/models/interfaces/demande';
import { DemandeService } from 'src/app/core/models/services/demande.service';


@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss']
})
export class ProjectlistComponent implements OnInit {
  breadCrumbItems: Array<{}> = [];
  demandeList: Demande[] = [];
  returnedArray: Demande[] = [];
  page: number = 1;
  endItem: number = 6;
currentUser: any = null;
demande={} as Demande;
  constructor(private demandeService: DemandeService) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Demande List', active: true }];
    this.loadDemandes();
     const user = localStorage.getItem('currentUser');
    this.currentUser = user ? JSON.parse(user) : null;
  }

  loadDemandes() {
    this.demandeService.getAll().subscribe(demandes => {
      this.demandeList = demandes;
      this.returnedArray = demandes;
      this.paginate(1);
    });
  }
  // accepter la demande
  acceptDemande(id: number,demande:Demande): void {
    if (confirm("Confirmer l'acceptation ?")) {
      demande.etat = "accepté";
      let dm= Object.assign({},demande);

      this.demandeService.update(id,dm).subscribe(() => {
        //this.loadDemandes(); // refresh list
        alert("Demande acceptée avec succès !");
      });
    }
  }
  // refuser la demande
  refuseDemande(id: number,demande:Demande): void {
    if (confirm("Confirmer le refus ?")) {
      demande.etat = "refusé";
      let dm= Object.assign({},demande);
      this.demandeService.update(id, dm).subscribe(() => {
        //this.loadDemandes(); // refresh list
        alert("Demande refusée avec succès !");
      });
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.paginate(event.page);
  }

  paginate(page: number): void {
    const start = (page - 1) * 6;
    this.endItem = page * 6;
    this.returnedArray = this.demandeList.slice(start, this.endItem);
  }

  deleteDemande(id: number): void {
    if (confirm("Confirmer la suppression ?")) {
      this.demandeService.delete(id).subscribe(() => {
        this.loadDemandes(); // refresh list
      });
    }
  }
}
