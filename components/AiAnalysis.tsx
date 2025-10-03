
import React, { useState, useEffect } from 'react';
import { analyzeSleepData } from '../services/geminiService';
import { type SleepMetrics, type SleepDataPoint } from '../types';

interface AiAnalysisProps {
    metrics: SleepMetrics;
    sleepPattern: SleepDataPoint[];
}

const AiAnalysis: React.FC<AiAnalysisProps> = ({ metrics, sleepPattern }) => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            setIsLoading(true);
            const result = await analyzeSleepData(metrics, sleepPattern);
            setAnalysis(result);
            setIsLoading(false);
        };

        fetchAnalysis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metrics, sleepPattern]);


    return (
        <div className="my-6 p-4 bg-gray-900 rounded-lg">
            <h2 className="text-lg font-semibold text-white mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v2.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 6.586V4a1 1 0 00-1-1z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                </svg>
                AI Sleep Analysis
            </h2>
            {isLoading ? (
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse [animation-delay:0.4s]"></div>
                    <p className="text-gray-400">Analyzing your sleep...</p>
                </div>

            ) : (
                <p className="text-gray-300 leading-relaxed">
                    {analysis}
                </p>
            )}
        </div>
    );
};

export default AiAnalysis;
