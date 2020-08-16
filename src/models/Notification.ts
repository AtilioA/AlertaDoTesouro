import { v4 } from 'uuid';
import TreasuryBond from './TreasuryBond';

class Notification {
  id: string;
  bond: TreasuryBond;
  value: number;
  type: number;
  notifyByEmail: boolean;
  notifyByBrowser: boolean;

  constructor(
    bond: TreasuryBond,
    value: number,
    type: number,
    notifyByEmail: boolean,
    notifyByBrowser: boolean,
  ) {
    this.id = v4();
    this.bond = bond;
    this.value = value;
    this.type = type;
    this.notifyByEmail = notifyByEmail;
    this.notifyByBrowser = notifyByBrowser;
  }
}

export default Notification;
