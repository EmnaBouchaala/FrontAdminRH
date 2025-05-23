import { Cours } from "./Cours";

export interface Formation {
  id?: number;
  titre: string;
  description?: string;
  etat?: string;
  type: string;
  cours?: Cours[];
}
