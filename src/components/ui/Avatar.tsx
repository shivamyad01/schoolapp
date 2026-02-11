/**
 * Reusable Avatar Component
 */

import { colors, fontWeight } from '@/config/theme';
import { getInitials } from '@/utils/formatting';
import { Image } from 'expo-image';
import React from 'react';
import { ImageStyle, StyleSheet, Text, View } from 'react-native';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  source?: string | null;
  name?: string;
  size?: AvatarSize;
  badge?: 'online' | 'offline' | 'away';
}

const SIZES: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const FONT_SIZES: Record<AvatarSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 20,
  xl: 28,
};

const BADGE_SIZES: Record<AvatarSize, number> = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 14,
  xl: 18,
};

export function Avatar({ source, name = '', size = 'md', badge }: AvatarProps) {
  const dimension = SIZES[size];
  const initials = getInitials(name);
  const badgeSize = BADGE_SIZES[size];

  const containerStyle = {
    width: dimension,
    height: dimension,
    borderRadius: dimension / 2,
  };

  const textStyle = {
    fontSize: FONT_SIZES[size],
  };

  const imageStyle: ImageStyle = {
    width: dimension,
    height: dimension,
    borderRadius: dimension / 2,
  };

  const badgeStyle = {
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: colors.background.primary,
    backgroundColor:
      badge === 'online'
        ? colors.success
        : badge === 'away'
        ? colors.warning
        : colors.gray[400],
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {source ? (
        <Image
          source={{ uri: source }}
          style={imageStyle}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <View style={[styles.placeholder, containerStyle]}>
          <Text style={[styles.initials, textStyle]}>{initials}</Text>
        </View>
      )}
      {badge && <View style={[styles.badge, badgeStyle]} />}
    </View>
  );
}

interface AvatarGroupProps {
  avatars: { source?: string; name?: string }[];
  max?: number;
  size?: AvatarSize;
}

export function AvatarGroup({ avatars, max = 4, size = 'sm' }: AvatarGroupProps) {
  const dimension = SIZES[size];
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <View style={styles.groupContainer}>
      {visibleAvatars.map((avatar, index) => (
        <View
          key={index}
          style={[
            styles.groupItem,
            { marginLeft: index > 0 ? -dimension / 3 : 0, zIndex: max - index },
          ]}
        >
          <Avatar source={avatar.source} name={avatar.name} size={size} />
        </View>
      ))}
      {remainingCount > 0 && (
        <View
          style={[
            styles.remainingCount,
            {
              width: dimension,
              height: dimension,
              borderRadius: dimension / 2,
              marginLeft: -dimension / 3,
            },
          ]}
        >
          <Text
            style={[styles.remainingText, { fontSize: FONT_SIZES[size] }]}
          >
            +{remainingCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  placeholder: {
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },

  initials: {
    color: colors.primary[700],
    fontWeight: fontWeight.semibold as '600',
  },

  badge: {
    position: 'absolute',
  },

  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  groupItem: {
    borderWidth: 2,
    borderColor: colors.background.primary,
    borderRadius: 999,
  },

  remainingCount: {
    backgroundColor: colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background.primary,
  },

  remainingText: {
    color: colors.text.secondary,
    fontWeight: fontWeight.medium as '500',
  },
});
