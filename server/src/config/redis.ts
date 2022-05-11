import loadEnvOrThrow from '../utils/loadRequiredEnv';

export default {
  host: loadEnvOrThrow('REDIS_HOST'),
  port: loadEnvOrThrow('REDIS_PORT'),
};
