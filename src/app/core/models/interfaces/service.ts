import { AccesFormation } from "./access-formation";
import { User } from "./user";

export interface Service {
  id: number;
  nom?: string;
  description?: string;
  date?: Date;
  accesFormation?: AccesFormation[];
  user?: User[];
}
