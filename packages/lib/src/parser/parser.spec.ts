import { promises as fsp } from 'fs';
import { isRedpointActivity } from '../models/redpoint-activity';
import { Parser } from './parser';
import { ParserError } from './parser-error';

describe('Parser', () => {

    it('should parse a valid plist file', async () => {
        const file = await fsp.readFile('./test/data/boulder-session.plist');
        expect(file.length).toEqual(313112);

        const obj = Parser.parse(file);
        expect(isRedpointActivity(obj)).toBe(true);
    });

    it('should reject invalid files', async () => {
        try {
            const file = await fsp.readFile('./test/data/invalid.plist');
            expect(file.length).toEqual(300);
            Parser.parse(file);
        } catch (error) {
            expect(error).toBeInstanceOf(ParserError);
        }
    })

});
