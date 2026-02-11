/**
 * Attendance Service
 */

import type {
    ApiResponse,
    AttendanceRecord,
    AttendanceSummary,
} from '@/types';
import { apiClient } from './client';

export const attendanceService = {
  /**
   * Get attendance summary for a student
   */
  async getSummary(
    studentId: string,
    params?: { startDate?: string; endDate?: string }
  ): Promise<ApiResponse<AttendanceSummary>> {
    return apiClient.get(`/attendance/${studentId}/summary`, { params });
  },

  /**
   * Get attendance records
   */
  async getRecords(
    studentId: string,
    params?: { startDate?: string; endDate?: string; status?: string }
  ): Promise<ApiResponse<AttendanceRecord[]>> {
    return apiClient.get(`/attendance/${studentId}/records`, { params });
  },

  /**
   * Mark attendance (for teachers)
   */
  async markAttendance(
    classId: string,
    date: string,
    records: { studentId: string; status: string; remarks?: string }[]
  ): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.post(`/attendance/mark`, { classId, date, records });
  },

  /**
   * Request leave/absence
   */
  async requestLeave(
    studentId: string,
    data: {
      startDate: string;
      endDate: string;
      reason: string;
      documents?: string[];
    }
  ): Promise<ApiResponse<{ requestId: string }>> {
    return apiClient.post(`/attendance/${studentId}/leave-request`, data);
  },

  /**
   * Get today's attendance status
   */
  async getTodayStatus(studentId: string): Promise<ApiResponse<AttendanceRecord | null>> {
    return apiClient.get(`/attendance/${studentId}/today`);
  },
};
