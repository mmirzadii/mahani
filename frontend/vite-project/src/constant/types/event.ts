import { User } from './user.ts';

export interface Event {
  id: number;
  name: string;
  username: string;
  description: string;
  host?: User;
  assignments?: Assignment[];
}

export interface Group {
  event: number;
  id: number;
  name: string;
  manager: User;
  members: User[];
}

export interface Assignment {
  event: number;
  id: number;
  name: string;
  description: string;
  content?: File | null;
  questions: Question[];
  messages: Message[];
  timestamp: string;
}

export interface Question {
  assignment: number;
  name: string;
  text: string;
  context?: File | null;
}

export interface Message {
  assignment: number;
  sender: User;
  content: string;
  timeStamp: string;
}

export interface SentAssignment {
  group: number;
  question: Question;
  assignment: Assignment;
  content?: File | null;
  score: number;
  maxScore: number;
}
