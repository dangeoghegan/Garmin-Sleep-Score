
import React from 'react';
import { type OverlayMetric } from '../types';

interface MetricSelectorProps {
  selectedMetric: OverlayMetric;
  onSelectMetric: (metric: OverlayMetric) => void;
}

const MetricSelector: React.FC<MetricSelectorProps> = ({ selectedMetric, onSelectMetric }) => {
  const metrics: OverlayMetric[] = ['Awake/Restlessness', 'Resting Heart Rate', 'Body Battery', 'Pulse Ox', 'Respiration'];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between border-b border-gray-700 pb-2">
         <h2 className="text-white text-lg font-semibold">{selectedMetric}</h2>
         <div className="text-xs text-gray-400">
             <span>— {selectedMetric}</span>
         </div>
      </div>
      <div className="flex space-x-2 overflow-x-auto py-4 scrollbar-hide">
        {metrics.map(metric => (
          <button
            key={metric}
            onClick={() => onSelectMetric(metric)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
              selectedMetric === metric
                ? 'bg-gray-200 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {metric}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MetricSelector;
