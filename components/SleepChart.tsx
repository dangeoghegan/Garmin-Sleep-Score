
import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Cell, Tooltip } from 'recharts';
import { type SleepDataPoint, SleepStage, type OverlayMetric } from '../types';

interface SleepChartProps {
  data: SleepDataPoint[];
  selectedMetric: OverlayMetric;
}

const STAGE_COLORS = {
  [SleepStage.Awake]: '#f472b6', // Pink
  [SleepStage.REM]: '#a855f7',   // Purple
  [SleepStage.Light]: '#38bdf8', // Light Blue
  [SleepStage.Deep]: '#3b82f6',  // Blue
};

const formatYAxisSleep = (value: number) => {
  switch (value) {
    case 1: return 'Deep';
    case 2: return 'Light';
    case 3: return 'REM';
    case 4: return 'Awake';
    default: return '';
  }
};

const getMetricConfig = (metric: OverlayMetric, data: SleepDataPoint[]) => {
    switch (metric) {
        case 'Awake/Restlessness': return { key: 'restless', domain: [0, 5], stroke: '#FFFFFF', type: 'bar' };
        case 'Respiration': return { key: 'respiration', domain: [10, 25], stroke: '#FFFFFF', type: 'line' };
        case 'Pulse Ox': return { key: 'pulseOx', domain: [85, 101], stroke: '#FFFFFF', type: 'line' };
        case 'Resting Heart Rate': return { key: 'heartRate', domain: [50, 85], stroke: '#FFFFFF', type: 'line' };
        case 'Body Battery': return { key: 'bodyBattery', domain: [0, 100], stroke: '#FFFFFF', type: 'line' };
        default: return null;
    }
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-gray-800 text-white p-2 rounded border border-gray-600 text-sm">
                <p className="font-bold">{`Time: ${data.time}`}</p>
                <p style={{ color: STAGE_COLORS[data.stage] }}>{`Stage: ${data.stage}`}</p>
                {data.heartRate && <p>{`Heart Rate: ${data.heartRate} bpm`}</p>}
                {data.pulseOx && <p>{`Pulse Ox: ${data.pulseOx}%`}</p>}
                {data.respiration && <p>{`Respiration: ${data.respiration} brpm`}</p>}
            </div>
        );
    }
    return null;
};

const SleepChart: React.FC<SleepChartProps> = ({ data, selectedMetric }) => {
  const metricConfig = getMetricConfig(selectedMetric, data);
  const startTime = data[0]?.time;
  const endTime = data[data.length - 1]?.time;

  return (
    <div className="relative h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 20 }}>
          <XAxis 
            dataKey="time" 
            tick={false} 
            axisLine={false} 
            tickLine={false}
          />
          <YAxis 
            yAxisId="left" 
            orientation="left"
            tickFormatter={formatYAxisSleep} 
            ticks={[1, 2, 3, 4]} 
            domain={[0, 4.5]} 
            stroke="#9ca3af"
            tick={{ fontSize: 12 }}
            axisLine={false} 
            tickLine={false}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            domain={metricConfig?.domain} 
            stroke="#9ca3af"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar yAxisId="left" dataKey="stageValue" barSize={10} isAnimationActive={false}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={STAGE_COLORS[entry.stage]} />
            ))}
          </Bar>

          {metricConfig && metricConfig.type === 'line' && (
             <Line
                yAxisId="right"
                type="monotone"
                dataKey={metricConfig.key}
                stroke={metricConfig.stroke}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
            />
          )}

          {metricConfig && metricConfig.type === 'bar' && (
            <Bar yAxisId="left" dataKey={metricConfig.key} fill={metricConfig.stroke} isAnimationActive={false}>
              {data.map((entry, index) => (
                 <Cell key={`cell-restless-${index}`} fill={entry.restless ? '#FFFFFF' : 'transparent'} />
              ))}
            </Bar>
          )}

        </ComposedChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-2">
        <span><span className="text-lg">💤</span> {startTime}</span>
        <span><span className="text-lg">⏰</span> {endTime}</span>
      </div>
    </div>
  );
};

export default SleepChart;
