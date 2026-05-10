import { renderHook, act, waitFor } from '@lottery/testing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRegisteredLotteries } from '../useRegisteredLotteries';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockGetItem = AsyncStorage.getItem as jest.Mock;
const mockSetItem = AsyncStorage.setItem as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  mockGetItem.mockResolvedValue(null);
  mockSetItem.mockResolvedValue(undefined);
});

describe('useRegisteredLotteries', () => {
  it('loads persisted IDs from storage on mount', async () => {
    mockGetItem.mockResolvedValue(JSON.stringify(['id-1', 'id-2']));

    const { result } = renderHook(() => useRegisteredLotteries());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.isRegistered('id-1')).toBe(true);
    expect(result.current.isRegistered('id-2')).toBe(true);
    expect(result.current.isRegistered('id-3')).toBe(false);
  });

  it('adds IDs and persists them', async () => {
    const { result } = renderHook(() => useRegisteredLotteries());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(() => result.current.addRegisteredLotteries(['id-a', 'id-b']));

    expect(result.current.isRegistered('id-a')).toBe(true);
    expect(result.current.isRegistered('id-b')).toBe(true);
    expect(mockSetItem).toHaveBeenCalledWith(
      'registered_lotteries',
      expect.stringContaining('id-a')
    );
  });

  it('clears all registrations', async () => {
    mockGetItem.mockResolvedValue(JSON.stringify(['id-1']));
    const { result } = renderHook(() => useRegisteredLotteries());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(() => result.current.clearRegisteredLotteries());

    expect(result.current.isRegistered('id-1')).toBe(false);
    expect(mockSetItem).toHaveBeenCalledWith('registered_lotteries', '[]');
  });
});
