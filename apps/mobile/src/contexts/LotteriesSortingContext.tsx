import {
  createContext,
  useContext,
  useReducer,
  type DispatchWithoutAction,
  type ReactNode,
} from 'react';

export enum LotteryListSortingOptions {
  Ascending,
  Descending,
}

interface LotteriesSortingContextValue {
  selectedSorting: LotteryListSortingOptions;
  switchSorting: DispatchWithoutAction;
}

export const LotteriesSortingContext =
  createContext<LotteriesSortingContextValue | null>(null);

const sortingReducer = (state: LotteryListSortingOptions) => {
  return state === LotteryListSortingOptions.Ascending
    ? LotteryListSortingOptions.Descending
    : LotteryListSortingOptions.Ascending;
};

interface LotteriesSortingContextProviderProps {
  children: ReactNode;
}

export const LotteriesSortingContextProvider = ({
  children,
}: LotteriesSortingContextProviderProps) => {
  const [selectedSorting, switchSorting] = useReducer(
    sortingReducer,
    LotteryListSortingOptions.Ascending
  );

  const value: LotteriesSortingContextValue = {
    selectedSorting,
    switchSorting,
  };

  return (
    <LotteriesSortingContext.Provider value={value}>
      {children}
    </LotteriesSortingContext.Provider>
  );
};

export const useLotteriesSortingContext = () => {
  const context = useContext(LotteriesSortingContext);

  if (context === null) {
    throw new Error(
      'useLotteriesSortingContext must be used within a LotteriesSortingContextProvider'
    );
  }

  return context;
};
