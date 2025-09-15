import React from 'react';
import { CacheNode as CacheNodeType } from '../types/cache';

interface Props {
  node: CacheNodeType;
  index: number;
  isAnimating: boolean;
}

export const CacheNode: React.FC<Props> = ({ node, index, isAnimating }) => {
  return (
    <div 
      className={`
        relative bg-white rounded-lg shadow-md border-2 p-4 min-w-[120px]
        transition-all duration-500 ease-in-out transform
        ${isAnimating ? 'scale-105 border-blue-400' : 'border-gray-200'}
        ${index === 0 ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
      `}
    >
      {index === 0 && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          MRU
        </div>
      )}
      
      <div className="text-center">
        <div className="text-sm text-gray-500 font-medium mb-1">Key</div>
        <div className="text-lg font-bold text-gray-800 mb-2">{node.key}</div>
        
        <div className="text-sm text-gray-500 font-medium mb-1">Value</div>
        <div className="text-md text-blue-600 font-semibold">{node.value}</div>
      </div>
      
      <div className="absolute bottom-1 right-2 text-xs text-gray-400">
        #{index + 1}
      </div>
    </div>
  );
};