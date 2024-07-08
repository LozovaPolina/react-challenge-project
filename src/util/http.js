import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();


const CHALLENGES_URL = 'http://localhost:3000/challenges';

export async function fetchChallenges({ signal }) {
  const res = await fetch(CHALLENGES_URL, { signal });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the challenges.')
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const { challenges } = await res.json();
  return challenges;
}