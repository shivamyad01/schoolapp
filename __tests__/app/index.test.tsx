/**
 * App Index Screen Tests
 */

import Index from '@/app/index';
import React from 'react';
import { render } from '../utils/test-utils';

// Mock expo-router
jest.mock('expo-router', () => ({
  Redirect: jest.fn(({ href }) => null),
}));

describe('Index Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to login screen', () => {
    const { Redirect } = require('expo-router');
    
    render(<Index />);

    // Verify Redirect was called with correct href
    expect(Redirect).toHaveBeenCalledWith(
      expect.objectContaining({ href: '/login' }),
      undefined
    );
  });
});
