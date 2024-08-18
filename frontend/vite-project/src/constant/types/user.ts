export interface User {
  firstName: string;
  lastName: string;
  province: string;
  city: string;
  username: string;
  phone_number: string;
  password: string;
}

export interface Student extends User {
  grade?: string;
}

export interface Instructor extends User {}
