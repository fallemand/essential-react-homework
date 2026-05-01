import type { Lottery, CreateLotteryRequest } from '../types/index.js';
export declare function setApiUrl(url: string): void;
export declare function getApiUrl(): string;
export declare function createLottery(
  request: CreateLotteryRequest
): Promise<Lottery>;
export declare function getLotteries(): Promise<Lottery[]>;
export declare function registerForLottery(
  lotteryId: string,
  name: string
): Promise<void>;
