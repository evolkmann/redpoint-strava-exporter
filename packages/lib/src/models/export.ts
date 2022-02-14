import { RedpointActivity } from './redpoint-activity';

export enum ExportLanguage {
    DE = 'de'
}

export interface ExportOptions {
    language: ExportLanguage;
    activityName: (activity: RedpointActivity) => string;
    activityDescription?: (activity: RedpointActivity) => string;
    /**
     * The location where the activity took place.
     */
    venue?: string;
}
