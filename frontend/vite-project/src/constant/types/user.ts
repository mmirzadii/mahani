export interface User {
  id: number;
  firstName: string;
  lastName: string;
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
