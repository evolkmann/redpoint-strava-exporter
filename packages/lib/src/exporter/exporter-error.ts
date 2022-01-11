import { ExportLanguage } from '../models/export';

export class ExporterError extends Error {}

export class UnsupportedLanguageError extends ExporterError {

    constructor(encounteredLanguage: string) {
        super();
        const supported = Object.values(ExportLanguage);
        this.message = `Unsupported language "${encounteredLanguage}". Supported: ${supported.join()}`;
    }

}
