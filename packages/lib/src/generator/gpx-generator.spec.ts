import { promises as fsp } from 'fs';
import {join} from 'path';
import { RedpointActivity } from '../models/redpoint-activity';
import { Parser } from '../parser/parser';
import GpxGenerator from './gpx-generator';

describe('GpxGenerator', () => {
    let activity: RedpointActivity;
    let generator: GpxGenerator;

    beforeAll(async () => {
        generator = new GpxGenerator();
        const file = await fsp.readFile('./test/data/boulder-session.plist');
        expect(file.length).toEqual(313112);
        activity = Parser.parse(file);
    });

    it('should generate gpx data', async () => {
        const gpx = generator.generate(activity);

        const track = gpx.trk[0];
        const points = track.trkseg[0].trkpt;

        expect(gpx.metadata.name).toBeUndefined();
        expect(gpx.metadata.desc).toBeUndefined();
        expect(gpx.metadata.time).toEqual(activity.startDate);
        expect(points.length).toEqual(1789);
        expect(track.trkseg.length).toEqual(1);
    });

    it('should write gpx file', async () => {
        const gpx = generator.generate(activity);
        const data = generator.toFile(gpx);

        expect(data).toContain(GpxGenerator.CREATOR);

        await fsp.writeFile(join(__dirname, '../../test/output/test.gpx'), data);
    })
})
