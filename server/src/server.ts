import 'reflect-metadata';
import CreateServer from './app';
import loadRequiredEnv from './utils/loadRequiredEnv';

import './database';
import './tasks';

const PORT = loadRequiredEnv('PORT');

/**
 * Start the server
 */
CreateServer().listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
