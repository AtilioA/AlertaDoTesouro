import 'reflect-metadata';
import app from './app';
import loadRequiredEnv from './utils/loadRequiredEnv';

const PORT = loadRequiredEnv('PORT');

/**
 * Start the server
 */
app.listen(PORT, () => {
  console.log(`🚀Server started on port ${PORT}!`);
});
