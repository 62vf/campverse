
export enum Role {
  STUDENT = 'Student',
  FACULTY = 'Faculty',
  ADMIN = 'Admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  studentId?: string;
  department?: string;
  avatar?: string;
}

export interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  type: 'Lost' | 'Found';
  category: string;
  location: string;
  date: string;
  imageUrl?: string;
  status: 'Open' | 'Resolved';
  postedBy: string;
  contact: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'Event' | 'Academic' | 'Administrative' | 'Emergency';
  postedBy: string;
  date: string;
  expiryDate: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface MarketItem {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl?: string;
  sellerId: string;
  sellerName: string;
  status: 'Available' | 'Sold';
  date: string;
}

export interface Feedback {
  id: string;
  userId: string;
  category: 'Infrastructure' | 'Canteen' | 'Academics' | 'Sports' | 'Other';
  rating: number;
  comment: string;
  date: string;
  isAnonymous: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
