import { UnsupportedLanguageError } from '../exporter/exporter-error';
import { ClimbingType, isSupportedClimbingType } from './climbing-type';
import { ExportLanguage, ExportOptions } from './export';
import { getTickTypeLabel, isSupportedTickType, TickType } from './tick-type';
import { Duration, Interval } from 'luxon';

/**
 * Represents a parsed `.plist` file that has been exported
 * using Redpoint 3.6
 */
export interface RedpointActivity {
    uuid: string;
    isCompleted: boolean;
    isDemoSession: boolean;
    isUploadedToCloudKit: boolean;
    submittedToLeaderboard: boolean;
    startDate: Date;
    endDate: Date;
    modificationDate: Date;
    userComment: string;
    debugInformation: DebugInformation;
    debugLogs: string[];
    deviceDetails: DeviceDetails;
    location: Location;
    locationDataPoints: LocationDataPoint[];
    accelerationData: unknown[];
    altitudeData: AltitudeDataPoint[];
    ascends: unknown[];
    attitudeData: unknown[];
    climbingTypeDataPoints: ClimbingTypeDataPoint[];
    difficultyData: DifficultyDataPoint[];
    heartRateData: HeartRateDataPoint[];
    energyDataPoints: EnergyDataPoint[];
    // This key is also not spelled "DataPoints" (with uppercase P)
    // in the plist file, in contrast to the other properties
    pauseDatapoints: unknown[];
    peakLabels: unknown[];
    userRemovedAscentManualDataPoints: unknown[];
}

export function isRedpointActivity(plist: any): plist is RedpointActivity {
    const maybeActivity = plist as Partial<RedpointActivity>;
    return typeof plist === 'object'
        && !(plist instanceof Date)
        && !Array.isArray(plist)
        && isSupportedClimbingType(maybeActivity)
        && isSupportedTickType(maybeActivity)
        && Array.isArray(maybeActivity.accelerationData)
        && Array.isArray(maybeActivity.altitudeData)
        && Array.isArray(maybeActivity.ascends)
        && Array.isArray(maybeActivity.attitudeData)
        && Array.isArray(maybeActivity.climbingTypeDataPoints)
        && Array.isArray(maybeActivity.debugLogs)
        && Array.isArray(maybeActivity.difficultyData)
        && Array.isArray(maybeActivity.energyDataPoints)
        && Array.isArray(maybeActivity.heartRateData)
        && Array.isArray(maybeActivity.locationDataPoints)
        && Array.isArray(maybeActivity.pauseDatapoints)
        && Array.isArray(maybeActivity.peakLabels)
        && Array.isArray(maybeActivity.userRemovedAscentManualDataPoints)
        && (maybeActivity.startDate instanceof Date)
        && (maybeActivity.endDate instanceof Date)
        && (maybeActivity.modificationDate instanceof Date)
        && typeof maybeActivity.debugInformation === 'object'
        && typeof maybeActivity.deviceDetails === 'object'
        && typeof maybeActivity.isCompleted === 'boolean'
        && typeof maybeActivity.isDemoSession === 'boolean'
        && typeof maybeActivity.isUploadedToCloudKit === 'boolean'
        && typeof maybeActivity.location === 'object'
        && typeof maybeActivity.submittedToLeaderboard === 'boolean'
        && typeof maybeActivity.userComment === 'string'
        && typeof maybeActivity.uuid === 'string';
}

export function getActivityDescription(activity: RedpointActivity, options: Pick<ExportOptions, 'language'>): string {
    if (options.language !== ExportLanguage.DE) {
        throw new UnsupportedLanguageError(options.language);
    }

    const topDifficulty = activity.difficultyData
        .sort((a, b) => b.difficulty.localeCompare(a.difficulty))?.[0]?.difficulty;
    const topFlash = activity.difficultyData
        .filter(p => p.tickType === TickType.FLASH)
        .sort((a, b) => b.difficulty.localeCompare(a.difficulty))?.[0]?.difficulty;
    const ascends = activity.difficultyData
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(p => {
            const type = getTickTypeLabel(p.tickType, options.language);
            return `Grad: ${p.difficulty} (${type})`;
        });

    return `Top-Grad: ${topDifficulty || '-'}
Top-Flash: ${topFlash || '-'}
    
Aufstiege:
${ascends.map(a => `- ${a}`).join('\n')}`;
}

interface TimestampedDataPoint {
    timestamp: number;
}

export interface AltitudeDataPoint extends TimestampedDataPoint {
    altitude: number;
}

export interface ClimbingTypeDataPoint extends TimestampedDataPoint {
    climbingType: ClimbingType;
}

export interface DebugInformation {
    batteryStatusOnSessionStart: number;
    batteryStatusOnSessionEnd: number;
}

export interface DeviceDetails {
    appBuild: string;
    appVersion: string;
    hardwareVersion: string;
    manufacturer: string;
    model: string;
    name: string;
    systemVersion: string;
}

export interface DifficultyDataPoint extends TimestampedDataPoint {
    difficulty: string;
    gradeScale: string;
    tickType: TickType;
}

export interface HeartRateDataPoint extends TimestampedDataPoint {
    heartRate: number;
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface LocationDataPoint extends TimestampedDataPoint {
    absoluteAltitudeAboveSeaLevel: number;
    coordinate: Location;
}

export interface EnergyDataPoint extends TimestampedDataPoint {
    calories: number;
    energyType: string;
}
