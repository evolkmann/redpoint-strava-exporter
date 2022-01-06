import { PlistValue } from 'plist';
import { ClimbingType, supportedClimbingTypes } from '../models/climbing-type';
import { RedpointActivity } from '../models/redpoint-activity';
import { supportedTickTypes, TickType } from '../models/tick-type';

export class ParserError extends Error {}

abstract class UnsupportedActivityError<T> extends ParserError {

    protected constructor(
        activity: Partial<RedpointActivity> | PlistValue,
        public readonly supported: T[],
        public readonly encountered: T[],
        message?: string
    ) {
        super(message);
    }

}

export class UnsupportedClimbingTypeError extends UnsupportedActivityError<ClimbingType> {

    constructor(
        activity: Partial<RedpointActivity> | PlistValue,
        message?: string
    ) {
        super(
            activity,
            supportedClimbingTypes,
            (typeof activity === 'object' ? (activity as Partial<RedpointActivity>).climbingTypeDataPoints : []).map(point => point?.climbingType),
            message
        );
    }

}

export class UnsupportedTickTypeError extends UnsupportedActivityError<TickType> {

    constructor(
        activity: Partial<RedpointActivity> | PlistValue,
        message?: string
    ) {
        super(
            activity,
            supportedTickTypes,
            (typeof activity === 'object' ? (activity as Partial<RedpointActivity>).difficultyData : []).map(point => point?.tickType),
            message
        );
    }

}
