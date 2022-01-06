import { parse as parsePlistFile } from 'plist';
import { isSupportedClimbingType } from '../models/climbing-type';
import { isRedpointActivity, RedpointActivity } from '../models/redpoint-activity';
import { isSupportedTickType } from '../models/tick-type';
import { ParserError, UnsupportedClimbingTypeError, UnsupportedTickTypeError } from './parser-error';

export class Parser {

    static parse(plist: ArrayBuffer): RedpointActivity {
        const decoder = new TextDecoder();
        const str = decoder.decode(plist);
        const parsed = parsePlistFile(str);

        if (!isRedpointActivity(parsed)) {
            if (isSupportedClimbingType(parsed) === false) {
                throw new UnsupportedClimbingTypeError(parsed);
            }
            if (isSupportedTickType(parsed) === false) {
                throw new UnsupportedTickTypeError(parsed);
            }
            throw new ParserError();
        }

        return parsed;
    }

}
