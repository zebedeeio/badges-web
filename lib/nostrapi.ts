const API_BASE = 'http://localhost:3000/api';

export const getBadgeDetails = async (badgeId: string) => {
  console.log({ badgeId });
  try {
    const res = await fetch(`${API_BASE}/v1/badges/${badgeId}`);
    const data = await res.json();
    console.log({ data });

    return { data, error: null };
  } catch (error) {
    console.log({ error });
    return { error, data: null };
  }
}

export const getBadgeAwardees = async (badgeId: string) => {
  try {
    const res = await fetch(`${API_BASE}/v1/badges/${badgeId}/awards`);
    const data = await res.json();

    return { data, error: null };
  } catch (error) {
    return { error, data: null };
  }
}