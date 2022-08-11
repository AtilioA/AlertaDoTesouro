import type { Config } from '@jest/types';
import dotenv from 'dotenv';

dotenv.config();

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
export default config;
