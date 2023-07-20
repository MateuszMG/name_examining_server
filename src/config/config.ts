import dotenv from 'dotenv';
import { cleanEnv, makeValidator, port, str } from 'envalid';

dotenv.config();

const urlEpression = `(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})`;
const urlRegex = new RegExp(urlEpression);

const arrayOfUrls = makeValidator((urls) => {
  const urlArray = JSON.parse(urls);
  const booleanArray = urlArray.map((url: string) =>
    Array.isArray(url.match(urlRegex)),
  );
  const isFalsy = booleanArray.includes(false);

  if (!isFalsy) return JSON.parse(urls) as string[];
  else throw new Error('Expected url');
});

export const config = cleanEnv(process.env, {
  PORT: port(),

  DATABASE_URL: str(),
  WEBSITE_URLS: arrayOfUrls(),

  ACCESS_TOKEN_SECRET_KEY: str(),
  REFRESH_TOKEN_SECRET_KEY: str(),
});
