
import React, { useState } from 'react';
import Header from './components/Header';
import TimeRangeSelector from './components/TimeRangeSelector';
import DateNavigator from './components/DateNavigator';
import SleepChart from './components/SleepChart';
import MetricSelector from './components/MetricSelector';
import AiAnalysis from './components/AiAnalysis';
import SleepMetrics from './components/SleepMetrics';
import AddNotes from './components/AddNotes';
import HowToUse from './components/HowToUse';
import { mockSleepData, mockSleepMetrics } from './data/mockData';
import { type OverlayMetric } from './types';

const App: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<OverlayMetric>('Respiration');

  return (
    <div className="bg-black min-h-screen text-gray-300 font-sans">
      <div className="max-w-md mx-auto">
        <Header />
        <main className="px-4 pb-8">
          <TimeRangeSelector />
          <DateNavigator />
          <div className="mt-4">
            <SleepChart data={mockSleepData} selectedMetric={selectedMetric} />
          </div>
          <MetricSelector selectedMetric={selectedMetric} onSelectMetric={setSelectedMetric} />
          <AiAnalysis metrics={mockSleepMetrics} sleepPattern={mockSleepData} />
          <SleepMetrics metrics={mockSleepMetrics} />
          <AddNotes />
          <HowToUse />
        </main>
      </div>
    </div>
  );
};

export default App;
