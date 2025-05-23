import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Formation } from 'src/app/core/models/interfaces/formation';
import { FormationService } from 'src/app/core/models/services/formation.service';
import { CoursService } from 'src/app/core/models/services/cours.service';

import { QuizService } from 'src/app/core/models/services/quiz.service';
import { QuizQuestionService } from 'src/app/core/models/services/quiz-question.service';
import { QuizOptionService } from 'src/app/core/models/services/quiz-option.service';

import { Quiz } from 'src/app/core/models/interfaces/quiz.model';
import { QuizOption } from 'src/app/core/models/interfaces/quiz-option.model';
import { QuizQuestion } from 'src/app/core/models/interfaces/question.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  formations: Formation[] = [];
  formationModalRef?: BsModalRef;
  newFormation: Formation = this.getEmptyFormation();
  searchTerm: string = '';
  selectedFormation: Formation | null = null;
  newCours: { titre: string } = { titre: '' };
  selectedFile: File | null = null;
// Pour le passage du quiz
currentQuestionIndex = 0;
userAnswers: { [questionId: number]: number } = {}; // questionId -> optionId
quizInProgress: boolean = false;
 quizQuestions: QuizQuestion[] = [];
 

  // Gestion Quizz
  quizzes: Quiz[] = [];
  quizModalRef?: BsModalRef;
  selectedQuiz: Quiz | null = null;
  newQuiz: Partial<Quiz> = { titre: '', formationId: 0, questions: [] };
  newQuestion: Partial<QuizQuestion> = { question_text: '', quizId: 0, options: [] };
  newOption: Partial<QuizOption> = { option_text: '', is_correct: false, quizQuestionId: 0 };
  currentUser: { id: number; [key: string]: any } | null = null;

  @ViewChild('formationModal') formationModal!: TemplateRef<any>;
  @ViewChild('quizModal') quizModal!: TemplateRef<any>;

  constructor(
    private formationService: FormationService,
    private coursService: CoursService,
    private modalService: BsModalService,
    private quizService: QuizService,
    private quizQuestionService: QuizQuestionService,
    private quizOptionService: QuizOptionService,
  ) {}

  ngOnInit(): void {
    this.loadFormations();
        this.loadCurrentUser();

  }
 loadCurrentUser() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
  }
  getEmptyFormation(): Formation {
    return {
      titre: '',
      description: '',
      etat: 'en attente',
      type: ''
    };
  }

  loadFormations(): void {
    this.formationService.getAllFormations().subscribe({
      next: (data) => {
        this.formations = data;
      },
      error: (err) => console.error('Erreur chargement des formations', err)
    });
  }

  openModal(content: TemplateRef<any>, formation?: Formation): void {
    this.newFormation = formation ? { ...formation } : this.getEmptyFormation();
    this.formationModalRef = this.modalService.show(content, {
      class: 'modal-lg modal-dialog-centered'
    });
  }

  saveFormation(): void {
    this.formationService.createFormation(this.newFormation).subscribe({
      next: () => {
        this.loadFormations();
        this.formationModalRef?.hide();
      },
      error: (err) => console.error('Erreur création', err)
    });
  }

  deleteFormation(id: number): void {
    this.formationService.deleteFormation(id).subscribe({
      next: () => this.loadFormations(),
      error: (err) => console.error('Erreur suppression', err)
    });
  }

  acceptFormation(id: number): void {
    const formation = { ...this.formations.find(f => f.id === id)!, etat: 'accepté' };
    this.formationService.updateFormation(id, formation).subscribe({
      next: () => this.loadFormations(),
      error: (err) => console.error('Erreur acceptation', err)
    });
  }

  rejectFormation(id: number): void {
    const formation = { ...this.formations.find(f => f.id === id)!, etat: 'refusé' };
    this.formationService.updateFormation(id, formation).subscribe({
      next: () => this.loadFormations(),
      error: (err) => console.error('Erreur refus', err)
    });
  }

  searchFormations(): void {
    if (this.searchTerm) {
      this.formations = this.formations.filter(f =>
        f.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.loadFormations();
    }
  }

  // Gestion des cours
  selectFormation(formation: Formation): void {
    this.selectedFormation = formation;
    this.loadCours(formation.id!);
    this.loadQuizzes(formation.id!);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
  }

  uploadCours(): void {
    if (!this.selectedFormation || !this.selectedFile) return;

    this.coursService.uploadCours(
      this.selectedFile,
      this.selectedFormation.id!,
      this.newCours.titre
    ).subscribe({
      next: (cours) => {
        this.selectedFormation!.cours = [...(this.selectedFormation!.cours || []), cours];
        this.newCours = { titre: '' };
        this.selectedFile = null;
      },
      error: err => console.error('Erreur upload cours', err)
    });
  }

  loadCours(formationId: number): void {
    this.coursService.getCoursByFormation(formationId).subscribe({
      next: (cours) => {
        if (this.selectedFormation) {
          this.selectedFormation.cours = cours;
        }
      },
      error: (err) => console.error('Erreur chargement des cours', err)
    });
  }

  // Gestion Quizz


  // ...constructor et méthodes existantes...

  // --- Gestion Quizz ---
  loadQuizzes(formationId: number): void {
    this.quizService.getQuizsByFormation(formationId).subscribe({
      next: quizzes => {
        this.quizzes = quizzes;
      },
      error: err => console.error('Erreur chargement des quizzes', err)
    });
  }



  saveQuiz(): void {
    if (this.selectedQuiz) {
      this.quizService.updateQuiz(this.selectedQuiz.id!, this.newQuiz as Quiz).subscribe({
        next: () => {
          this.loadQuizzes(this.selectedFormation!.id!);
          this.quizModalRef?.hide();
        },
        error: err => console.error('Erreur mise à jour quiz', err)
      });
    } else {
      this.quizService.createQuiz(this.newQuiz as Quiz).subscribe({
        next: () => {
          this.loadQuizzes(this.selectedFormation!.id!);
          this.quizModalRef?.hide();
        },
        error: err => console.error('Erreur création quiz', err)
      });
    }
  }

  deleteQuiz(id: number): void {
    this.quizService.deleteQuiz(id).subscribe({
      next: () => this.loadQuizzes(this.selectedFormation!.id!),
      error: err => console.error('Erreur suppression quiz', err)
    });
  }

  // Questions
  editQuestion(question: QuizQuestion): void {
    this.newQuestion = { ...question };
    this.newOption = { option_text: '', is_correct: false, quizQuestionId: question.id! };
    this.loadOptions(question.id!);
  }

  saveQuestion(): void {
    if (this.newQuestion.id) {
      this.quizQuestionService.updateQuestion(this.newQuestion.id, this.newQuestion as QuizQuestion).subscribe({
        next: () => this.loadQuizzes(this.selectedFormation!.id!),
        error: err => console.error('Erreur mise à jour question', err)
      });
    } else {
      this.newQuestion.quizId = this.selectedQuiz!.id!;
      this.quizQuestionService.createQuestion(this.newQuestion as QuizQuestion).subscribe({
        next: () => this.loadQuizzes(this.selectedFormation!.id!),
        error: err => console.error('Erreur création question', err)
      });
    }
    this.newQuestion = { question_text: '', quizId: 0, options: [] };
  }

  deleteQuestion(id: number): void {
    this.quizQuestionService.deleteQuestion(id).subscribe({
      next: () => this.loadQuizzes(this.selectedFormation!.id!),
      error: err => console.error('Erreur suppression question', err)
    });
  }

  // Options
  editOption(option: QuizOption): void {
    this.newOption = { ...option };
  }

  saveOption(): void {
    if (this.newOption.id) {
      this.quizOptionService.updateOption(this.newOption.id, this.newOption as QuizOption).subscribe({
        next: () => this.loadOptions(this.newOption.quizQuestionId!),
        error: err => console.error('Erreur mise à jour option', err)
      });
    } else {
      this.newOption.quizQuestionId = this.newQuestion.id!;
      this.quizOptionService.createOption(this.newOption as QuizOption).subscribe({
        next: () => this.loadOptions(this.newOption.quizQuestionId!),
        error: err => console.error('Erreur création option', err)
      });
    }
    this.newOption = { option_text: '', is_correct: false, quizQuestionId: 0 };
  }

  deleteOption(id: number): void {
    this.quizOptionService.deleteOption(id).subscribe({
      next: () => this.loadOptions(this.newOption.quizQuestionId!),
      error: err => console.error('Erreur suppression option', err)
    });
  }

  loadOptions(questionId: number): void {
    this.quizOptionService.getOptionsByQuestion(questionId).subscribe({
      next: options => {
        if (this.newQuestion) this.newQuestion.options = options;
      },
      error: err => console.error('Erreur chargement options', err)
    });
  }
  startQuiz(quiz: Quiz) {
  this.selectedQuiz = quiz;
  this.currentQuestionIndex = 0;
  this.userAnswers = {};
  this.quizInProgress = true;
  this.loadQuestions(quiz.id!);
  this.quizModalRef = this.modalService.show(this.quizModal, { class: 'modal-lg modal-dialog-centered' });
}

loadQuestions(quizId: number) {
  this.quizQuestionService.getQuestionsByQuiz(quizId).subscribe({
    next: (questions) => {
      if (this.selectedQuiz) {
        this.selectedQuiz.questions = questions;
      }
    },
    error: (err) => console.error('Erreur chargement questions', err)
  });
}

selectOption(questionId: number, optionId: number) {
  this.userAnswers[questionId] = optionId;
}

nextQuestion() {
  if (this.currentQuestionIndex < (this.selectedQuiz?.questions?.length ?? 0) - 1) {
    this.currentQuestionIndex++;
  }
}

previousQuestion() {
  if (this.currentQuestionIndex > 0) {
    this.currentQuestionIndex--;
  }
}

  // Dans submitQuiz()
  submitQuiz() {
    if (!this.selectedQuiz || !this.currentUser) {
      alert("Quiz ou utilisateur non défini !");
      return;
    }

    const answers = Object.entries(this.userAnswers).map(([questionId, optionId]) => ({
      questionId: +questionId,
      optionId,
    }));

    this.quizService.submitQuiz(this.selectedQuiz.id!, this.currentUser.id, { answers }).subscribe({
      next: (res) => {
        alert(`Quiz terminé, score: ${res.score}`);
        this.quizInProgress = false;
        this.quizModalRef?.hide();
      },
      error: (err) => console.error('Erreur soumission quiz', err)
    });
  }

openQuizModal(quiz?: Quiz): void {
    if (quiz) {
      this.selectedQuiz = quiz;
      this.newQuiz = { ...quiz };
      this.loadQuizQuestions(quiz.id!);
    } else {
      this.selectedQuiz = null;
      this.newQuiz = { titre: '', formationId: this.selectedFormation!.id, questions: [] };
    }
    this.quizModalRef = this.modalService.show(this.quizModal, { class: 'modal-lg modal-dialog-centered' });
  }

  loadQuizQuestions(quizId: number) {
    this.quizQuestionService.getQuestionsByQuiz(quizId).subscribe({
      next: (questions) => {
        this.quizQuestions = questions;
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
      },
      error: (err) => console.error('Erreur chargement questions', err)
    });
  }

}
