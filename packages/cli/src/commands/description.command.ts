import { ExportLanguage, getActivityDescription, Parser } from '@redpoint-strava-exporter/lib';
import { Command } from 'commander';
import { promises as fsp } from 'fs';

export default new Command('description')
    .addHelpText('before', 'Generate a activity description')
    .requiredOption('-p, --plist <plist>', 'path to a .plist file that you exported from redpoint')
    .option('-l, --language [language]', 'Currently only supported: de')
    .option('-v, --venue [venue]', 'The location where the activity took place. Will be included in the description.')
    .action(async ({ plist, language, venue }) => {
        const file = await fsp.readFile(plist);
        const activity = Parser.parse(file);
        const text = getActivityDescription(activity, {
            language: language || ExportLanguage.DE,
            venue
        })
        process.stdout.write(text);
    });
