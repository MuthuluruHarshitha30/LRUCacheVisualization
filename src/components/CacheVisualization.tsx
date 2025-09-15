import React from 'react';
import { CacheNode as CacheNodeComponent } from './CacheNode';
import { CacheNode } from '../types/cache';
import { ArrowRight, Trash2, Crown, Clock } from 'lucide-react';

interface Props {
  cache: CacheNode[];
  capacity: number;
  isAnimating: boolean;
}

export const CacheVisualization: React.FC<Props> = ({ cache, capacity, isAnimating }) => {
  const emptySlots = capacity - cache.length;

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">LRU Cache State</h2>
        <div className="text-sm text-gray-600">
          {cache.length} / {capacity} slots used
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mb-4 text-sm">
        <div className="flex items-center space-x-1">
          <Crown className="text-blue-500" size={14} />
          <span className="text-gray-600">Most Recent (MRU)</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="text-red-500" size={14} />
          <span className="text-gray-600">Least Recent (LRU)</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 overflow-x-auto pb-4">
        {cache.map((node, index) => (
          <React.Fragment key={node.id}>
            <CacheNodeComponent 
              node={node} 
              index={index} 
              isAnimating={isAnimating}
            />
            {index < cache.length - 1 && (
              <ArrowRight className="text-gray-400 flex-shrink-0" size={20} />
            )}
          </React.Fragment>
        ))}
        
        {/* Empty slots */}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <React.Fragment key={`empty-${index}`}>
            {(cache.length > 0 || index > 0) && (
              <ArrowRight className="text-gray-300 flex-shrink-0" size={20} />
            )}
            <div className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-4 min-w-[120px] h-[120px] flex items-center justify-center">
              <span className="text-gray-400 text-sm">Empty</span>
            </div>
          </React.Fragment>
        ))}
        
        {cache.length > 0 && (
          <>
            <ArrowRight className="text-red-400 flex-shrink-0" size={20} />
            <div className="flex items-center space-x-2 text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
              <Trash2 size={16} />
              <span className="text-sm font-medium">LRU (Evicted First)</span>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="text-sm text-yellow-800 space-y-1">
          <div className="font-medium mb-2">💡 How to read this:</div>
          <div>• <span className="font-medium">Left side</span>: Recently used items (safe from eviction)</div>
          <div>• <span className="font-medium">Right side</span>: Older items (first to be removed when full)</div>
          <div>• <span className="font-medium">When you access an item</span>: It moves to the left (becomes most recent)</div>
          <div>• <span className="font-medium">When cache is full</span>: Rightmost item gets evicted to make room</div>
        </div>
      </div>
    </div>
  );
};