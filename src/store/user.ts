/**
 * User Store - Extended user-related state
 */

import type { UserType } from '@/types';
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface UserState {
  userType: UserType | null;
  selectedChildId: string | null; // For parent viewing child's data
  preferences: UserPreferences;
}

interface UserPreferences {
  notifications: boolean;
  biometricLogin: boolean;
  darkMode: boolean;
  language: string;
}

interface UserContextType extends UserState {
  setUserType: (type: UserType | null) => void;
  setSelectedChild: (childId: string | null) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  notifications: true,
  biometricLogin: false,
  darkMode: false,
  language: 'en',
};

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  const setSelectedChild = useCallback((childId: string | null) => {
    setSelectedChildId(childId);
  }, []);

  const updatePreferences = useCallback((prefs: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  }, []);

  const value: UserContextType = {
    userType,
    selectedChildId,
    preferences,
    setUserType,
    setSelectedChild,
    updatePreferences,
  };

  return React.createElement(UserContext.Provider, { value }, children);
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
