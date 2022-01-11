import { buildGPX, StravaBuilder } from 'gpx-builder';
import { Metadata, Segment, Track } from 'gpx-builder/dist/builder/BaseBuilder/models';
import StravaPoint from 'gpx-builder/dist/builder/StravaBuilder/models/StravaPoint';
import { GPXBuildData } from 'gpx-builder/dist/types';
import { RedpointActivity } from '../models/redpoint-activity';
import Generator from './generator';

export class GpxGenerator extends Generator<GPXBuildData> {

    static CREATOR = 'evolkmann/redpoint-strava-exporter with Barometer';

    generate(activity: RedpointActivity) {
        const builder = new StravaBuilder();

        builder.setMetadata(new Metadata({
            time: activity.startDate
        }));

        const track = GpxGenerator.makeTrack(activity);
        builder.setTracks([track]);

        return builder.toObject();
    }

    toFile(data: GPXBuildData) {
        return buildGPX(data)
            .replace('creator="fabulator:gpx-builder"', `creator="${GpxGenerator.CREATOR}"`)
            .replace(/<gpxtpx:hr>(\d+)<\/gpxtpx:hr>/g, '<gpxtpx:hr>$1.0</gpxtpx:hr>');
    }

    private static makeTrack(activity: RedpointActivity): Track {
        const { latitude, longitude } = activity.location;
        const initialHeight = activity.locationDataPoints[0].absoluteAltitudeAboveSeaLevel;

        const pointsByElevation = activity.altitudeData.map((altitudePoint, index) => {
            const elevationTime = altitudePoint.timestamp;
            const heartRateMatch = activity.heartRateData.find(hrPoint => {
                const hrTime = hrPoint.timestamp;
                return Math.abs(elevationTime - hrTime) < 5 /* seconds deviation */;
            });

            // Offset latitude ("vertical") by about 0.5m to make sure Strava
            // calculates the "active time" as close as possible to the passed time
            // of the activity. The distance of the activity will be based on this too
            // but should be close enough to what you really walk inside the gym.
            //
            // Longitude ("horizontal") is not offset, because the amount would have
            // to be adapted depending on the distance from the equator.
            //
            // See: https://www.usna.edu/Users/oceano/pguth/md_help/html/approx_equivalents.htm
            const latOffset = 5e-6 * (index % 2 === 0 ? 1 : -1);

            return new StravaPoint(latitude + latOffset, longitude, {
                time: GpxGenerator.timestampToGpxDate(elevationTime),
                ele: altitudePoint.altitude + initialHeight,
                hr: heartRateMatch?.heartRate
            });
        });

        const pointsDistinctByTime = new Map<number, StravaPoint>();
        pointsByElevation.forEach(point => pointsDistinctByTime.set(point.toObject().time.getTime(), point));

        const segment = new Segment([...pointsDistinctByTime.values()]);
        return new Track([segment]);
    }

    private static timestampToGpxDate(timestamp: number): Date {
        return new Date(timestamp * 1000);
    }

}
