import { parse as parsePlistFile } from 'plist';
import { isRedpointActivity, RedpointActivity } from '../models/redpoint-activity';
import { ParserError } from './parser-error';

export class Parser {

    static parse(plist: ArrayBuffer): RedpointActivity {
        const decoder = new TextDecoder();
        const str = decoder.decode(plist);
        const parsed = parsePlistFile(str);

        if (!isRedpointActivity(parsed)) {
            throw new ParserError('not a redpoint activity');
        }

        return parsed;
    }

}
