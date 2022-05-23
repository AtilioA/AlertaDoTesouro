import 'reflect-metadata';
import App from './app';
import loadRequiredEnv from './utils/loadRequiredEnv';

import './database';
import './tasks';

const PORT = loadRequiredEnv('PORT');

/**
 * Start the server
 */
App.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
