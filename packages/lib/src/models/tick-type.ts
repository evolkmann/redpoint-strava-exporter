import { PlistValue } from 'plist';
import { RedpointActivity } from './redpoint-activity';

/**
 * TODO: Support all tick types available in the Redpoint App
 *
 * @see ClimbingType
 */
export enum TickType {
    BOULDER_REPEAT = 'boulderRepeat',
    BOULDER_SEND = 'boulderSend',
    FLASH = 'flash',
    ATTEMPT = 'attempt'
}

export const supportedTickTypes = Object.values(TickType);

/**
 * @param activity object that might be a redpoint activity
 * @returns returns `undefined` if the difficulty data is unavailable, otherwise a `boolean`
 */
export function isSupportedTickType(activity?: Partial<RedpointActivity> | PlistValue): boolean | undefined {
    const maybeActivity = activity as Partial<RedpointActivity>;
    if (Array.isArray(maybeActivity?.difficultyData)) {
        return maybeActivity?.difficultyData.every(point => supportedTickTypes.includes(point?.tickType));
    }

    return undefined;
}
