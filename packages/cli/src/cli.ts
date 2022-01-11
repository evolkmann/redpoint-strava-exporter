import { Command } from 'commander';
import DescriptionCommand from './commands/description.command';
import GpxCommand from './commands/gpx.command';
import { VERSION } from './version';

const program = new Command('redpoint-strava-exporter');
program.version(VERSION);
program.addHelpText('before', 'A utility to convert climbing activities created with the Redpoint® app to Strava® activities.');

program.addCommand(GpxCommand);
program.addCommand(DescriptionCommand);

program.parse();
