/**
 * Student Service
 */

import type {
    ApiResponse,
    Assignment,
    Course,
    Exam,
    ExamResult,
    PaginatedResponse,
    StudentUser,
} from '@/types';
import { apiClient } from './client';

export const studentService = {
  /**
   * Get student profile
   */
  async getProfile(studentId: string): Promise<ApiResponse<StudentUser>> {
    return apiClient.get(`/students/${studentId}`);
  },

  /**
   * Get student courses
   */
  async getCourses(studentId: string): Promise<ApiResponse<Course[]>> {
    return apiClient.get(`/students/${studentId}/courses`);
  },

  /**
   * Get student assignments
   */
  async getAssignments(
    studentId: string, 
    params?: { status?: string; subjectId?: string }
  ): Promise<ApiResponse<Assignment[]>> {
    return apiClient.get(`/students/${studentId}/assignments`, { params });
  },

  /**
   * Submit assignment
   */
  async submitAssignment(
    studentId: string,
    assignmentId: string,
    submission: { content?: string; attachments?: string[] }
  ): Promise<ApiResponse<{ submissionId: string }>> {
    return apiClient.post(`/students/${studentId}/assignments/${assignmentId}/submit`, submission);
  },

  /**
   * Get upcoming exams
   */
  async getUpcomingExams(studentId: string): Promise<ApiResponse<Exam[]>> {
    return apiClient.get(`/students/${studentId}/exams/upcoming`);
  },

  /**
   * Get exam results
   */
  async getExamResults(
    studentId: string,
    params?: { examId?: string; subjectId?: string }
  ): Promise<ApiResponse<ExamResult[]>> {
    return apiClient.get(`/students/${studentId}/results`, { params });
  },

  /**
   * Get timetable
   */
  async getTimetable(studentId: string): Promise<ApiResponse<unknown>> {
    return apiClient.get(`/students/${studentId}/timetable`);
  },

  /**
   * Get notifications
   */
  async getNotifications(
    studentId: string,
    params?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<unknown>> {
    const response = await apiClient.get<PaginatedResponse<unknown>>(
      `/students/${studentId}/notifications`, 
      { params }
    );
    return response.data as PaginatedResponse<unknown>;
  },
};
