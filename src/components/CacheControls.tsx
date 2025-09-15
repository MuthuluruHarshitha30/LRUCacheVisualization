import React, { useState } from 'react';
import { Search, Plus, RotateCcw } from 'lucide-react';

interface Props {
  onGet: (key: string) => Promise<string | null>;
  onPut: (key: string, value: string) => Promise<void>;
  onClear: () => void;
  isAnimating: boolean;
}

export const CacheControls: React.FC<Props> = ({ onGet, onPut, onClear, isAnimating }) => {
  const [getKey, setGetKey] = useState('');
  const [putKey, setPutKey] = useState('');
  const [putValue, setPutValue] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(true);

  const handleGet = async () => {
    if (!getKey.trim()) return;
    const value = await onGet(getKey);
    setResult(value ? `Found: ${value}` : 'Not found');
    setTimeout(() => setResult(null), 3000);
  };

  const handlePut = async () => {
    if (!putKey.trim() || !putValue.trim()) return;
    await onPut(putKey, putValue);
    setPutKey('');
    setPutValue('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Cache Operations</h2>
      
      {showHints && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-800">
              <span className="font-medium">💡 Tip:</span> Try GET with existing keys for hits, or non-existing keys for misses!
            </div>
            <button
              onClick={() => setShowHints(false)}
              className="text-blue-600 hover:text-blue-800 text-xs"
            >
              Hide
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {/* Get Operation */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
            <Search className="mr-2" size={16} />
            GET Operation <span className="text-sm font-normal text-gray-500 ml-2">(Search for an item)</span>
          </h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Try: A, B, C, or X"
              value={getKey}
              onChange={(e) => setGetKey(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleGet()}
              disabled={isAnimating}
            />
            <button
              onClick={handleGet}
              disabled={!getKey.trim() || isAnimating}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
            >
              {isAnimating ? 'Processing...' : 'GET'}
            </button>
          </div>
          {result && (
            <div className={`mt-2 text-sm font-medium ${result.includes('Found') ? 'text-green-600' : 'text-red-600'}`}>
              {result}
            </div>
          )}
        </div>

        {/* Put Operation */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
            <Plus className="mr-2" size={16} />
            PUT Operation <span className="text-sm font-normal text-gray-500 ml-2">(Add a new item)</span>
          </h3>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Key (e.g., A)"
              value={putKey}
              onChange={(e) => setPutKey(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isAnimating}
            />
            <input
              type="text"
              placeholder="Value (e.g., Apple)"
              value={putValue}
              onChange={(e) => setPutValue(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyPress={(e) => e.key === 'Enter' && handlePut()}
              disabled={isAnimating}
            />
          </div>
          <button
            onClick={handlePut}
            disabled={!putKey.trim() || !putValue.trim() || isAnimating}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 transition-colors"
          >
            {isAnimating ? 'Processing...' : 'PUT'}
          </button>
        </div>

        {/* Clear */}
        <button
          onClick={onClear}
          disabled={isAnimating}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 transition-colors flex items-center justify-center"
        >
          <RotateCcw className="mr-2" size={16} />
          Clear Cache & Start Over
        </button>
      </div>
    </div>
  );
};