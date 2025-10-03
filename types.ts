
export enum SleepStage {
  Awake = 'Awake',
  REM = 'REM',
  Light = 'Light',
  Deep = 'Deep',
}

export interface SleepDataPoint {
  time: string;
  timestamp: number;
  stage: SleepStage;
  stageValue: number; // 4 for Awake, 3 for REM, 2 for Light, 1 for Deep
  respiration?: number;
  pulseOx?: number;
  heartRate?: number;
  bodyBattery?: number;
  restless?: number; // 0 or 1
}

export interface SleepMetrics {
  restlessMoments: number;
  restingHeartRate: number;
  bodyBatteryChange: number;
  avgSpo2: number;
  lowestSpo2: number;
  avgRespiration: number;
  lowestRespiration: number;
}

export type OverlayMetric = 'Awake/Restlessness' | 'Resting Heart Rate' | 'Body Battery' | 'Pulse Ox' | 'Respiration';
