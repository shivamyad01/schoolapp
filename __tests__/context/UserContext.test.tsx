/**
 * UserContext Tests
 */

import { UserProvider, useUser } from '@/context/UserContext';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Test component that uses the context
function TestComponent() {
  const { userType, setUserType } = useUser();

  return (
    <>
      <Text testID="user-type">{userType}</Text>
      <TouchableOpacity
        testID="set-parent-btn"
        onPress={() => setUserType('parent')}
      >
        <Text>Set Parent</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="set-student-btn"
        onPress={() => setUserType('student')}
      >
        <Text>Set Student</Text>
      </TouchableOpacity>
    </>
  );
}

describe('UserContext', () => {
  it('provides default user type as student', () => {
    const { getByTestId } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(getByTestId('user-type')).toHaveTextContent('student');
  });

  it('allows changing user type to parent', () => {
    const { getByTestId } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    fireEvent.press(getByTestId('set-parent-btn'));
    expect(getByTestId('user-type')).toHaveTextContent('parent');
  });

  it('allows changing user type back to student', () => {
    const { getByTestId } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    // Set to parent first
    fireEvent.press(getByTestId('set-parent-btn'));
    expect(getByTestId('user-type')).toHaveTextContent('parent');

    // Set back to student
    fireEvent.press(getByTestId('set-student-btn'));
    expect(getByTestId('user-type')).toHaveTextContent('student');
  });

  it('throws error when useUser is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useUser must be used within a UserProvider');

    consoleSpy.mockRestore();
  });
});
