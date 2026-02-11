/**
 * Test Utilities
 * Custom render function with providers
 */

import { UserProvider } from '@/context/UserContext';
import { render, RenderOptions } from '@testing-library/react-native';
import React from 'react';

// Custom wrapper with all providers
function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}

// Custom render function that wraps components with providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react-native';

// Override render with custom render
export { customRender as render };
