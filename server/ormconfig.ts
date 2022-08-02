import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import loadRequiredEnv from './src/utils/loadRequiredEnv';

dotenv.config();
const testEnv = dotenv.config({ path: '.env.test' });
if (testEnv.error) {
  throw testEnv.error;
}
const connectionOptions: ConnectionOptions[] = [
  {
    name: 'default',
    type: 'postgres',
    host: loadRequiredEnv('DB_HOST'),
    port: Number(loadRequiredEnv('DB_PORT')),
    username: loadRequiredEnv('POSTGRES_USER'),
    password: loadRequiredEnv('POSTGRES_PASSWORD'),
    database: loadRequiredEnv('POSTGRES_DB'),
    entities: ['./src/models/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    cli: {
      migrationsDir: './src/database/migrations',
    },
  },
  {
    name: 'test',
    type: 'postgres',
    host: loadRequiredEnv('DB_HOST_TEST'),
    port: Number(loadRequiredEnv('DB_PORT_TEST')),
    username: testEnv.parsed?.POSTGRES_USER,
    password: testEnv.parsed?.POSTGRES_PASSWORD,
    database: testEnv.parsed?.POSTGRES_DB,
    entities: ['./src/models/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    cli: {
      migrationsDir: './src/database/migrations',
    },
    dropSchema: true,
    logging: true,
  },
];

export = connectionOptions;
