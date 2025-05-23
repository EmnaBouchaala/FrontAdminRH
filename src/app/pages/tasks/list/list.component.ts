import { Component, OnInit } from '@angular/core';
import { FournitureService } from 'src/app/core/models/services/fourniture.service';
import { Fourniture } from 'src/app/core/models/interfaces/fourniture';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [PagetitleComponent, CommonModule, FormsModule]
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<any> = [];
  fournitures: Fourniture[] = [];
currentUser: any = null;
  constructor(private fournitureService: FournitureService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Fournitures' }, { label: 'Liste', active: true }];
    this.fetchFournitures();
    const user = localStorage.getItem('currentUser');
    this.currentUser = user ? JSON.parse(user) : null;

  }

  fetchFournitures() {
    this.fournitureService.getAll().subscribe(data => {
      this.fournitures = data;
      console.log(this.fournitures);
    });
  }

  accepter(f: Fourniture) {
    f.etats = 'Acceptée';
    this.fournitureService.update(f.id, f).subscribe(() => {
      alert('Demande acceptée');
    });
  }

  refuser(f: Fourniture) {
    f.etats = 'Refusée';
    this.fournitureService.update(f.id, f).subscribe(() => {
      alert('Demande refusée');
    });
  }
}
