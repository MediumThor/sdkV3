import { ChainId } from '../chains';
import { Currency } from './currency';
import { Token } from './token';
import { Pool } from './pools/pool';
import { Price } from './fractions/price';
export declare class Route {
    readonly pools: Pool[];
    readonly path: Token[];
    readonly input: Currency;
    readonly output: Currency;
    readonly midPrice: Price;
    constructor(pools: Pool[], input: Currency, output: Currency, hops?: Token[]);
    get chainId(): ChainId;
}
