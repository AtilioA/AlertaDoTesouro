import TreasuryBond from './TreasuryBond';

type Notification = {
  id: string;
  bond: TreasuryBond;
  treasuryBondMinimumInvestmentAmount: number;
  type: string;
  value: number;
  created_at: string;
  active: boolean;
  notifyByEmail: boolean;
  notifyByBrowser: boolean;
};

export default Notification;
