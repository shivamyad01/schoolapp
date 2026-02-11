/**
 * Navigation Types for type-safe routing
 */

export type RootStackParamList = {
  index: undefined;
  login: undefined;
  '(tabs)': undefined;
  modal: undefined;
  'student-detail': { studentId: string };
  'course-detail': { courseId: string };
  'assignment-detail': { assignmentId: string };
  'exam-detail': { examId: string };
  'notification-detail': { notificationId: string };
  'message-detail': { messageId: string };
  'payment-detail': { paymentId: string };
  settings: undefined;
  'edit-profile': undefined;
};

export type TabParamList = {
  home: undefined;
  courses: undefined;
  calendar: undefined;
  profile: undefined;
  messages?: undefined;
  children?: undefined;
};

// Expo Router typed routes
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
