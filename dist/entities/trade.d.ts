import { ChainId } from '..';
import { TradeType } from '../constants';
import { Currency } from './currency';
import { CurrencyAmount } from './fractions/currencyAmount';
import { Percent } from './fractions/percent';
import { Price } from './fractions/price';
import { Pool } from './pools';
import { Route } from './route';
import { Token } from './token';
interface InputOutput {
    readonly inputAmount: CurrencyAmount;
    readonly outputAmount: CurrencyAmount;
}
export declare function inputOutputComparator(a: InputOutput, b: InputOutput): number;
export declare function tradeComparator(a: Trade, b: Trade): number;
export interface BestTradeOptions {
    maxNumResults?: number;
    maxHops?: number;
}
export interface DaasOptions {
    fee: Percent;
    feeTo: string;
}
/**
 * Represents a trade executed against a list of pools.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */
export declare class Trade {
    /**
     * The route of the trade, i.e. which pools the trade goes through.
     */
    readonly route: Route;
    /**
     * The type of the trade, either exact in or exact out.
     */
    readonly tradeType: TradeType;
    /**
     * The input amount for the trade assuming no slippage.
     */
    readonly inputAmount: CurrencyAmount;
    /**
     * The output amount for the trade assuming no slippage.
     */
    readonly outputAmount: CurrencyAmount;
    /**
     * The price expressed in terms of output amount/input amount.
     */
    readonly executionPrice: Price;
    /**
     * The mid price after the trade executes assuming no slippage.
     */
    readonly nextMidPrice: Price;
    /**
     * The percent difference between the mid price before the trade and the trade execution price.
     */
    readonly priceImpact: Percent;
    readonly chainId: ChainId;
    readonly fee: Percent;
    readonly feeTo: string;
    /**
     * Constructs an exact in trade with the given amount in and route
     * @param route route of the exact in trade
     * @param amountIn the amount being passed in
     * @param chainId chain id
     * @param daasOptions fee information possibly imposed via DEX as a service
     */
    static exactIn(route: Route, amountIn: CurrencyAmount, chainId?: ChainId, daasOptions?: DaasOptions): Trade;
    /**
     * Constructs an exact out trade with the given amount out and route
     * @param route route of the exact out trade
     * @param amountOut the amount returned by the trade
     * @param chainId chain id
     * @param daasOptions fee information possibly imposed via DEX as a service
     */
    static exactOut(route: Route, amountOut: CurrencyAmount, chainId?: ChainId, daasOptions?: DaasOptions): Trade;
    constructor(route: Route, amount: CurrencyAmount, tradeType: TradeType, chainId?: ChainId, { fee, feeTo }?: DaasOptions);
    /**
     * Get the minimum amount that must be received from this trade for the given slippage tolerance
     * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
     */
    minimumAmountOut(slippageTolerance: Percent): CurrencyAmount;
    /**
     * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
     * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
     */
    maximumAmountIn(slippageTolerance: Percent): CurrencyAmount;
    /**
     * Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
     * amount to an output token, making at most `maxHops` hops.
     * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
     * the amount in among multiple routes.
     * @param pools the pools to consider in finding the best trade
     * @param currencyAmountIn exact amount of input currency to spend
     * @param currencyOut the desired currency out
     * @param maxNumResults maximum number of results to return
     * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
     * @param fee total fee possibly imposed via DEX as a service
     * @param feeTo possible DEX as a service partner
     * @param currentPools used in recursion; the current list of pools
     * @param currentHops used in recursion; the current list of intermediate hops for pools with 3+ assets
     * @param originalAmountIn used in recursion; the original value of the currencyAmountIn parameter
     * @param bestTrades used in recursion; the current list of best trades
     */
    static bestTradeExactIn(pools: Pool[], currencyAmountIn: CurrencyAmount, currencyOut: Currency, { maxNumResults, maxHops }?: BestTradeOptions, { fee, feeTo }?: DaasOptions, currentPools?: Pool[], currentHops?: Token[], originalAmountIn?: CurrencyAmount, bestTrades?: Trade[]): Trade[];
    /**
     * similar to the above method but instead targets a fixed output amount
     * given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
     * to an output token amount, making at most `maxHops` hops
     * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
     * the amount in among multiple routes.
     * @param pools the pools to consider in finding the best trade
     * @param currencyIn the currency to spend
     * @param currencyAmountOut the exact amount of currency out
     * @param maxNumResults maximum number of results to return
     * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
     * @param fee total fee possibly imposed via DEX as a service
     * @param feeTo possible DEX as a service partner
     * @param currentPools used in recursion; the current list of pools
     * @param currentHops used in recursion; the current list of intermediate hops for pools with 3+ assets
     * @param originalAmountOut used in recursion; the original value of the currencyAmountOut parameter
     * @param bestTrades used in recursion; the current list of best trades
     */
    static bestTradeExactOut(pools: Pool[], currencyIn: Currency, currencyAmountOut: CurrencyAmount, { maxNumResults, maxHops }?: BestTradeOptions, { fee, feeTo }?: DaasOptions, currentPools?: Pool[], currentHops?: Token[], originalAmountOut?: CurrencyAmount, bestTrades?: Trade[]): Trade[];
}
export {};
