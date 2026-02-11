/**
 * App State Hook
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface UseAppStateReturn {
  appState: AppStateStatus;
  isActive: boolean;
  isBackground: boolean;
}

export function useAppState(): UseAppStateReturn {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  const appStateRef = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      appStateRef.current = nextAppState;
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    appState,
    isActive: appState === 'active',
    isBackground: appState === 'background',
  };
}

/**
 * Hook to run callback when app becomes active/background
 */
export function useAppStateChange(
  onActive?: () => void,
  onBackground?: () => void
) {
  const previousState = useRef<AppStateStatus>(AppState.currentState);

  const handleStateChange = useCallback((nextAppState: AppStateStatus) => {
    if (previousState.current !== 'active' && nextAppState === 'active') {
      onActive?.();
    }
    if (previousState.current === 'active' && nextAppState.match(/inactive|background/)) {
      onBackground?.();
    }
    previousState.current = nextAppState;
  }, [onActive, onBackground]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleStateChange);
    return () => subscription.remove();
  }, [handleStateChange]);
}
