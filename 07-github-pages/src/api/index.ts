import getEndpoints from '../server/db';
import { GITHUB_REPO, GITHUB_USER } from '../config';

const endpoints = getEndpoints();

type ENDPOINTS = keyof typeof endpoints;

type RESPONSE_DATA = {
  greeting: string;
};

const getJson = async <T>(endpoint: ENDPOINTS): Promise<T> => {
  const path =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3001/api/${String(endpoint)}`
      : `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/gh-pages/static/db/${String(endpoint)}.json`;

  const response = await fetch(path);
  return (await response.json()) as T;
};

type API = {
  get: {
    data: () => Promise<RESPONSE_DATA>;
  };
};

const api: API = {
  get: {
    data: () => getJson<RESPONSE_DATA>('data'),
  },
};

export type { RESPONSE_DATA, ENDPOINTS };
export default api;
