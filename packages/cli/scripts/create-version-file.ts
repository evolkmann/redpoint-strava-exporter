import { promises as fsp } from 'fs';

async function main() {
    const packageJsonFile = await fsp.readFile('./package.json');
    const packageJson = JSON.parse(packageJsonFile.toString());
    const version = packageJson.version;
    await fsp.writeFile('./src/version.ts', `export const VERSION = '${version}';`);
}

main();
