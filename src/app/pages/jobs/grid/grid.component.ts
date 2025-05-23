
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormationService } from 'src/app/core/models/services/formation.service';
import { QuizService } from 'src/app/core/models/services/quiz.service';
import { QuizQuestionService } from 'src/app/core/models/services/quiz-question.service';
import { Formation } from 'src/app/core/models/interfaces/formation';
import { Quiz } from 'src/app/core/models/interfaces/quiz.model';
import { QuizQuestion } from 'src/app/core/models/interfaces/question.model';
import { trigger, style, animate, transition } from '@angular/animations';
import jsPDF from 'jspdf';


import * as QRCode from 'qrcode'; // Pour générer un QR dynamique



@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class GridComponent implements OnInit {
  formations: Formation[] = [];
  quizzes: Quiz[] = [];
  quizQuestions: QuizQuestion[] = [];
  selectedQuiz: Quiz | null = null;
  timeLeft: number = 20;        // 10 secondes de chrono
  timerInterval?: any; 

  currentQuestionIndex = 0;
  userAnswers: { [questionId: number]: number } = {};
  score: number | null = null;
  pointsPerQuestion = 10; // ou ce que tu souhaites comme barème

  quizModalRef?: BsModalRef;

  @ViewChild('quizModal') quizModal!: TemplateRef<any>;

  currentUser = JSON.parse(localStorage.getItem('currentUser')!); // adapte en fonction

  constructor(
    private formationService: FormationService,
    private quizService: QuizService,
    private quizQuestionService: QuizQuestionService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations() {
    this.formationService.getAllFormations().subscribe({
      next: (data) => (this.formations = data),
      error: (err) => console.error(err),
    });
  }

  openQuizForFormation(formation: Formation) {
    this.score = null;
    this.quizQuestions = [];
    this.selectedQuiz = null;
    this.currentQuestionIndex = 0;
    this.userAnswers = {};

    // Charger le quiz de la formation (ici on prend le 1er quiz pour simplifier)
    this.quizService.getQuizsByFormation(formation.id!).subscribe({
      next: (quizzes) => {
        if (quizzes.length > 0) {
          this.selectedQuiz = quizzes[0]; // adapter si plusieurs quizzes par formation
          this.loadQuizQuestions(this.selectedQuiz.id!);
          this.quizModalRef = this.modalService.show(this.quizModal, {
            class: 'modal-lg modal-dialog-centered',
          });
          this.startTimer();  // lance le chrono ici
        } else {
          alert('Aucun quiz disponible pour cette formation.');
        }
      },
      error: (err) => console.error(err),
    });
  }
 startTimer() {
  this.timeLeft = 20;  // reset à 20 secondes
  this.timerInterval = setInterval(() => {
    this.timeLeft--;
    if (this.timeLeft === 0) {
      this.handleTimeout(); // Quand le timer arrive à 0, on appelle handleTimeout()
    }
  }, 1000);
}

  resetTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timeLeft = 20;
  }
  handleTimeout() {
  this.resetTimer();  // stoppe le timer

  if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
    this.nextQuestion(); // passe à la question suivante
    this.startTimer();   // relance le timer pour la nouvelle question
  } else {
    // Plus de questions, on soumet le quiz
    this.submitQuiz();

    // La modale reste ouverte, le score est affiché via la variable this.score
    // L'utilisateur peut fermer la modale manuellement après avoir vu le score
  }
}



  nextQuestion() {
    if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
      this.currentQuestionIndex++;
      this.resetTimer();
      this.startTimer();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.resetTimer();
      this.startTimer();
    }
  }


  loadQuizQuestions(quizId: number) {
    this.quizQuestionService.getQuestionsByQuiz(quizId).subscribe({
      next: (questions) => {
        this.quizQuestions = questions;
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
      },
      error: (err) => console.error(err),
    });
  }

  selectOption(questionId: number, optionId: number) {
    this.userAnswers[questionId] = optionId;
  }


 submitQuiz() {
  if (!this.selectedQuiz || !this.currentUser) return alert('Quiz ou utilisateur non défini.');

  const answers = Object.entries(this.userAnswers).map(([questionId, optionId]) => ({
    questionId: +questionId,
    optionId,
  }));

  this.quizService.submitQuiz(this.selectedQuiz.id!, this.currentUser.id, { answers }).subscribe({
    next: (res) => {
      this.score = res.score;  // <-- score récupéré du backend
    },
    error: (err) => console.error('Erreur lors de la soumission du quiz', err),
  });
}

// Méthode pour charger une image locale en base64
loadImageBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = url;
  });
}

async downloadCertificate() {
  try {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });

    const mainRed = '#D32F2F';
    const lightRed = '#E57373';
    const darkRed = '#B71C1C';

    // Charger les images
    const logo = await this.loadImageBase64('assets/logo.png');
    const signature = await this.loadImageBase64('assets/signature.png');
    const codeqr = await this.loadImageBase64('assets/codeqr.png');

    const userName = this.currentUser?.nom_complet ?? 'Participant';
    const quizTitle = this.selectedQuiz?.titre ?? 'Quiz';
    const totalScore = this.quizQuestions.length * this.pointsPerQuestion;
    const scoreObtained = this.score ?? 0;
    const dateStr = new Date().toLocaleDateString();
    const place = "tunisie, ben arous";

    // Bordure rouge fine
    doc.setDrawColor(mainRed);
    doc.setLineWidth(1);
    doc.rect(5, 5, 200, 287);

    // Bande rouge dégradée en haut
    for (let i = 0; i < 20; i++) {
      doc.setFillColor(
        Math.round(211 - i * 7),
        47,
        47
      );
      doc.rect(0, i, 210, 1, 'F');
    }

    // Logo
    doc.addImage(logo, 'PNG', 10, 3, 30, 14);

    // Titre principal avec ombre
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(darkRed);
    doc.text('Attestation de réussite', 107, 17, { align: 'center' });
    doc.setTextColor(lightRed);
    doc.text('Attestation de réussite', 105, 15, { align: 'center' });

    // Introduction (justifiée)
    let currentY = 35;
    const marginLeft = 25;
    const marginRight = 185;
    const lineHeight = 7;
    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);

    const introText = 
      'Ce certificat atteste que le bénéficiaire a complété avec succès le programme de formation, ' +
      'démontrant un niveau élevé de compétence et un engagement remarquable. ' +
      'La participation active et la réussite au quiz attestent d’une maîtrise solide des connaissances requises.';

    const splitIntro = doc.splitTextToSize(introText, marginRight - marginLeft);
    splitIntro.forEach(line => {
      doc.text(line, marginLeft, currentY);
      currentY += lineHeight;
    });
    currentY += 10;

    // Paragraphe de remerciement (justifié)
    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);

    const thankYouText = 
      'En remerciement pour sa participation active et son engagement tout au long du quiz, ' +
      'ce certificat est délivré à titre de reconnaissance pour les efforts investis et les compétences démontrées.';

    const splitThankYou = doc.splitTextToSize(thankYouText, marginRight - marginLeft);
    splitThankYou.forEach(line => {
      doc.text(line, marginLeft, currentY);
      currentY += lineHeight;
    });
    currentY += 10;

    // Contenu principal
    doc.setTextColor(33, 33, 33);
    doc.setFont('times', 'normal');
    doc.setFontSize(14);
    doc.text('Ce document certifie que', marginLeft, currentY);
    currentY += 12;

    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.text(userName, marginLeft, currentY);
    currentY += 14;

    doc.setFont('times', 'normal');
    doc.setFontSize(14);
    doc.text('a réussi le cours / quiz :', marginLeft, currentY);
    currentY += 12;

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(16);
    doc.setTextColor(mainRed);
    doc.text(quizTitle, marginLeft, currentY);

    currentY += 16;

    doc.setTextColor(33, 33, 33);
    doc.setFont('times', 'normal');
    doc.setFontSize(14);
    doc.text('avec un score de', marginLeft, currentY);

    doc.setFont('times', 'bold');
doc.text(`${scoreObtained} / ${totalScore}`, marginLeft + 45, currentY);
    currentY += 14;

    doc.setFont('times', 'normal');
doc.text(`Date d'obtention : ${dateStr}`, marginLeft, currentY);
    currentY += 15;

    // Complément valorisant la réussite
    const conclusionText = 
      'Cette réussite témoigne du sérieux, de la rigueur et de la persévérance dont ' +
      'le participant a fait preuve. Nous lui souhaitons un avenir brillant et riche en réussites.';

    const splitConclusion = doc.splitTextToSize(conclusionText, marginRight - marginLeft);
    splitConclusion.forEach(line => {
      doc.text(line, marginLeft, currentY);
      currentY += lineHeight;
    });
    currentY += 20;

   

   
    // Date et lieu d’émission
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
doc.text(`Fait à ${place}`, marginLeft, currentY);
doc.text(`Le ${dateStr}`, marginRight - 60, currentY);

    doc.text(`Le ${dateStr}`, marginRight - 60, currentY);

    currentY += 25;

    // Signature et QR code (remontés)
    const signatureY = currentY;
    const signatureHeight = 30;
    const qrY = signatureY - 5;

    // Cadre signature
    doc.setDrawColor(mainRed);
    doc.setLineWidth(1.2);
    doc.roundedRect(marginLeft - 2, signatureY - 2, 74, signatureHeight + 8, 3, 3, 'S');

    // Signature
    doc.addImage(signature, 'PNG', marginLeft + 3, signatureY + 2, 64, 26);
    doc.setFont('times', 'italic');
    doc.setFontSize(13);
    doc.setTextColor(mainRed);
    doc.text('Signature', marginLeft + 35, signatureY + 40, { align: 'center' });

    // QR code avec cadre
    doc.setDrawColor(mainRed);
    doc.setLineWidth(1);
    doc.rect(150, qrY - 2, 50, 50);

    doc.addImage(codeqr, 'PNG', 152, qrY, 46, 46);
    doc.setFontSize(11);
    doc.setTextColor(33, 33, 33);
    doc.text('Scanner pour vérifier', 175, qrY + 52, { align: 'center' });

    

    // Enregistrer le PDF
doc.save(`attestation_${quizTitle.replace(/\s+/g, '_')}.pdf`);
  } catch (error) {
    console.error('Erreur lors du téléchargement du PDF', error);
    alert('Erreur lors de la génération du PDF');
  }
}
}