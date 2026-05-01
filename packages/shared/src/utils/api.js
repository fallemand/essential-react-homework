let apiUrl = 'http://localhost:3000';
export function setApiUrl(url) {
  apiUrl = url;
}
export function getApiUrl() {
  return apiUrl;
}
export async function createLottery(request) {
  const response = await fetch(`${apiUrl}/lotteries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create lottery');
  }
  return await response.json();
}
export async function getLotteries() {
  const response = await fetch(`${apiUrl}/lotteries`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch lotteries');
  }
  return await response.json();
}
export async function registerForLottery(lotteryId, name) {
  const response = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lotteryId, name }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to register for lottery');
  }
}
