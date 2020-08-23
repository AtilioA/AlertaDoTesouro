import 'reflect-metadata';
import { app } from './app';
var cron = require('node-cron');

import './database';
import UpdateTreasuryBondService from './services/UpdateTreasuryBondService';

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});

// Update treasury bonds
const updateTreasuryBond = new UpdateTreasuryBondService();
cron.schedule('*/15 * * * *', () => {
  console.log('Running update-all-treasury-bonds task every 15 minutes...');
  try {
    updateTreasuryBond.execute();
    console.log('Updated treasury bonds entries in the database!');
  } catch (err) {
    console.log(err);
  }
});
