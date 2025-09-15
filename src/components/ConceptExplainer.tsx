import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const ConceptExplainer: React.FC = () => {
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);

  const concepts = [
    {
      id: 'cache',
      title: 'What is a Cache?',
      simple: 'A cache is like a small, fast storage for frequently used items.',
      detailed: 'Think of a cache like your desk drawer. You keep your most-used pens, papers, and tools there for quick access. Instead of walking to a filing cabinet every time, you can grab what you need instantly. In computers, a cache stores frequently accessed data in fast memory so programs don\'t have to fetch it from slower storage every time.'
    },
    {
      id: 'lru',
      title: 'Why "Least Recently Used"?',
      simple: 'When space is full, we remove the item we haven\'t used in the longest time.',
      detailed: 'Imagine your desk drawer is full and you need to add a new pen. Which old pen would you remove? Probably the one you haven\'t used in months! LRU works the same way - it assumes that if you haven\'t used something recently, you probably won\'t need it soon. This strategy works well because programs often access the same data repeatedly.'
    },
    {
      id: 'hit-miss',
      title: 'Cache Hits vs Misses',
      simple: 'Hit = Found it quickly! Miss = Had to look elsewhere.',
      detailed: 'A cache hit is like finding your keys exactly where you expected them to be. It\'s fast and efficient! A cache miss is like looking for your keys in your usual spot but they\'re not there - now you have to search elsewhere, which takes more time. The goal is to maximize hits and minimize misses.'
    },
    {
      id: 'eviction',
      title: 'What is Eviction?',
      simple: 'Removing old items to make room for new ones.',
      detailed: 'Eviction is like cleaning out your closet when it gets too full. You have to decide what to keep and what to remove. In LRU cache, we always remove the least recently used item first. It\'s like donating the clothes you haven\'t worn in the longest time to make room for new ones.'
    }
  ];

  const toggleConcept = (id: string) => {
    setExpandedConcept(expandedConcept === id ? null : id);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 p-6">
      <div className="flex items-center mb-4">
        <HelpCircle className="text-indigo-600 mr-2" size={20} />
        <h2 className="text-xl font-bold text-gray-800">Key Concepts</h2>
      </div>
      
      <div className="space-y-3">
        {concepts.map((concept) => (
          <div key={concept.id} className="bg-white rounded-lg border border-indigo-100">
            <button
              onClick={() => toggleConcept(concept.id)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-indigo-50 transition-colors rounded-lg"
            >
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{concept.title}</h3>
                <p className="text-sm text-gray-600">{concept.simple}</p>
              </div>
              {expandedConcept === concept.id ? (
                <ChevronUp className="text-indigo-500" size={20} />
              ) : (
                <ChevronDown className="text-indigo-500" size={20} />
              )}
            </button>
            
            {expandedConcept === concept.id && (
              <div className="px-4 pb-4">
                <div className="bg-indigo-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed">
                  {concept.detailed}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};