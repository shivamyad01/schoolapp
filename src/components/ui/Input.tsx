/**
 * Reusable Input Component
 */

import { borderRadius, colors, fontSize, fontWeight, spacing } from '@/config/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerStyle,
      secureTextEntry,
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPassword = secureTextEntry !== undefined;
    const showPassword = isPassword && isPasswordVisible;

    const inputContainerStyle = [
      styles.inputContainer,
      isFocused ? styles.inputFocused : undefined,
      error ? styles.inputError : undefined,
    ].filter(Boolean) as ViewStyle[];

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View style={inputContainerStyle}>
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={20}
              color={isFocused ? colors.primary[600] : colors.gray[400]}
              style={styles.leftIcon}
            />
          )}

          <TextInput
            ref={ref}
            style={[styles.input, leftIcon && styles.inputWithLeftIcon, style]}
            placeholderTextColor={colors.gray[400]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={isPassword && !showPassword}
            {...props}
          />

          {isPassword ? (
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.rightIconButton}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.gray[400]}
              />
            </TouchableOpacity>
          ) : (
            rightIcon && (
              <TouchableOpacity
                onPress={onRightIconPress}
                style={styles.rightIconButton}
                disabled={!onRightIconPress}
              >
                <Ionicons name={rightIcon} size={20} color={colors.gray[400]} />
              </TouchableOpacity>
            )
          )}
        </View>

        {(error || hint) && (
          <Text style={[styles.helperText, error && styles.errorText]}>
            {error || hint}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },

  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium as '500',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.border.light,
    paddingHorizontal: spacing.md,
  },

  inputFocused: {
    borderColor: colors.primary[500],
    backgroundColor: colors.background.primary,
  },

  inputError: {
    borderColor: colors.error,
    backgroundColor: '#FEF2F2',
  },

  leftIcon: {
    marginRight: spacing.sm,
  },

  input: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.text.primary,
    paddingVertical: spacing.md,
  },

  inputWithLeftIcon: {
    paddingLeft: 0,
  },

  rightIconButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },

  helperText: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },

  errorText: {
    color: colors.error,
  },
});
