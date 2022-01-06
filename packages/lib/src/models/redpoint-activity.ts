import { PlistValue, PlistObject } from 'plist';

/**
 * Represents a parsed `.plist` file that has been exported
 * using Redpoint 3.6
 */
export interface RedpointActivity {
    accelerationData: unknown[];
    altitudeData: AltitudeDataPoint[];
    ascends: unknown[];
    attitudeData: unknown[];
    climbingTypeDataPoints: ClimbingTypeDataPoint[];
    debugInformation: DebugInformation;
    debugLogs: string[];
    deviceDetails: DeviceDetails;
    difficultyData: DifficultyDataPoint[];
    heartRateData: HeartRateDataPoint[];
    isCompleted: boolean;
    isDemoSession: boolean;
    isUploadedToCloudKit: boolean;
    location: Location;
    locationDataPoints: LocationDataPoint[];
    startDate: Date;
    endDate: Date;
    energyDataPoints: EnergyDataPoint[];
    modificationDate: Date;
    pauseDatapoints: unknown[];
    peakLabels: unknown[];
    submittedToLeaderboard: boolean;
    userComment: string;
    userRemovedAscentManualDataPoints: unknown[];
    uuid: string;
}

export function isRedpointActivity(plist: any): plist is RedpointActivity {
    return typeof plist === 'object'
        && !Array.isArray(plist)
        && !(plist instanceof Date)
        && Array.isArray((plist as PlistObject).accelerationData)
        && Array.isArray((plist as PlistObject).altitudeData)
        && Array.isArray((plist as PlistObject).ascends)
        && Array.isArray((plist as PlistObject).attitudeData)
        && Array.isArray((plist as PlistObject).climbingTypeDataPoints)
        && typeof (plist as PlistObject).debugInformation === 'object'
        && Array.isArray((plist as PlistObject).debugLogs)
        && typeof (plist as PlistObject).deviceDetails === 'object'
        && Array.isArray((plist as PlistObject).difficultyData)
        && Array.isArray((plist as PlistObject).heartRateData)
        && typeof (plist as PlistObject).isCompleted === 'boolean'
        && typeof (plist as PlistObject).isDemoSession === 'boolean'
        && typeof (plist as PlistObject).isUploadedToCloudKit === 'boolean'
        && typeof (plist as PlistObject).location === 'object'
        && Array.isArray((plist as PlistObject).locationDataPoints)
        && Array.isArray((plist as PlistObject).energyDataPoints)
        && ((plist as PlistObject).startDate instanceof Date)
        && ((plist as PlistObject).endDate instanceof Date)
        && ((plist as PlistObject).modificationDate instanceof Date)
        && Array.isArray((plist as PlistObject).pauseDatapoints)
        && Array.isArray((plist as PlistObject).peakLabels)
        && typeof (plist as PlistObject).submittedToLeaderboard === 'boolean'
        && typeof (plist as PlistObject).userComment === 'string'
        && Array.isArray((plist as PlistObject).userRemovedAscentManualDataPoints)
        && typeof (plist as PlistObject).uuid === 'string'

}

export interface AltitudeDataPoint {
    altitude: number;
    timestamp: number;
}

export interface ClimbingTypeDataPoint {
    climbingType: string;
    timestamp: string;
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

export interface DifficultyDataPoint {
    difficulty: string;
    gradeScale: string;
    tickType: 'boulderRepeat';
    timestamp: number;
}

export interface HeartRateDataPoint {
    heartRate: number;
    timestamp: number;
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface LocationDataPoint {
    absoluteAltitudeAboveSeaLevel: number;
    coordinate: Location;
    timestamp: number;
}

export interface EnergyDataPoint {
    calories: number;
    energyType: string;
    timestamp: number;
}
