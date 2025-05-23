import { Fourniture } from "./fourniture";

export interface TypeFourniture {
  id: number;
  nom: string;
  qte?: string;
  fournitures?: Fourniture[];
}
