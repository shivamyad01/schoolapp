/**
 * Common Types used across the app
 */

export type Status = 'idle' | 'loading' | 'success' | 'error';

export type UserType = 'student' | 'parent';

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface FileUpload {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface TimeSlot {
  startTime: string; // HH:mm format
  endTime: string;
}

export interface DaySchedule {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  slots: TimeSlot[];
}
