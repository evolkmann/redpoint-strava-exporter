import { promises as fsp } from 'fs';
import { Parser } from '../parser/parser';
import { ExportLanguage } from './export';
import { getActivityDescription } from './redpoint-activity';

describe('Redpoint Activity', () => {

    describe('Activity Description', () => {
        it('should find top difficulties', async () => {
            const file = await fsp.readFile('./test/data/boulder-session.plist');
            expect(file.length).toEqual(313112);
            const activity = Parser.parse(file);

            const desc = getActivityDescription(activity, {
                language: ExportLanguage.DE
            });

            expect(desc).toContain('Top-Flash: 3');
            expect(desc).toContain('Top-Grad: 5');
            expect(desc).toContain('Aufstiege:\n- Grad: 2 (Wiederholung)')
            expect(desc.endsWith('- Grad: 4 (Send)')).toEqual(true);
        });
        it('should handle activities with no flash', async () => {
            const file = await fsp.readFile('./test/data/boulder-session-no-flash.plist');
            expect(file.length).toEqual(3195);
            const activity = Parser.parse(file);

            const desc = getActivityDescription(activity, {
                language: ExportLanguage.DE
            });

            expect(desc).toContain('Top-Flash: -');
            expect(desc).toContain('Top-Grad: 2');
        });
    });
});
