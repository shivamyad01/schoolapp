/**
 * Typed Navigation Hook
 * Provides type-safe navigation for expo-router
 */

import type { RootStackParamList, TabParamList } from '@/types/navigation';
import { useLocalSearchParams, useRouter, useSegments } from 'expo-router';

export function useTypedNavigation() {
  const router = useRouter();
  const segments = useSegments();

  return {
    router,
    segments,

    // Typed navigation methods
    navigateTo<T extends keyof RootStackParamList>(
      route: T,
      params?: RootStackParamList[T]
    ) {
      if (params) {
         
        router.push({ pathname: route as any, params });
      } else {
         
        router.push(route as any);
      }
    },

    navigateToTab(tab: keyof TabParamList) {
       
      router.push(`/(tabs)/${tab}` as any);
    },

    goBack() {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/');
      }
    },

    replace<T extends keyof RootStackParamList>(
      route: T,
      params?: RootStackParamList[T]
    ) {
      if (params) {
         
        router.replace({ pathname: route as any, params });
      } else {
         
        router.replace(route as any);
      }
    },

    isCurrentRoute(route: string): boolean {
      return segments.join('/') === route.replace(/^\//, '');
    },
  };
}

export function useTypedParams<T = Record<string, string>>() {
   
  return useLocalSearchParams() as T;
}
