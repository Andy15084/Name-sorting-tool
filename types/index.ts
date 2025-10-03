export interface ContactInfo {
  type: 'email' | 'phone';
  value: string;
}

export interface SocialMedia {
  platform: string;
  url: string;
}

export interface Comment {
  id: string;
  text: string;
  timestamp: string;
}

export interface Person {
  id: string;
  name: string;
  dateOfBirth: string;
  whenWeMet: string;
  school?: string;
  professionText?: string;
  professions: string[];
  contacts: ContactInfo[];
  socialMedia: SocialMedia[];
  comments: Comment[];
}

export type SearchType = 'name' | 'dateOfBirth' | 'school' | 'profession';

export interface SearchFilters {
  type: SearchType;
  value: string;
}

