import type { Artwork } from '../types/artwork';

const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export const fetchArtworks = async (page: number) => {
  const response = await fetch(`${BASE_URL}?page=${page}`);
  const json = await response.json();

  return {
    data: json.data as Artwork[],
    total: json.pagination.total
  };
};
