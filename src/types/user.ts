export interface User {
  id: string;
  firstName: string;
  lastName?: string | null;
  nik: string;
  password?: string;
  position: string;
  
  workspaces?: any[]; // Bisa diganti dengan interface Workspace jika sudah ada
  reports?: any[];    // Bisa diganti dengan interface Report jika sudah ada
  
  deletedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}