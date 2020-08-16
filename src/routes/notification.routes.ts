import { Router } from 'express';
import { uuid } from 'uuidv4';
import TreasuryBond from '../models/TreasuryBond';

const notificationsRouter = Router();

// Stub until Notification model is implemented
interface Notification {
  id: string;
  bond: TreasuryBond;
  value: number;
  type: number;
  notifyByMail: boolean;
  notifyByBrowser: boolean;
}

// Stub until connection to database is implemented
const notifications: Notification[] = [];

notificationsRouter.post('/', (request, response) => {
  const { bond, value, type, notifyByMail, notifyByBrowser } = request.body;

  // Stub until connection to database is implemented
  const findNotificationForTheSameBond = notifications.find(
    notification => notification.bond.id === bond.id,
  );

  if (findNotificationForTheSameBond) {
    return response
      .status(400)
      .json({ message: 'A notification for this bond already exists.' });
  }

  const notification = {
    id: uuid(),
    bond,
    value,
    type,
    notifyByMail,
    notifyByBrowser,
  };

  // Stub until connection to database is implemented
  notifications.push(notification);

  return response.json(notification);
});

export default notificationsRouter;
