import { PlistValue } from 'plist';
import { UnsupportedLanguageError } from '../exporter/exporter-error';
import { ExportLanguage } from './export';
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

export function getTickTypeLabel(tickType: TickType, language: ExportLanguage) {
    switch (language) {
        case ExportLanguage.DE: {
            switch (tickType) {
                case TickType.ATTEMPT: return 'Nicht geschafft';
                case TickType.FLASH: return 'Flash';
                case TickType.BOULDER_REPEAT: return 'Wiederholung';
                case TickType.BOULDER_SEND: return 'Send';
            }
            throw new Error(`No label for tick type ${tickType}`);
        }
        default: throw new UnsupportedLanguageError(language);
    }
}
