import { PlistValue } from 'plist';
import { RedpointActivity } from './redpoint-activity';

/**
 * TODO: Support all climbing types available in the Redpoint App
 *
 * @see TickType
 */
export enum ClimbingType {
    BOULDERING = 'bouldering'
}

export const supportedClimbingTypes = Object.values(ClimbingType);

/**
 * @param activity object that might be a redpoint activity
 * @returns returns `undefined` if the climbing data is unavailable, otherwise a `boolean`
 */
export function isSupportedClimbingType(activity?: Partial<RedpointActivity> | PlistValue): boolean | undefined {
    const maybeActivity = activity as Partial<RedpointActivity>;
    if (Array.isArray(maybeActivity?.climbingTypeDataPoints)) {
        return maybeActivity.climbingTypeDataPoints.every(point => supportedClimbingTypes.includes(point?.climbingType));
    }

    return undefined;
}
