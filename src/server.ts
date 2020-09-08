import 'reflect-metadata';
import { app } from './app';
var cron = require('node-cron');

import './database';
import './tasks';

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
