
import React from 'react';
import { type SleepMetrics as SleepMetricsType } from '../types';

interface SleepMetricsProps {
    metrics: SleepMetricsType;
}

const MetricItem: React.FC<{ value: string | number; label: string; unit?: string }> = ({ value, label, unit }) => (
    <div>
        <p className="text-3xl font-light text-white">
            {value}
            {unit && <span className="text-lg ml-1 text-gray-400">{unit}</span>}
        </p>
        <p className="text-sm text-gray-400">{label}</p>
    </div>
);


const SleepMetrics: React.FC<SleepMetricsProps> = ({ metrics }) => {
    const metricData = [
        { value: metrics.restlessMoments, label: 'Restless Moments' },
        { value: metrics.restingHeartRate, label: 'Resting Heart Rate', unit: 'bpm' },
        { value: `+${metrics.bodyBatteryChange}`, label: 'Body Battery Change' },
        { value: metrics.avgSpo2, label: 'Avg SpO₂', unit: '%' },
        { value: metrics.lowestSpo2, label: 'Lowest SpO₂', unit: '%' },
        { value: metrics.avgRespiration, label: 'Avg Respiration', unit: 'brpm' },
        { value: metrics.lowestRespiration, label: 'Lowest Respiration', unit: 'brpm' },
    ];
    
    return (
        <div className="my-6">
            <h2 className="text-lg font-semibold text-white mb-4">Sleep Metrics</h2>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-gray-800 pt-4">
               {metricData.map(item => <MetricItem key={item.label} {...item} />)}
            </div>
        </div>
    );
};

export default SleepMetrics;
