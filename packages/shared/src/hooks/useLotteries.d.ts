import type { Lottery } from '../types/index.js';
export declare function useLotteries(): {
  lotteries: Lottery[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};
