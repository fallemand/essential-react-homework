import type { Lottery, CreateLotteryRequest } from '../types/index';

interface ErrorResponse {
  error: string;
}

let apiUrl = 'http://localhost:3000';

export function setApiUrl(url: string) {
  apiUrl = url;
}

export function getApiUrl(): string {
  return apiUrl;
}

export function initializeApiUrl(url: string | undefined) {
  if (!url) {
    throw new Error('API URL is not defined');
  }
  console.log('Setting API URL to:', url);
  setApiUrl(url);
}

export async function createLottery(
  request: CreateLotteryRequest
): Promise<Lottery> {
  const response = await fetch(`${apiUrl}/lotteries`, {
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
  console.log('Fetching lotteries from:', apiUrl);
  try {
    const response = await fetch(`${apiUrl}/lotteries`);
    console.log('Response status:', response.status);

    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse;
      throw new Error(error.error || 'Failed to fetch lotteries');
    }

    const data = (await response.json()) as Lottery[];
    console.log('Lotteries fetched:', data.length);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function registerForLottery(
  lotteryId: string,
  name: string
): Promise<void> {
  const response = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lotteryId, name }),
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorResponse;
    throw new Error(error.error || 'Failed to register for lottery');
  }
}
