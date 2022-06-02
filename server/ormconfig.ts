import dotenv from 'dotenv';
import loadRequiredEnv from './src/utils/loadRequiredEnv';

dotenv.config();

export = {
  type: loadRequiredEnv('DB_TYPE'),
  host: loadRequiredEnv('DB_HOST'),
  port: loadRequiredEnv('DB_PORT'),
  username: loadRequiredEnv('DB_USERNAME'),
  password: loadRequiredEnv('DB_PASSWORD'),
  database: loadRequiredEnv('DB_DATABASE'),
  entities: ['./src/models/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  migrationsTransactionMode: 'each',
};
