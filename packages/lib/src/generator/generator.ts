import { RedpointActivity } from '../models/redpoint-activity';

export default abstract class Generator<ExchangeFormat> {

    abstract generate(activity: RedpointActivity): ExchangeFormat;
    abstract toFile(data: ExchangeFormat): string;

}
