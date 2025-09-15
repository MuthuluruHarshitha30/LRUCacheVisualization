import React from 'react';
import { CacheStats } from '../types/cache';
import { Target, X, Trash2, Activity } from 'lucide-react';

interface Props {
  stats: CacheStats;
}

export const Statistics: React.FC<Props> = ({ stats }) => {
  const hitRate = stats.operations > 0 ? (stats.hits / stats.operations * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Activity className="mr-2" size={20} />
        Cache Statistics
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-center mb-2">
            <Target className="text-green-500 mr-1" size={16} />
            <span className="text-sm font-medium text-green-700">Hits</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.hits}</div>
        </div>
        
        <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center justify-center mb-2">
            <X className="text-red-500 mr-1" size={16} />
            <span className="text-sm font-medium text-red-700">Misses</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{stats.misses}</div>
        </div>
        
        <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center justify-center mb-2">
            <Trash2 className="text-orange-500 mr-1" size={16} />
            <span className="text-sm font-medium text-orange-700">Evictions</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">{stats.evictions}</div>
        </div>
        
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-center mb-2">
            <Activity className="text-blue-500 mr-1" size={16} />
            <span className="text-sm font-medium text-blue-700">Total Ops</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{stats.operations}</div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
        <div className="text-center">
          <div className="text-sm font-medium text-purple-700 mb-1">Hit Rate</div>
          <div className="text-xl font-bold text-purple-600">
            {hitRate.toFixed(1)}%
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${hitRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};