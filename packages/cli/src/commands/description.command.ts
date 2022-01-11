import { getActivityDescription, Parser } from '@redpoint-strava-exporter/lib';
import { Command } from 'commander';
import { promises as fsp } from 'fs';

export default new Command('description')
    .addHelpText('before', 'Generate a activity description')
    .argument('<plist>', 'path to a .plist file that you exported from redpoint')
    .argument('[language]', 'Currently only supported: de', 'de')
    .action(async (plistPath, language) => {
        const file = await fsp.readFile(plistPath);
        const activity = Parser.parse(file);
        const text = getActivityDescription(activity, {
            language
        })
        process.stdout.write(text);
    });
