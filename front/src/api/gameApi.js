const BASE_URL = '/api/game';

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Server error');
  }
  return res.json();
}

export async function startGame() {
  return fetchJson(`${BASE_URL}/start`);
}

export async function playTurn(battleState, heroMove) {
  return fetchJson(`${BASE_URL}/turn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ battleState, heroMove }),
  });
}
