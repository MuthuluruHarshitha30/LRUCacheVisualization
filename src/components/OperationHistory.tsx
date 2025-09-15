import React from 'react';
import { CacheOperation } from '../types/cache';
import { Search, Plus, Target, X, Trash2, Clock } from 'lucide-react';

interface Props {
  operations: CacheOperation[];
}

export const OperationHistory: React.FC<Props> = ({ operations }) => {
  const getOperationIcon = (operation: CacheOperation) => {
    if (operation.type === 'get') return <Search size={14} />;
    return <Plus size={14} />;
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'hit': return <Target className="text-green-500" size={14} />;
      case 'miss': return <X className="text-red-500" size={14} />;
      case 'eviction': return <Trash2 className="text-orange-500" size={14} />;
      default: return null;
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'hit': return 'bg-green-50 border-green-200';
      case 'miss': return 'bg-red-50 border-red-200';
      case 'eviction': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Clock className="mr-2" size={20} />
        Operation History
      </h2>
      
      {operations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Clock className="mx-auto mb-2" size={24} />
          <p>No operations yet. Try getting or putting some values!</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {operations.map((operation) => (
            <div
              key={operation.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${getResultColor(operation.result)}`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {getOperationIcon(operation)}
                  <span className="font-mono text-sm font-medium">
                    {operation.type.toUpperCase()}
                  </span>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">{operation.key}</span>
                  {operation.value && (
                    <>
                      <span className="text-gray-400 mx-1">→</span>
                      <span className="text-blue-600">{operation.value}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getResultIcon(operation.result)}
                <span className="text-xs font-medium capitalize">
                  {operation.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};