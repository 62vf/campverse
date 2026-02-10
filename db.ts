
import { User, Role, LostFoundItem, Notice, MarketItem, Feedback } from './types';

// Mock storage keys
const KEYS = {
  USERS: 'cv_users',
  LOST_FOUND: 'cv_lost_found',
  NOTICES: 'cv_notices',
  MARKET: 'cv_market',
  FEEDBACK: 'cv_feedback',
  SESSION: 'cv_session'
};

// Initial Sample Data
const initialUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@campverse.edu', role: Role.ADMIN, avatar: 'https://picsum.photos/seed/admin/200' },
  { id: '2', name: 'Prof. Sarah Jenkins', email: 'sarah@campverse.edu', role: Role.FACULTY, department: 'Computer Science', avatar: 'https://picsum.photos/seed/sarah/200' },
  { id: '3', name: 'John Doe', email: 'john@campverse.edu', role: Role.STUDENT, studentId: 'CS101', avatar: 'https://picsum.photos/seed/john/200' }
];

const initialNotices: Notice[] = [
  { 
    id: 'n1', 
    title: 'Mid-term Exams Schedule', 
    content: 'The mid-term exams for all departments will commence from next Monday.', 
    category: 'Academic', 
    postedBy: 'Admin', 
    date: new Date().toISOString(), 
    expiryDate: '2025-12-31', 
    priority: 'High' 
  },
  { 
    id: 'n2', 
    title: 'Hackathon 2025 Registration', 
    content: 'Register your teams for the upcoming annual hackathon.', 
    category: 'Event', 
    postedBy: 'Faculty', 
    date: new Date().toISOString(), 
    expiryDate: '2025-05-15', 
    priority: 'Medium' 
  }
];

// Initialize DB if empty
const initDB = () => {
  if (!localStorage.getItem(KEYS.USERS)) localStorage.setItem(KEYS.USERS, JSON.stringify(initialUsers));
  if (!localStorage.getItem(KEYS.NOTICES)) localStorage.setItem(KEYS.NOTICES, JSON.stringify(initialNotices));
  if (!localStorage.getItem(KEYS.LOST_FOUND)) localStorage.setItem(KEYS.LOST_FOUND, JSON.stringify([]));
  if (!localStorage.getItem(KEYS.MARKET)) localStorage.setItem(KEYS.MARKET, JSON.stringify([]));
  if (!localStorage.getItem(KEYS.FEEDBACK)) localStorage.setItem(KEYS.FEEDBACK, JSON.stringify([]));
};

initDB();

export const db = {
  // Generic Read/Write
  get: <T,>(key: string): T[] => JSON.parse(localStorage.getItem(key) || '[]'),
  set: <T,>(key: string, data: T[]) => localStorage.setItem(key, JSON.stringify(data)),
  
  // Auth
  getCurrentUser: (): User | null => JSON.parse(localStorage.getItem(KEYS.SESSION) || 'null'),
  setCurrentUser: (user: User | null) => localStorage.setItem(KEYS.SESSION, JSON.stringify(user)),

  // Items
  addItem: <T extends { id: string },>(key: string, item: T) => {
    const items = db.get<T>(key);
    items.push(item);
    db.set(key, items);
  },
  
  updateItem: <T extends { id: string },>(key: string, id: string, updates: Partial<T>) => {
    const items = db.get<T>(key);
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      db.set(key, items);
      return true;
    }
    return false;
  }
};

export { KEYS };
