import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  token: {
    accessToken: process.env.TOKEN_SECRET,
    refreshToken: process.env.REFRESH_TOKEN_SECRET,
  },
};

export const loadConfig = () => ({
  ...config,
});

export default config;
