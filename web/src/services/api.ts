import type { Lottery, CreateLotteryRequest } from '../types';

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ||
  'http://localhost:3000';

interface ErrorResponse {
  error: string;
}

export async function createLottery(
  request: CreateLotteryRequest,
): Promise<Lottery> {
  const response = await fetch(`${API_URL}/lotteries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorResponse;
    throw new Error(error.error || 'Failed to create lottery');
  }

  return (await response.json()) as Lottery;
}

export async function getLotteries(): Promise<Lottery[]> {
  const response = await fetch(`${API_URL}/lotteries`);

  if (!response.ok) {
    const error = (await response.json()) as ErrorResponse;
    throw new Error(error.error || 'Failed to fetch lotteries');
  }

  return (await response.json()) as Lottery[];
}
