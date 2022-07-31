type Notification = {
  id: string;
  treasuryBondName: string;
  treasuryBondMinimumInvestmentAmount: number;
  type: string;
  value: number;
  creationDate: string;
  active: boolean;
  notifyByEmail: boolean;
  notifyByBrowser: boolean;
};

export default Notification;
