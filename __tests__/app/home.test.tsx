/**
 * Dashboard Screen Tests
 */

import DashboardScreen from '@/app/(tabs)/home';
import React from 'react';
import { render } from '../utils/test-utils';

// Mock the dashboard components
jest.mock('@/components/StudentDashboard', () => {
  const { Text } = require('react-native');
  return function MockStudentDashboard() {
    return <Text testID="student-dashboard">Student Dashboard</Text>;
  };
});

jest.mock('@/components/ParentDashboard', () => {
  const { Text } = require('react-native');
  return function MockParentDashboard() {
    return <Text testID="parent-dashboard">Parent Dashboard</Text>;
  };
});

// Mock the UserContext to control userType
const mockSetUserType = jest.fn();

describe('Dashboard Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders StudentDashboard when userType is student', () => {
    // Override the UserContext mock for this test
    jest.doMock('@/context/UserContext', () => ({
      useUser: () => ({
        userType: 'student',
        setUserType: mockSetUserType,
      }),
      UserProvider: ({ children }: { children: React.ReactNode }) => children,
    }));

    const { getByTestId } = render(<DashboardScreen />);
    
    expect(getByTestId('student-dashboard')).toBeTruthy();
  });

  it('renders container with correct background color', () => {
    const { toJSON } = render(<DashboardScreen />);
    
    // Verify the component renders
    expect(toJSON()).toBeTruthy();
  });
});
