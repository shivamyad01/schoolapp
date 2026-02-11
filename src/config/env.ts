/**
 * Environment Configuration
 * 
 * In production, use environment variables via expo-constants
 * For local development, these defaults are used
 */

import Constants from 'expo-constants';

// API Configuration
export const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl || 'https://api.schoolapp.example.com/v1';
export const API_TIMEOUT = 30000; // 30 seconds

// Feature Flags
export const FEATURES = {
  enableNotifications: true,
  enableBiometricAuth: true,
  enableOfflineMode: true,
  enableAnalytics: __DEV__ ? false : true,
  enableCrashReporting: __DEV__ ? false : true,
};

// App Configuration
export const APP_CONFIG = {
  appName: 'School Management',
  version: Constants.expoConfig?.version || '1.0.0',
  buildNumber: Constants.expoConfig?.ios?.buildNumber || Constants.expoConfig?.android?.versionCode || '1',
  supportEmail: 'support@schoolapp.example.com',
  privacyPolicyUrl: 'https://schoolapp.example.com/privacy',
  termsOfServiceUrl: 'https://schoolapp.example.com/terms',
};

// Pagination Defaults
export const PAGINATION = {
  defaultPageSize: 20,
  maxPageSize: 100,
};

// Cache Configuration
export const CACHE = {
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  userDataTTL: 30 * 60 * 1000, // 30 minutes
  staticDataTTL: 24 * 60 * 60 * 1000, // 24 hours
};

// Date/Time Formats
export const DATE_FORMATS = {
  display: 'MMM dd, yyyy',
  displayWithTime: 'MMM dd, yyyy h:mm a',
  api: 'yyyy-MM-dd',
  time: 'h:mm a',
  time24: 'HH:mm',
};
