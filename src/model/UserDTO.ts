export interface UserDTO {
  id?: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  isConfirmed?: boolean;
  location?: string;
  roleId?: number;
  isBaned?: boolean;
  search?:string;
  role?:string;
}