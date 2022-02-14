import { GpxGenerator, Parser } from '@redpoint-strava-exporter/lib';
import { Command } from 'commander';
import { promises as fsp } from 'fs';

export default new Command('gpx')
    .addHelpText('before', 'Generate a GPX file for use with the Strava API')
    .requiredOption('-p, --plist <plist>', 'path to a .plist file that you exported from redpoint')
    .action(async ({ plist }) => {
        const file = await fsp.readFile(plist);
        const activity = Parser.parse(file);
        const generator = new GpxGenerator();
        const gpx = generator.generate(activity);
        const xml = generator.toFile(gpx);
        process.stdout.write(xml);
    });
