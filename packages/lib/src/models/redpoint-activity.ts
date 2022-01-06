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
    pauseDatapoints: unknown[];
    peakLabels: unknown[];
    userRemovedAscentManualDataPoints: unknown[];
}

export function isRedpointActivity(plist: any): plist is RedpointActivity {
    const maybeActivity = plist as Partial<RedpointActivity>;
    return typeof plist === 'object'
        && !(plist instanceof Date)
        && !Array.isArray(plist)
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
