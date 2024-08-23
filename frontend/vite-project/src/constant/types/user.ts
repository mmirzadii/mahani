export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
}

export interface Student extends User {
  province: string;
  city: string;
  birthDate: string;
  phoneNumber: string;
  grade?: string | null;
}

export interface Instructor extends User {
  province: string;
  city: string;
  phoneNumber: string;
}
