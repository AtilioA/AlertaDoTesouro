var cron = require('node-cron');
import axios from 'axios';
import CheckNotificationsValueService from './services/CheckNotificationsValueService';
import UpdateTreasuryBondService from './services/UpdateTreasuryBondService';

// Update treasury bonds
cron.schedule(process.env.UPDATE_CRON, async () => {
  console.log('Running update-all-treasury-bonds task every 15 minutes...');
  const updateTreasuryBonds = new UpdateTreasuryBondService();
  try {
    const checkResult = await updateTreasuryBonds.execute();
    console.log('Successfully updated all treasury bonds in the database: ' + checkResult);
  } catch (err) {
    console.log(err);
  }
});

// Check notifications for treasury bonds rates
cron.schedule(process.env.NOTIFICATION_CRON, async () => {
  console.log('Running check-all-notifications task every 15 minutes...');
  const checkNotifications = new CheckNotificationsValueService();
  try {
    const checkResult = await checkNotifications.execute();
    console.log('Successfully checked all notifications in the database: ' + checkResult);
  } catch (err) {
    console.log(err);
  }
});
