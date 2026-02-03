import { Pot } from '@/lib/definitions';

// Client-side fetch for pots
export async function fetchPotsClient(): Promise<Pot[]> {
  const response = await fetch('/api/pots');
  if (!response.ok) throw new Error('Failed to fetch pots');
  return response.json();
}
