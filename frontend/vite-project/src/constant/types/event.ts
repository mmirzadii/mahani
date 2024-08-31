import { User } from './user.ts';

export interface Event {
  name: string;
  username: string;
  description: string;
  host?: User;
  groups?: Group[];
  assignments?: Assignment[];
}

export interface Group {
  id: number;
  name: string;
  manager: User;
  members: User[];
}

export interface Assignment {
  id: number;
  name: string;
  description: string;
  content?: File | null;
  questions: Question[];
  messages: Message[];
  timestamp: string;
}

export interface Question {
  name: string;
  text: string;
  context?: File | null;
}

export interface Message {
  sender: User;
  content: string;
  timeStamp: string;
}

export interface SentAssignment {
  group: Group;
  question: Question;
  assignment: Assignment;
}
