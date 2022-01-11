import { promises as fsp } from 'fs';
import GpxGenerator from '../generator/gpx-generator';
import { ExportLanguage, ExportOptions } from '../models/export';
import { RedpointActivity } from '../models/redpoint-activity';
import { StravaActivityTypeTextual } from '../models/strava';
import { Parser } from '../parser/parser';
import StravaExporter from './strava-exporter';

const expectStringInFormData = (formData: string, field: string, value: string) => {
    expect(formData).toContain(`name="${field}"\r\n\r\n${value}`);
}

describe('StravaExporter', () => {
    let activity: RedpointActivity;

    beforeAll(async () => {
        const file = await fsp.readFile('./test/data/boulder-session.plist');
        expect(file.length).toEqual(313112);
        activity = Parser.parse(file);
    });

    it('should generate form data', () => {
        const options: ExportOptions = {
            language: ExportLanguage.DE,
            activityName: () => 'test',
            activityDescription: () => 'test desc'
        };
        const formData = StravaExporter.getFormData(activity, options);

        const gpxGenerator = new GpxGenerator();
        const gpxStr = gpxGenerator.toFile(gpxGenerator.generate(activity));

        const formDataStr = formData.getBuffer().toString();

        expectStringInFormData(formDataStr, 'data_type', 'gpx');
        expectStringInFormData(formDataStr, 'activity_type', StravaActivityTypeTextual.ROCKCLIMBING);
        expectStringInFormData(formDataStr, 'name', options.activityName(activity));
        expectStringInFormData(formDataStr, 'description', options.activityDescription(activity));
        expectStringInFormData(formDataStr, 'commute', '0');
        expectStringInFormData(formDataStr, 'trainer', '0');
        expectStringInFormData(formDataStr, 'external_id', activity.uuid);
        expect(formDataStr).toContain(`Content-Disposition: form-data; name="file"; filename="redpoint-${activity.uuid}.gpx"`);
        expect(formDataStr).toContain(gpxStr);
    });

    it('should allow multiline description', () => {
        const formData = StravaExporter.getFormData(activity, {
            language: ExportLanguage.DE,
            activityName: () => 'test',
            activityDescription: () => 'test desc\nwith three\nlines'
        });

        const formDataStr = formData.getBuffer().toString();

        expectStringInFormData(formDataStr, 'description', 'test desc\nwith three\nlines');
    });
});
