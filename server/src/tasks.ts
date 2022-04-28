import cron from 'node-cron';
import CheckNotificationsValueService from './services/CheckNotificationsValueService';
import UpdateTreasuryBondService from './services/UpdateTreasuryBondService';
import loadRequiredEnv from './utils/loadRequiredEnv';

// Update treasury bonds
cron.schedule(loadRequiredEnv('UPDATE_CRON'), async () => {
  console.log('Running update-all-treasury-bonds task every 15 minutes...');
  const updateTreasuryBonds = new UpdateTreasuryBondService();
  try {
    const checkResult = await updateTreasuryBonds.execute();
    console.log(
      `Successfully updated all treasury bonds in the database: ${checkResult}`,
    );
  } catch (err) {
    console.log(err);
  }
});

// Check notifications for treasury bonds rates
cron.schedule(loadRequiredEnv('NOTIFICATIONS_CRON'), async () => {
  console.log('Running check-all-notifications task every 15 minutes...');
  const checkNotifications = new CheckNotificationsValueService();
  try {
    const checkResult = await checkNotifications.execute();
    console.log(
      `Successfully checked all notifications in the database: ${checkResult}`,
    );
  } catch (err) {
    console.log(err);
  }
});
