import loadEnvOrThrow from '../utils/loadRequiredEnv';

export default {
  jwt: {
    secret: loadEnvOrThrow('JWT_SECRET'),
    expiresIn: loadEnvOrThrow('JWT_EXPIRES_IN'),
  },
};
