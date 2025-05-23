import { User } from './user';

export interface DemandeConge {
  id?: number;
  dateDebut: Date;
  dateFin: Date;
  etat?: string;
  userId: number;
  user?: User;
}
