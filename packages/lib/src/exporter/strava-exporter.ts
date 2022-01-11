import FormData from 'form-data';
import { GpxGenerator } from '../generator/gpx-generator';
import { ExportOptions } from '../models/export';
import { RedpointActivity } from '../models/redpoint-activity';
import { StravaActivityTypeTextual } from '../models/strava';

export class StravaExporter {

    static getFormData(activity: RedpointActivity, options: ExportOptions): FormData {
        const formData = new FormData();

        const gpxGenerator = new GpxGenerator();
        const gpx = gpxGenerator.generate(activity);
        const gpxXml = gpxGenerator.toFile(gpx);

        formData.append('data_type', 'gpx');
        formData.append('activity_type', StravaActivityTypeTextual.ROCKCLIMBING);
        formData.append('external_id', activity.uuid);
        formData.append('name', options.activityName(activity));
        formData.append('description', options.activityDescription(activity));
        formData.append('commute', '0');
        formData.append('trainer', '0');
        formData.append('file', gpxXml, {
            filename: `redpoint-${activity.uuid}.gpx`
        });

        return formData;
    }

}
