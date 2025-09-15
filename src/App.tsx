import React from 'react';
import { useState } from 'react';
import { useLRUCache } from './hooks/useLRUCache';
import { CacheVisualization } from './components/CacheVisualization';
import { CacheControls } from './components/CacheControls';
import { Statistics } from './components/Statistics';
import { OperationHistory } from './components/OperationHistory';
import { QuickExamples } from './components/QuickExamples';
import { ConceptExplainer } from './components/ConceptExplainer';
import { Tutorial } from './components/Tutorial';
import { Database, Info, BookOpen, Lightbulb } from 'lucide-react';

function App() {
  const [showTutorial, setShowTutorial] = useState(false);
  
  const {
    cache,
    operations,
    stats,
    isAnimating,
    capacity,
    get,
    put,
    clear,
    runSequence
  } = useLRUCache(4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Database className="text-blue-600 mr-3" size={32} />
            <h1 className="text-4xl font-bold text-gray-800">
              LRU Cache Visualizer
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how computer caches work through interactive visualization. 
            No technical background needed - we'll guide you through everything!
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setShowTutorial(true)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <BookOpen className="mr-2" size={16} />
              Start Tutorial
            </button>
            <div className="text-sm text-gray-500">
              New to caching? Start here! →
            </div>
          </div>
        </div>

        {/* Concept Explainer */}
        <ConceptExplainer />

        {/* Main Content */}
        <div className="space-y-8">
          {/* Cache Visualization */}
          <CacheVisualization 
            cache={cache}
            capacity={capacity}
            isAnimating={isAnimating}
          />

          {/* Controls and Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CacheControls
              onGet={get}
              onPut={put}
              onClear={clear}
              isAnimating={isAnimating}
            />
            
            <Statistics stats={stats} />
          </div>
          
          {/* Quick Examples */}
          <QuickExamples 
            onRunExample={runSequence}
            isAnimating={isAnimating}
          />

          {/* Operation History */}
          <OperationHistory operations={operations} />
        </div>

        {/* Footer */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
          <div className="text-center">
            <Lightbulb className="mx-auto mb-2 text-green-600" size={24} />
            <h3 className="font-semibold text-gray-800 mb-2">Ready to Experiment?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Try the quick examples above, or create your own operations. Watch how the cache reorganizes itself!
            </p>
            <div className="text-xs text-gray-500">
              💡 Pro tip: Try accessing an old item to see it jump to the front of the cache
            </div>
          </div>
        </div>
        
        {/* Tutorial Modal */}
        <Tutorial
          onRunExample={runSequence}
          isVisible={showTutorial}
          onClose={() => setShowTutorial(false)}
        />
      </div>
    </div>
  );
}

export default App;