import JSBI from 'jsbi';
import { Token } from '../token';
import { ChainId } from '../../chains';
import { Price, TokenAmount } from '../fractions';
export declare abstract class Pool {
    readonly chainId: ChainId;
    readonly liquidityToken: Token;
    protected readonly tokenAmounts: TokenAmount[];
    protected constructor(chainId: ChainId, liquidityToken: Token, tokenAmounts: TokenAmount[]);
    get tokenCount(): number;
    get tokens(): Token[];
    involvesToken(token: Token): boolean;
    token(index: number): Token;
    tokenIndex(token: Token): number;
    get reserves(): TokenAmount[];
    reserveOfIndex(index: number): TokenAmount;
    reserveOfToken(token: Token): TokenAmount;
    priceOf(baseToken: Token, quoteToken: Token): Price;
    abstract getOutputAmount(inputAmount: TokenAmount, outputToken: Token): [TokenAmount, Pool];
    abstract getInputAmount(outputAmount: TokenAmount, inputToken: Token): [TokenAmount, Pool];
    abstract get swapFeeCoefficient(): JSBI;
    abstract get swapFeeDivisor(): JSBI;
    abstract getLiquidityMinted(totalSupply: TokenAmount, depositTokenAmounts: TokenAmount[]): TokenAmount;
    abstract getLiquidityValues(totalSupply: TokenAmount, shares: TokenAmount, options?: object): TokenAmount[];
}
