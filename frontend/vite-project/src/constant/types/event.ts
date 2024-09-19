import { User } from './user.ts';

export interface Event {
  id: number;
  name: string;
  username: string;
  description: string;
  detailedDescription?: string;
  host?: User;
  assignments?: Assignment[];
}

export interface Group {
  event: number;
  id?: number;
  name: string;
  manager: User;
  members: User[];
  score?: number;
}

export interface Assignment {
  event: number;
  id?: number;
  name: string;
  description: string;
  content?: File | string | null;
  timestamp?: string;
}

export interface Question {
  id?: number;
  assignment: number;
  name: string;
  text: string;
  context?: File | null;
  maxScore?: number;
}

export interface Message {
  id?: number;
  assignment: number;
  sender: User;
  content: string;
  timeStamp?: string;
}

export interface SentAssignment {
  group: number;
  question: Question;
  assignment: Assignment;
  content?: File | string | null;
  score: number;
  maxScore: number;
}
