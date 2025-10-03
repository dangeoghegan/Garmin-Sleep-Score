
import { SleepStage, type SleepDataPoint, type SleepMetrics } from '../types';

const startTime = new Date();
startTime.setHours(1, 2, 0, 0); // 1:02 AM

const totalMinutes = 6 * 60 + 45; // 6 hours 45 mins
const intervalMinutes = 5;
const numDataPoints = totalMinutes / intervalMinutes;

export const mockSleepData: SleepDataPoint[] = [];

let lastHeartRate = 65;
let lastBodyBattery = 20;
let lastPulseOx = 98;
let lastRespiration = 16;

for (let i = 0; i < numDataPoints; i++) {
  const currentTime = new Date(startTime.getTime() + i * intervalMinutes * 60000);
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  let stage: SleepStage;
  let stageValue: number;

  const cyclePercent = (i % 90) / 90; // rough 90 min cycle

  if (i < 5 || i > numDataPoints - 5 || (cyclePercent > 0.4 && cyclePercent < 0.45)) {
    stage = SleepStage.Awake;
    stageValue = 4;
  } else if (cyclePercent > 0.75) {
    stage = SleepStage.REM;
    stageValue = 3;
  } else if (cyclePercent > 0.45) {
    stage = SleepStage.Light;
    stageValue = 2;
  } else {
    stage = SleepStage.Deep;
    stageValue = 1;
  }
  
  // Simulate metric changes based on sleep stage
  let hrChange = (Math.random() - 0.5) * 2;
  let bbChange = 0.1;
  let poChange = (Math.random() - 0.5) * 0.4;
  let respChange = (Math.random() - 0.5) * 0.8;

  switch(stage) {
    case SleepStage.Deep:
      hrChange -= 1;
      bbChange = 0.2;
      break;
    case SleepStage.REM:
      hrChange += 1;
      poChange -= 0.2;
      respChange += 0.2;
      break;
    case SleepStage.Awake:
      hrChange += 2;
      bbChange = -0.05;
      break;
    case SleepStage.Light:
    default:
      // default changes
      break;
  }

  lastHeartRate = Math.max(50, Math.min(80, lastHeartRate + hrChange));
  lastBodyBattery = Math.max(0, Math.min(100, lastBodyBattery + bbChange));
  lastPulseOx = Math.max(92, Math.min(100, lastPulseOx + poChange));
  lastRespiration = Math.max(12, Math.min(20, lastRespiration + respChange));
  
  const restless = stage === SleepStage.Awake && Math.random() > 0.5 ? 4.2 : 0;

  mockSleepData.push({
    time: timeString,
    timestamp: currentTime.getTime(),
    stage,
    stageValue,
    heartRate: parseFloat(lastHeartRate.toFixed(0)),
    bodyBattery: parseFloat(lastBodyBattery.toFixed(1)),
    pulseOx: parseFloat(lastPulseOx.toFixed(0)),
    respiration: parseFloat(lastRespiration.toFixed(0)),
    restless,
  });
}

export const mockSleepMetrics: SleepMetrics = {
  restlessMoments: 32,
  restingHeartRate: 54,
  bodyBatteryChange: 48,
  avgSpo2: 95,
  lowestSpo2: 87,
  avgRespiration: 15,
  lowestRespiration: 12,
};
