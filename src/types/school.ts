/**
 * School Domain Types
 */

// Classes & Sections
export interface Class {
  id: string;
  name: string;
  section: string;
  grade: number;
  academicYear: string;
  teacherId: string;
  studentCount: number;
}

// Subjects
export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  credits: number;
  teacherId: string;
}

// Attendance
export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
  markedBy?: string;
  markedAt: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
  markedBy: string;
  markedAt: string;
}

export interface AttendanceSummary {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  percentage: number;
}

// Exams & Results
export interface Exam {
  id: string;
  name?: string;
  title?: string;
  courseId?: string;
  courseName?: string;
  subjectId?: string;
  subjectName?: string;
  classId?: string;
  date: string;
  startTime: string;
  endTime: string;
  venue?: string;
  room?: string;
  maxMarks?: number;
  totalMarks?: number;
  passingMarks?: number;
  status?: 'upcoming' | 'completed' | 'graded';
  type?: 'quiz' | 'midterm' | 'final' | 'practical';
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  marksObtained: number;
  grade: string;
  rank?: number;
  remarks?: string;
}

// Assignments
export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId?: string;
  courseName?: string;
  subjectId?: string;
  subjectName?: string;
  classId?: string;
  teacherId?: string;
  dueDate: string;
  maxMarks?: number;
  totalMarks?: number;
  obtainedMarks?: number;
  attachments?: string[];
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  submittedAt?: string;
  createdAt?: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  content?: string;
  attachments?: string[];
  marks?: number;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
}

// Courses
export interface CourseSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherId: string;
  teacherName: string;
  totalLessons?: number;
  completedLessons?: number;
  progress?: number;
  color: string;
  icon?: string;
  schedule?: CourseSchedule[];
}

// Timetable
export interface TimetableEntry {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  room: string;
}

// Events & Calendar
export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime?: string;
  endTime?: string;
  venue: string;
  type: 'exam' | 'holiday' | 'event' | 'meeting' | 'activity';
  color: string;
  isAllDay: boolean;
  attendees?: string[];
}

// Fees
export interface FeeStructure {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  academicYear: string;
  type: 'tuition' | 'transport' | 'library' | 'lab' | 'sports' | 'other';
}

export interface FeePayment {
  id: string;
  studentId: string;
  feeStructureId: string;
  amount: number;
  paidDate: string;
  paymentMethod: 'cash' | 'card' | 'bank_transfer' | 'upi';
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  receiptUrl?: string;
}

// Messages
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  recipientId: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: string;
  attachments?: string[];
}

// Child (for Parent view)
export interface Child {
  id: string;
  name: string;
  className: string;
  section: string;
  avatarUrl?: string;
  attendance: AttendanceSummary;
  recentGrades: ExamResult[];
  upcomingEvents: SchoolEvent[];
}
