/**
 * Loading Components
 */

import { colors, fontSize, spacing } from '@/config/theme';
import React from 'react';
import type { DimensionValue } from 'react-native';
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    View
} from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export function LoadingSpinner({
  size = 'large',
  color = colors.primary[600],
}: LoadingSpinnerProps) {
  return <ActivityIndicator size={size} color={color} />;
}

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export function LoadingOverlay({ visible, message }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlayContainer}>
        <View style={styles.overlayContent}>
          <ActivityIndicator size="large" color={colors.primary[600]} />
          {message && <Text style={styles.overlayMessage}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
}

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <View style={styles.screenContainer}>
      <ActivityIndicator size="large" color={colors.primary[600]} />
      <Text style={styles.screenMessage}>{message}</Text>
    </View>
  );
}

interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
}

export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius = 8,
}: SkeletonProps) {
  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlayContent: {
    backgroundColor: colors.background.primary,
    padding: spacing['3xl'],
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 150,
  },

  overlayMessage: {
    marginTop: spacing.lg,
    fontSize: fontSize.base,
    color: colors.text.secondary,
  },

  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },

  screenMessage: {
    marginTop: spacing.lg,
    fontSize: fontSize.base,
    color: colors.text.secondary,
  },

  skeleton: {
    backgroundColor: colors.gray[200],
    overflow: 'hidden',
  },
});
