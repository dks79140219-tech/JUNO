export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'record' | 'guide' | 'rule' | 'admission' | 'about' | 'notice' | 'event';
  date: string;
  imageUrl?: string;
  comments?: Comment[];
}

export interface Inquiry {
  id: string;
  title: string;
  content: string;
  date: string;
  answer?: string;
  answeredDate?: string;
  isAnswered: boolean;
}

export interface SiteSettings {
  siteName: string;
  primaryColor: string;
  accentColor: string;
  description: string;
}
