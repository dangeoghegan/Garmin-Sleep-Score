
import { GoogleGenAI } from "@google/genai";
import { type SleepDataPoint, type SleepMetrics } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function formatSleepPattern(sleepPattern: SleepDataPoint[]): string {
  let summary = '';
  let currentStage = sleepPattern[0].stage;
  let stageCount = 0;

  sleepPattern.forEach(point => {
    if (point.stage === currentStage) {
      stageCount++;
    } else {
      summary += `${stageCount * 5} mins of ${currentStage}, `;
      currentStage = point.stage;
      stageCount = 1;
    }
  });
  summary += `${stageCount * 5} mins of ${currentStage}.`;

  return summary.slice(0, 500); // Truncate to keep prompt reasonable
}


export const analyzeSleepData = async (metrics: SleepMetrics, sleepPattern: SleepDataPoint[]): Promise<string> => {
  const prompt = `
    Based on the following sleep data, provide a concise analysis of sleep quality in under 300 characters.
    Focus on positives and areas for improvement. Be encouraging.

    Key Metrics:
    - Restless Moments: ${metrics.restlessMoments}
    - Resting Heart Rate: ${metrics.restingHeartRate} bpm
    - Body Battery Change: +${metrics.bodyBatteryChange}
    - Average SpO2: ${metrics.avgSpo2}%
    - Average Respiration: ${metrics.avgRespiration} brpm

    Sleep Pattern Summary:
    The user went to sleep around ${sleepPattern[0].time} and woke up around ${sleepPattern[sleepPattern.length - 1].time}.
    The sleep cycle included: ${formatSleepPattern(sleepPattern)}
    
    Analysis (under 300 chars):
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing sleep data:", error);
    return "Could not retrieve AI analysis at this time. Please check your API key and try again.";
  }
};
