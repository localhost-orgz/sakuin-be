import dotenv from 'dotenv';

dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Env var \`${key}\` is required and cannot be undefined`);
  }
  return value;
}

const config = {
  app: {
    port: process.env.PORT || 3000,
    frontend_url: process.env.FRONTEND_URL || 'https://localhost:3000',
  },
  database: {
    mongo_uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  },
  google: {
    client_id: getEnv('GOOGLE_CLIENT_ID'),
    client_secret: getEnv('GOOGLE_CLIENT_SECRET'),
    callback_url: getEnv('GOOGLE_CALLBACK_URL'),
  },
  jwt: {
    secret_key: getEnv('JWT_SECRET_KEY'),
  },
};

export default config;
