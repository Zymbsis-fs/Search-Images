import axios, { AxiosResponse } from 'axios';

interface Params {
  per_page: number;
  orientation: string;
  page: number;
  query: string;
}

const axiosInstance = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    common: {
      Authorization: 'Client-ID A4eplQbkB0euKwNBTP19eiBat5fhE44v0gr8knE1Hjo',
    },
  },
});

async function splashRequest<T>(page: number, query: string): Promise<T> {
  const searchParams: Params = {
    per_page: 15,
    orientation: 'landscape',
    page: page,
    query: query,
  };
  const { data } = await axiosInstance.get<T>('/search/photos', {
    params: searchParams,
  });
  return data;
}

export default splashRequest;
