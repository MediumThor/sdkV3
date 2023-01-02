import JSBI from 'jsbi';
import { Pool } from './pool';
import { Token } from '../token';
import { ChainId } from '../../chains';
import { TokenAmount } from '../fractions';
export declare const TARGET_DECIMAL: JSBI;
export declare const MIN_RESERVE: JSBI;
export declare class Vault extends Pool {
    readonly amp: JSBI;
    static getAddress(tokens: Token[]): string;
    constructor(tokenAmounts: TokenAmount[], amp: JSBI, chainId?: ChainId);
    get reserves_c(): JSBI[];
    static amount_to_c_amount(amount: JSBI, decimals: number): JSBI;
    static c_amount_to_amount(c_amount: JSBI, decimals: number): JSBI;
    /**
     * Returns the swap fee coefficient (x / DIVISOR) for swaps utilizing the vault.
     * Where (1 - (x/DIVISOR)) of each swap belongs to the LPs
     */
    get swapFeeCoefficient(): JSBI;
    get swapFeeDivisor(): JSBI;
    getOutputAmount(inputAmount: TokenAmount, outputToken: Token): [TokenAmount, Vault];
    getInputAmount(_outputToken: TokenAmount, _inputToken: Token): [TokenAmount, Vault];
    getLiquidityMinted(totalSupply: TokenAmount, depositTokenAmounts: TokenAmount[]): TokenAmount;
    getLiquidityValues(totalSupply: TokenAmount, shares: TokenAmount): TokenAmount[];
    getLiquidityValuesByTokens(totalSupply: TokenAmount, withdrawTokenAmounts: TokenAmount[]): TokenAmount;
    private calc_y;
    private calc_d;
    private normalized_trade_fee;
}
