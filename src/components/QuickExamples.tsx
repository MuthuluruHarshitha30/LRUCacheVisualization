import React from 'react';
import { Play, Zap, Target, Trash2 } from 'lucide-react';

interface Props {
  onRunExample: (steps: Array<{ type: 'get' | 'put'; key: string; value?: string }>) => void;
  isAnimating: boolean;
}

export const QuickExamples: React.FC<Props> = ({ onRunExample, isAnimating }) => {
  const examples = [
    {
      title: "Basic Usage",
      description: "Add a few items and see how they're organized",
      icon: <Play className="text-blue-500" size={16} />,
      color: "border-blue-200 bg-blue-50",
      steps: [
        { type: 'put' as const, key: 'A', value: 'Apple' },
        { type: 'put' as const, key: 'B', value: 'Banana' },
        { type: 'put' as const, key: 'C', value: 'Cherry' }
      ]
    },
    {
      title: "Cache Hit Demo",
      description: "See what happens when we find an item",
      icon: <Target className="text-green-500" size={16} />,
      color: "border-green-200 bg-green-50",
      steps: [
        { type: 'put' as const, key: 'X', value: 'Xray' },
        { type: 'put' as const, key: 'Y', value: 'Yellow' },
        { type: 'put' as const, key: 'Z', value: 'Zebra' },
        { type: 'get' as const, key: 'X' }
      ]
    },
    {
      title: "Eviction Example",
      description: "Fill the cache and see what gets removed",
      icon: <Trash2 className="text-orange-500" size={16} />,
      color: "border-orange-200 bg-orange-50",
      steps: [
        { type: 'put' as const, key: '1', value: 'One' },
        { type: 'put' as const, key: '2', value: 'Two' },
        { type: 'put' as const, key: '3', value: 'Three' },
        { type: 'put' as const, key: '4', value: 'Four' },
        { type: 'put' as const, key: '5', value: 'Five' }
      ]
    },
    {
      title: "Real World Scenario",
      description: "Mix of operations like a real application",
      icon: <Zap className="text-purple-500" size={16} />,
      color: "border-purple-200 bg-purple-50",
      steps: [
        { type: 'put' as const, key: 'user1', value: 'John' },
        { type: 'put' as const, key: 'user2', value: 'Jane' },
        { type: 'get' as const, key: 'user1' },
        { type: 'put' as const, key: 'user3', value: 'Bob' },
        { type: 'get' as const, key: 'user2' },
        { type: 'put' as const, key: 'user4', value: 'Alice' },
        { type: 'put' as const, key: 'user5', value: 'Charlie' }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Examples</h2>
      <p className="text-gray-600 mb-4 text-sm">
        Click any example below to see it in action. Watch how the cache behaves!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onRunExample(example.steps)}
            disabled={isAnimating}
            className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${example.color}`}
          >
            <div className="flex items-center mb-2">
              {example.icon}
              <span className="font-semibold text-gray-800 ml-2">{example.title}</span>
            </div>
            <p className="text-sm text-gray-600">{example.description}</p>
            <div className="mt-2 text-xs text-gray-500">
              {example.steps.length} operations
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};