/**
 * Reusable Card Component
 */

import { borderRadius, colors, shadows, spacing } from '@/config/theme';
import React, { ReactNode } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from 'react-native';

type CardVariant = 'elevated' | 'outlined' | 'filled';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
  padding?: keyof typeof spacing | number;
  onPress?: TouchableOpacityProps['onPress'];
}

export function Card({
  children,
  variant = 'elevated',
  style,
  padding = 'lg',
  onPress,
}: CardProps) {
  const paddingValue = typeof padding === 'number' ? padding : spacing[padding];

  const cardStyle = [
    styles.base,
    variant === 'elevated' ? styles.elevated : undefined,
    variant === 'outlined' ? styles.outlined : undefined,
    variant === 'filled' ? styles.filled : undefined,
    { padding: paddingValue },
    style,
  ].filter(Boolean) as ViewStyle[];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

interface CardHeaderProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

interface CardContentProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function CardContent({ children, style }: CardContentProps) {
  return <View style={[styles.content, style]}>{children}</View>;
}

interface CardFooterProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function CardFooter({ children, style }: CardFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.xl,
    backgroundColor: colors.background.primary,
  },

  elevated: {
    ...shadows.md,
  },

  outlined: {
    borderWidth: 1,
    borderColor: colors.border.default,
  },

  filled: {
    backgroundColor: colors.background.secondary,
  },

  header: {
    marginBottom: spacing.md,
  },

  content: {
    // Default content styling
  },

  footer: {
    marginTop: spacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
});
