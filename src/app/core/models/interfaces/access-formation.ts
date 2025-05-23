import { Service } from "./service";
import { User } from "./user";

export interface AccesFormation {
  id: number;
  id_user: number;
  id_service: number;
  dateDemande?: Date;
  etat?: string;
  id_serviceNavigation?: Service;
  id_userNavigation?: User;
}
