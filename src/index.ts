/**
 * Main Exports for src/
 * This file re-exports commonly used items for convenience
 */

// Types
export * from './types';

// Configuration
export { API_BASE_URL, API_TIMEOUT, APP_CONFIG, CACHE, DATE_FORMATS, FEATURES, PAGINATION } from './config/env';
export { borderRadius, colors, fontSize, fontWeight, shadows, spacing, theme } from './config/theme';

// Hooks
export { useAppState, useAppStateChange } from './hooks/useAppState';
export { useDebounce, useDebouncedCallback } from './hooks/useDebounce';
export { useDismissKeyboard, useKeyboard } from './hooks/useKeyboard';
export { useRefresh } from './hooks/useRefresh';
export { useTypedNavigation, useTypedParams } from './hooks/useTypedNavigation';

// Store
export { AuthProvider, useAuth } from './store/auth';
export { UserProvider, useUser } from './store/user';

// UI Components
export { Avatar, AvatarGroup } from './components/ui/Avatar';
export { Button } from './components/ui/Button';
export { Card, CardContent, CardFooter, CardHeader } from './components/ui/Card';
export { EmptyState, ErrorBoundary, ErrorView } from './components/ui/ErrorBoundary';
export { Input } from './components/ui/Input';
export { LoadingOverlay, LoadingScreen, LoadingSpinner, Skeleton } from './components/ui/Loading';

// Utilities
export * from './utils/formatting';
export * from './utils/helpers';
export { secureStorage, storage } from './utils/storage';
export * from './utils/validation';

