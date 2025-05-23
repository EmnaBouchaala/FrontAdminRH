import { Matiere } from "./matiere";
import { TypeFourniture } from "./type-fourniture";

export interface Fourniture {
  id: number;
  nom?: string;
  quantite?: number;
  date?: Date;
  type?: string;
  etats?: string;
  TypeFournitureId?: number;
  MatiereId?: number;
  type_Fourniture?: TypeFourniture;
  matiere?: Matiere;
}
