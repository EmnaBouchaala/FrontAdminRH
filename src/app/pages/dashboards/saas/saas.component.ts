import { Component, OnInit } from '@angular/core';
import { QuizResultService } from 'src/app/core/models/services/quiz-result.service';

@Component({
  selector: 'app-saas',
  templateUrl: './saas.component.html',
  styleUrls: ['./saas.component.scss']
})
export class SaasComponent implements OnInit {

  // Déclaration des statistiques
  totalParticipants: number = 0;
  passedQuizAbove10: number = 0;
  failedQuizBelow10: number = 0;
currentUser: any = null;
  constructor(private quizResultService: QuizResultService) { }

  ngOnInit(): void {
    // Charger les statistiques
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = this.currentUser ? JSON.parse(this.currentUser) : null;
    this.loadStats();
  }

  // Fonction pour récupérer les statistiques
  loadStats(): void {
    this.quizResultService.getTotalParticipants().subscribe((total) => {
      this.totalParticipants = total;
    });

    this.quizResultService.getPassedQuizAbove10().subscribe((passed) => {
      this.passedQuizAbove10 = passed;
    });

    this.quizResultService.getFailedQuizBelow10().subscribe((failed) => {
      this.failedQuizBelow10 = failed;
    });
  }
}
