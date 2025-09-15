import { useState, useCallback } from 'react';
import { CacheNode, CacheOperation, CacheStats } from '../types/cache';

export const useLRUCache = (capacity: number = 4) => {
  const [cache, setCache] = useState<Map<string, CacheNode>>(new Map());
  const [order, setOrder] = useState<string[]>([]);
  const [operations, setOperations] = useState<CacheOperation[]>([]);
  const [stats, setStats] = useState<CacheStats>({
    hits: 0,
    misses: 0,
    evictions: 0,
    operations: 0
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);
  
  const runSequence = useCallback(async (steps: Array<{ type: 'get' | 'put'; key: string; value?: string }>) => {
    for (const step of steps) {
      if (step.type === 'get') {
        await get(step.key);
      } else {
        await put(step.key, step.value!);
      }
      // Small delay between operations for better visualization
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }, []);

  const updateStats = useCallback((result: 'hit' | 'miss' | 'eviction') => {
    setStats(prev => ({
      ...prev,
      [result === 'hit' ? 'hits' : result === 'miss' ? 'misses' : 'evictions']: 
        prev[result === 'hit' ? 'hits' : result === 'miss' ? 'misses' : 'evictions'] + 1,
      operations: prev.operations + 1
    }));
  }, []);

  const addOperation = useCallback((operation: Omit<CacheOperation, 'id' | 'timestamp'>) => {
    const newOperation: CacheOperation = {
      ...operation,
      id: generateId(),
      timestamp: Date.now()
    };
    setOperations(prev => [newOperation, ...prev.slice(0, 9)]);
    updateStats(operation.result);
  }, [updateStats]);

  const get = useCallback(async (key: string): Promise<string | null> => {
    setIsAnimating(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const node = cache.get(key);
    
    if (node) {
      // Cache hit - move to front
      setOrder(prev => [key, ...prev.filter(k => k !== key)]);
      addOperation({ type: 'get', key, result: 'hit' });
      setIsAnimating(false);
      return node.value;
    } else {
      // Cache miss
      addOperation({ type: 'get', key, result: 'miss' });
      setIsAnimating(false);
      return null;
    }
  }, [cache, addOperation]);

  const put = useCallback(async (key: string, value: string) => {
    setIsAnimating(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newNode: CacheNode = {
      key,
      value,
      timestamp: Date.now(),
      id: generateId()
    };

    if (cache.has(key)) {
      // Update existing key - move to front
      setCache(prev => new Map(prev).set(key, newNode));
      setOrder(prev => [key, ...prev.filter(k => k !== key)]);
      addOperation({ type: 'put', key, value, result: 'hit' });
    } else {
      // New key
      const newCache = new Map(cache);
      let newOrder = [key, ...order];
      let result: 'miss' | 'eviction' = 'miss';

      if (newCache.size >= capacity) {
        // Need to evict LRU item
        const lruKey = order[order.length - 1];
        newCache.delete(lruKey);
        newOrder = newOrder.filter(k => k !== lruKey);
        result = 'eviction';
      }

      newCache.set(key, newNode);
      setCache(newCache);
      setOrder(newOrder);
      addOperation({ type: 'put', key, value, result });
    }
    
    setIsAnimating(false);
  }, [cache, order, capacity, addOperation]);

  const clear = useCallback(() => {
    setCache(new Map());
    setOrder([]);
    setOperations([]);
    setStats({ hits: 0, misses: 0, evictions: 0, operations: 0 });
  }, []);

  const getCacheArray = useCallback((): CacheNode[] => {
    return order.map(key => cache.get(key)!).filter(Boolean);
  }, [cache, order]);

  return {
    cache: getCacheArray(),
    operations,
    stats,
    isAnimating,
    capacity,
    get,
    put,
    clear,
    runSequence
  };
};