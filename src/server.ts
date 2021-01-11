import 'reflect-metadata';
import { app } from './app';
var cron = require('node-cron');

import './database';
import './tasks';

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}!`);
});
