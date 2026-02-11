/**
 * Pull to Refresh Hook
 */

import { useCallback, useState } from 'react';

interface UseRefreshOptions {
  onRefresh: () => Promise<void>;
}

interface UseRefreshReturn {
  refreshing: boolean;
  onRefresh: () => void;
}

export function useRefresh({ onRefresh }: UseRefreshOptions): UseRefreshReturn {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  return {
    refreshing,
    onRefresh: handleRefresh,
  };
}
