import { Role } from "./role";
import { Service } from "./service";

export interface User {
  id: number;
  matricule?: string;
  nom_complet: string;
  matriculeWindows?: string;
  email?: string;
  role_id?: number;
  fonction?: string;
  responsable?: string;
  id_Service?: number;
  etats?: number;
  role?: Role;
  id_ServiceNavigation?: Service;
}
