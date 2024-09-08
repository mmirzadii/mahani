export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  province: string;
  city: string;
  school: string;
  birthDate: string;
  phoneNumber?: string;
  lastLogin?: string;
  isActive?: boolean;
  isStaff?: boolean;
  isSuperuser?: boolean;
  dateJoined?: string;
}
