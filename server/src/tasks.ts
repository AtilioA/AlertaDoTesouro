import cron from 'node-cron';
import CheckNotificationsValueService from './services/CheckNotificationsValueService';
import UpdateTreasuryBondService from './services/UpdateTreasuryBondService';
import loadRequiredEnv from './utils/loadRequiredEnv';

/**
 * Cron job to check the value of all treasury bonds and update the database.
 */
cron.schedule(loadRequiredEnv('UPDATE_CRON'), async () => {
  console.log('Running update-all-treasury-bonds task...');
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

/**
 * Cron job to check the value of all notifications, notify users and update the database.
 */
cron.schedule(loadRequiredEnv('NOTIFICATIONS_CRON'), async () => {
  console.log('Running check-all-notifications task...');
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
