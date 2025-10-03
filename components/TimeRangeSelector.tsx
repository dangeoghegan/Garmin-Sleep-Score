
import React from 'react';

const TimeRangeSelector: React.FC = () => {
  const ranges = ['1d', '7d', '4w', '1y'];
  const activeRange = '1d';

  return (
    <div className="bg-gray-800 rounded-lg p-1 flex justify-between">
      {ranges.map(range => (
        <button
          key={range}
          className={`w-full py-1 text-sm font-medium rounded-md transition-colors ${
            activeRange === range
              ? 'bg-gray-600 text-white'
              : 'bg-transparent text-gray-400 hover:bg-gray-700'
          }`}
        >
          {range.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
