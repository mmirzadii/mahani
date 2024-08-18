import { Instructor, Student, User } from './user.ts';

export interface Event {
  name: string;
  username: string;
  description: string;
  host: Instructor;
  managers: 'string' | Instructor[];
  students: null | Student[];
  assignments: null | Assignment[];
}

export interface Assignment {
  name: string;
  description: string;
  questions: Question[];
  messages: Message[];
}

export interface Question {
  name: string;
  text: string;
  image: File | null;
}

export interface Message {
  user: User;
  content: string;
}

export interface SentAssignment {
  user: User;
  question: Question;
}
