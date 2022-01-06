import { promises as fsp } from 'fs';
import { supportedClimbingTypes } from '../models/climbing-type';
import { isRedpointActivity } from '../models/redpoint-activity';
import { supportedTickTypes } from '../models/tick-type';
import { Parser } from './parser';
import { ParserError, UnsupportedClimbingTypeError, UnsupportedTickTypeError } from './parser-error';

describe('Parser', () => {

    it('should parse a valid plist file', async () => {
        const file = await fsp.readFile('./test/data/boulder-session.plist');
        expect(file.length).toEqual(313112);

        const obj = Parser.parse(file);
        expect(isRedpointActivity(obj)).toBe(true);
    });

    describe('should reject invalid files', () => {
        it('should identify invalid format', async () => {
            try {
                const file = await fsp.readFile('./test/data/invalid.plist');
                expect(file.length).toEqual(300);
                Parser.parse(file);
            } catch (error) {
                expect(error).toBeInstanceOf(ParserError);
            }
        });
        it('should identify unsupported climbing types', async () => {
            try {
                const file = await fsp.readFile('./test/data/invalid-climbing-type.plist');
                expect(file.length).toEqual(3207);
                Parser.parse(file);
            } catch (error) {
                if (!(error instanceof UnsupportedClimbingTypeError)) {
                    console.log(error);
                }
                expect(error).toBeInstanceOf(UnsupportedClimbingTypeError);
                expect((error as UnsupportedClimbingTypeError).supported).toEqual(supportedClimbingTypes);
                expect((error as UnsupportedClimbingTypeError).encountered).toEqual([
                    'something unsupported'
                ]);
            }
        });
        it('should identify unsupported tick types', async () => {
            try {
                const file = await fsp.readFile('./test/data/invalid-tick-type.plist');
                expect(file.length).toEqual(3190);
                Parser.parse(file);
            } catch (error) {
                if (!(error instanceof UnsupportedTickTypeError)) {
                    console.log(error);
                }
                expect(error).toBeInstanceOf(UnsupportedTickTypeError);
                expect((error as UnsupportedTickTypeError).supported).toEqual(supportedTickTypes);
                expect((error as UnsupportedTickTypeError).encountered).toEqual([
                    'unknown'
                ]);
            }
        });
    })


});
