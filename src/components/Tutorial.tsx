import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Play, BookOpen, X } from 'lucide-react';

interface Props {
  onRunExample: (steps: Array<{ type: 'get' | 'put'; key: string; value?: string }>) => void;
  isVisible: boolean;
  onClose: () => void;
}

export const Tutorial: React.FC<Props> = ({ onRunExample, isVisible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "What is a Cache?",
      content: "A cache is like a small, fast storage that keeps frequently used items close at hand. Think of it like keeping your favorite books on your desk instead of walking to the library every time!",
      example: null,
      visual: "📚 → 🏠 (Fast Access)"
    },
    {
      title: "Why Do We Need LRU?",
      content: "Caches have limited space. When full, we need to decide what to remove. LRU removes the 'Least Recently Used' item - the one you haven't touched in the longest time.",
      example: null,
      visual: "🗑️ ← Oldest Item | Newest Item → ⭐"
    },
    {
      title: "Basic Operations",
      content: "There are two main operations:\n• GET: Look for an item (like searching for a book)\n• PUT: Add a new item (like placing a book on your desk)",
      example: null,
      visual: "🔍 GET | 📝 PUT"
    },
    {
      title: "Let's Add Our First Item",
      content: "We'll add 'A' with value 'Apple'. Since the cache is empty, it goes to the front (most recent position).",
      example: [{ type: 'put', key: 'A', value: 'Apple' }],
      visual: "[A:Apple] ← Most Recent"
    },
    {
      title: "Adding More Items",
      content: "Let's add 'B:Banana' and 'C:Cherry'. New items always go to the front, pushing older items to the right.",
      example: [
        { type: 'put', key: 'B', value: 'Banana' },
        { type: 'put', key: 'C', value: 'Cherry' }
      ],
      visual: "[C:Cherry] [B:Banana] [A:Apple]"
    },
    {
      title: "Cache Hit - Found It!",
      content: "When we GET 'A', we find it! This is a 'cache hit'. The item moves to the front because we just used it.",
      example: [{ type: 'get', key: 'A' }],
      visual: "🎯 HIT! A moves to front"
    },
    {
      title: "Cache Miss - Not Found",
      content: "If we GET 'X' (which doesn't exist), it's a 'cache miss'. We don't find it, so nothing changes in the cache.",
      example: [{ type: 'get', key: 'X' }],
      visual: "❌ MISS! Nothing changes"
    },
    {
      title: "Cache Full - Eviction Time!",
      content: "Our cache holds 4 items. When we add a 5th item 'E:Elephant', the least recently used item (rightmost) gets evicted to make room.",
      example: [
        { type: 'put', key: 'D', value: 'Dog' },
        { type: 'put', key: 'E', value: 'Elephant' }
      ],
      visual: "🗑️ Oldest item removed!"
    }
  ];

  const currentTutorial = tutorialSteps[currentStep];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const runExample = () => {
    if (currentTutorial.example) {
      onRunExample(currentTutorial.example);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BookOpen className="text-blue-600 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">LRU Cache Tutorial</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                Step {currentStep + 1} of {tutorialSteps.length}
              </span>
              <div className="flex space-x-1">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {currentTutorial.title}
            </h3>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4 text-center">
              <div className="text-2xl mb-2">{currentTutorial.visual}</div>
            </div>

            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {currentTutorial.content}
            </div>

            {currentTutorial.example && (
              <div className="mt-4">
                <button
                  onClick={runExample}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Play className="mr-2" size={16} />
                  Try This Example
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="mr-1" size={16} />
              Previous
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === tutorialSteps.length - 1}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="ml-1" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};