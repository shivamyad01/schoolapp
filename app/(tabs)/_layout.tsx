import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} colors={colors} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="school"
        options={{
          title: 'School',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="graduationcap.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

function CustomTabBar({ state, descriptors, navigation, insets, colors }: BottomTabBarProps & {
  colors: (typeof Colors)['light'];
}) {
  return (
    <View
      style={[
        styles.tabBarOuter,
        {
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
      pointerEvents="box-none">
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: colors.background,
            borderColor: colors.icon,
          },
        ]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const tintColor = isFocused ? colors.tint : colors.tabIconDefault;

          const renderedLabel = (() => {
            if (typeof label === 'string') {
              return (
                <Text style={[styles.label, { color: tintColor }]} numberOfLines={1}>
                  {label}
                </Text>
              );
            }

            if (typeof label === 'function') {
              return label({
                focused: isFocused,
                color: tintColor,
                position: 'below-icon' as any,
                children: options.title ?? route.name,
              });
            }

            return label;
          })();

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              hitSlop={10}>
              <View style={styles.tabItemInner}>
                {typeof options.tabBarIcon === 'function'
                  ? options.tabBarIcon({
                      focused: isFocused,
                      color: tintColor,
                      size: 24,
                    })
                  : null}
                <View style={styles.labelWrapper}>
                  {renderedLabel}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarOuter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
  },
  tabItemInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  labelWrapper: {
    minHeight: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
