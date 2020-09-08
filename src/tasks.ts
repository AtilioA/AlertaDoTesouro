var cron = require('node-cron');
import axios from 'axios';

// Update treasury bonds and check notifications
cron.schedule('*/1 * * * *', async () => {
  console.log('Running update-all-treasury-bonds task every 15 minutes...');
  await axios.put('http://localhost:3333/treasurybonds');
  console.log('Updated all treasury bonds!');
});

cron.schedule('*/1 * * * *', async () => {
  console.log('Running check-all-notifications task every 15 minutes...');
  await axios.put('http://localhost:3333/notifications');
  console.log('Checked all notifications!');
});
