export interface CacheNode {
  key: string;
  value: string;
  timestamp: number;
  id: string;
}

export interface CacheOperation {
  type: 'get' | 'put';
  key: string;
  value?: string;
  result: 'hit' | 'miss' | 'eviction';
  timestamp: number;
  id: string;
}

export interface CacheStats {
  hits: number;
  misses: number;
  evictions: number;
  operations: number;
}