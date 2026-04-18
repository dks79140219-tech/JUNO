import { Post, SiteSettings, Inquiry } from './types';

const STORAGE_KEY_POSTS = 'junjeong_posts';
const STORAGE_KEY_SETTINGS = 'junjeong_settings';
const STORAGE_KEY_INQUIRIES = 'junjeong_inquiries';

const defaultPosts: Post[] = [];

const defaultSettings: SiteSettings = {
  siteName: '준정고등학교',
  primaryColor: '#002c5f',
  accentColor: '#fcc419',
  description: '준정고등학교의 활동을 기록하고 소식을 전하는 공간입니다.'
};

export const storage = {
  getPosts: (): Post[] => {
    const stored = localStorage.getItem(STORAGE_KEY_POSTS);
    return stored ? JSON.parse(stored) : defaultPosts;
  },
  savePosts: (posts: Post[]) => {
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
  },
  getSettings: (): SiteSettings => {
    const stored = localStorage.getItem(STORAGE_KEY_SETTINGS);
    return stored ? JSON.parse(stored) : defaultSettings;
  },
  saveSettings: (settings: SiteSettings) => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  },
  getInquiries: (): Inquiry[] => {
    const stored = localStorage.getItem(STORAGE_KEY_INQUIRIES);
    return stored ? JSON.parse(stored) : [];
  },
  saveInquiries: (inquiries: Inquiry[]) => {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
  }
};
