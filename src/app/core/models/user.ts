import { Role } from './role';

export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  // roles?: Role[];
  role?: string[];
}
