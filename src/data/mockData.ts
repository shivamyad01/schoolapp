/**
 * Mock Data for School Management App
 * Use this during development while API is not ready
 */

import type { Assignment, Attendance, Course, Exam, Student, User } from '@/types';

export const mockStudentProfile: Student = {
  id: 'student_1',
  role: 'student',
  rollNumber: 'STU2024001',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@school.edu',
  phone: '+1234567890',
  dateOfBirth: '2010-05-15',
  gender: 'male',
  avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=John',
  classId: 'class_10a',
  className: '10-A',
  section: 'A',
  grade: '10',
  parentIds: ['parent_1'],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

export const mockCourses: Course[] = [
  {
    id: 'course_1',
    name: 'Mathematics',
    code: 'MATH101',
    description: 'Advanced mathematics including algebra, geometry, and calculus basics',
    teacherId: 'teacher_1',
    teacherName: 'Dr. Smith',
    schedule: [
      { day: 'monday', startTime: '09:00', endTime: '10:00', room: 'Room 101' },
      { day: 'wednesday', startTime: '09:00', endTime: '10:00', room: 'Room 101' },
      { day: 'friday', startTime: '09:00', endTime: '10:00', room: 'Room 101' },
    ],
    color: '#3B82F6',
  },
  {
    id: 'course_2',
    name: 'Physics',
    code: 'PHY101',
    description: 'Introduction to mechanics, thermodynamics, and electromagnetism',
    teacherId: 'teacher_2',
    teacherName: 'Prof. Johnson',
    schedule: [
      { day: 'tuesday', startTime: '10:00', endTime: '11:00', room: 'Lab 1' },
      { day: 'thursday', startTime: '10:00', endTime: '11:00', room: 'Lab 1' },
    ],
    color: '#8B5CF6',
  },
  {
    id: 'course_3',
    name: 'English',
    code: 'ENG101',
    description: 'Literature, composition, and grammar',
    teacherId: 'teacher_3',
    teacherName: 'Mrs. Williams',
    schedule: [
      { day: 'monday', startTime: '11:00', endTime: '12:00', room: 'Room 203' },
      { day: 'wednesday', startTime: '11:00', endTime: '12:00', room: 'Room 203' },
    ],
    color: '#10B981',
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: 'assignment_1',
    courseId: 'course_1',
    courseName: 'Mathematics',
    title: 'Quadratic Equations Practice Set',
    description: 'Solve problems 1-20 from Chapter 5',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    totalMarks: 50,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'assignment_2',
    courseId: 'course_2',
    courseName: 'Physics',
    title: 'Lab Report: Pendulum Experiment',
    description: 'Complete the lab report with observations and calculations',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    totalMarks: 100,
    createdAt: '2024-01-14T00:00:00Z',
  },
  {
    id: 'assignment_3',
    courseId: 'course_3',
    courseName: 'English',
    title: 'Essay: The Great Gatsby Analysis',
    description: 'Write a 1000-word essay analyzing the themes in The Great Gatsby',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'submitted',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    totalMarks: 100,
    obtainedMarks: 85,
    createdAt: '2024-01-10T00:00:00Z',
  },
];

export const mockExams: Exam[] = [
  {
    id: 'exam_1',
    courseId: 'course_1',
    courseName: 'Mathematics',
    title: 'Mid-Term Examination',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '09:00',
    endTime: '12:00',
    room: 'Examination Hall A',
    totalMarks: 100,
    status: 'upcoming',
  },
  {
    id: 'exam_2',
    courseId: 'course_2',
    courseName: 'Physics',
    title: 'Unit Test 2',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '10:00',
    endTime: '11:30',
    room: 'Lab 1',
    totalMarks: 50,
    status: 'upcoming',
  },
];

export const mockAttendance: Attendance[] = [
  {
    id: 'att_1',
    studentId: 'student_1',
    courseId: 'course_1',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    markedAt: new Date().toISOString(),
  },
  {
    id: 'att_2',
    studentId: 'student_1',
    courseId: 'course_2',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    markedAt: new Date().toISOString(),
  },
];

export const mockAttendanceSummary = {
  totalDays: 100,
  presentDays: 92,
  absentDays: 5,
  lateDays: 3,
  percentage: 92,
};

export const mockUser: User = {
  id: 'user_1',
  email: 'john.doe@school.edu',
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=John',
  role: 'student',
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};
