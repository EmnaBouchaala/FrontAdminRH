import { Service } from "./service";
import { User } from "./user";

export interface Demande {
  id: number;
  datecreation: Date;
  description?: string;
  id_user?: number;
  id_service?: number;
  id_userNavigation?: User;
  id_serviceNavigation?: Service;
  etat?: string;
  typeDemande?: string;
}
