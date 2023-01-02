import JSBI from 'jsbi';
import { Pool } from './pool';
import { Token } from '../token';
import { Price, TokenAmount } from '../fractions';
import { ChainId } from '../../chains';
import { BigintIsh } from '../../constants';
export declare class Pair extends Pool {
    static getAddress(tokenA: Token, tokenB: Token, chainId?: ChainId): string;
    constructor(tokenAmountA: TokenAmount, tokenAmountB: TokenAmount, chainId?: ChainId);
    get token0(): Token;
    get token1(): Token;
    get token0Price(): Price;
    get token1Price(): Price;
    get reserve0(): TokenAmount;
    get reserve1(): TokenAmount;
    get swapFeeCoefficient(): JSBI;
    get swapFeeDivisor(): JSBI;
    getOutputAmount(inputAmount: TokenAmount, outputToken: Token): [TokenAmount, Pair];
    getInputAmount(outputAmount: TokenAmount, inputToken: Token): [TokenAmount, Pair];
    getLiquidityMinted(totalSupply: TokenAmount, depositTokenAmounts: TokenAmount[]): TokenAmount;
    getLiquidityValues(totalSupply: TokenAmount, liquidity: TokenAmount, options?: {
        feeOn?: boolean;
        kLast?: BigintIsh;
    }): TokenAmount[];
}
