import {
  setApiUrl,
  getLotteries,
  createLottery,
  registerForLottery,
  initializeApiUrl,
} from '../api';

beforeEach(() => {
  setApiUrl('http://localhost:3000');
  global.fetch = jest.fn();
});

const mockFetch = () => global.fetch as jest.Mock;

describe('API utils', () => {
  describe('initializeApiUrl', () => {
    it('throws when url is undefined', () => {
      expect(() => initializeApiUrl(undefined)).toThrow(
        'API URL is not defined'
      );
    });
  });

  describe('getLotteries', () => {
    it('returns lotteries on success', async () => {
      const lotteries = [
        {
          id: '1',
          name: 'Test',
          prize: '$100',
          type: 'simple',
          status: 'running',
        },
      ];
      mockFetch().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(lotteries),
      });

      const result = await getLotteries();

      expect(result).toEqual(lotteries);
      expect(mockFetch()).toHaveBeenCalledWith(
        'http://localhost:3000/lotteries'
      );
    });

    it('throws with error message on failure', async () => {
      mockFetch().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Server error' }),
      });

      await expect(getLotteries()).rejects.toThrow('Server error');
    });
  });

  describe('registerForLottery', () => {
    it('sends correct payload', async () => {
      mockFetch().mockResolvedValue({ ok: true });

      await registerForLottery('lottery-1', 'Alice');

      expect(mockFetch()).toHaveBeenCalledWith(
        'http://localhost:3000/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lotteryId: 'lottery-1', name: 'Alice' }),
        }
      );
    });

    it('throws on failure', async () => {
      mockFetch().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Already registered' }),
      });

      await expect(registerForLottery('lottery-1', 'Alice')).rejects.toThrow(
        'Already registered'
      );
    });
  });
});
