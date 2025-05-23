import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DemandeConge } from 'src/app/core/models/interfaces/demande-conge';
import { DemandeCongeService } from 'src/app/core/models/services/demande-conge.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  breadCrumbItems: Array<{}> = [];
  files: File[] = [];
  imageURLs: any;
  uploadedFiles: any[] = [];

  demande: DemandeConge = {
    dateDebut: new Date(),
    dateFin: new Date(),
    userId: 0
  };

  constructor(private demandeService: DemandeCongeService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Congés' }, { label: 'Créer une demande', active: true }];

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.demande.userId = user?.id;
  }

  onSubmit(): void {
    if (!this.demande.dateDebut || !this.demande.dateFin) return;

    this.demandeService.create(this.demande).subscribe(() => {
      alert('Demande de congé envoyée avec succès !');
      // reset ou redirection si tu veux
    });
  }

  fileChange(event: any) {
    const fileList = event.target as HTMLInputElement;
    const file: File = fileList.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageURLs = reader.result as string;
      document.querySelectorAll('#projectlogo-img').forEach((el: any) => el.src = this.imageURLs);
    };
  }

  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false
  };

  onUploadSuccess(event: any) {
    setTimeout(() => this.uploadedFiles.push(event[0]), 100);
  }

  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }
}
