/**
 * Authentication Types
 */

export type UserRole = 'student' | 'parent' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
  avatar?: string; // Alias for backwards compatibility
  phone?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StudentUser extends User {
  role: 'student';
  classId: string;
  className: string;
  section: string;
  rollNumber: string;
  grade?: string;
  parentIds: string[];
  enrollmentDate?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
}

// Alias for convenience
export type Student = StudentUser;

export interface ParentUser extends User {
  role: 'parent';
  childrenIds: string[];
  occupation?: string;
  address?: Address;
}

export interface TeacherUser extends User {
  role: 'teacher';
  employeeId: string;
  department: string;
  subjects: string[];
  classIds: string[];
  qualification: string;
  joiningDate: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  userType: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  tokens?: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string | null;
}
