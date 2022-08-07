/* eslint-disable @typescript-eslint/naming-convention */
// Replicates types from the backend on the frontend. Alternative would be to setup workspaces

export interface User {
  id: string;
  email: string;
  password: string;
  confirmed: boolean;
  notify: boolean;
  notifyByEmail: boolean;
  notifyByBrowser: boolean;
  created_at: Date;
  updated_at: Date;
}

export enum NotificationType {
  GREATER = 'maior',
  LESS = 'menor',
}
export interface Notification {
  id: string;
  user_id: string;
  user: User;
  bond: string;
  bond: TreasuryBond;
  value: number;
  type: NotificationType;
  notifyByEmail: boolean;
  notifyByBrowser: boolean;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface treasuryBondTexts {
  investmentSubtitle: string;
  features: string;
  recommendedFor: string;
}
export interface Index {
  code: number;
  name: string;
}
export interface TreasuryBond {
  id: string;
  notifications: Notification[];
  code: number;
  name: string;
  expirationDate: Date;
  minimumInvestmentAmount: number;
  investmentUnitaryValue: number;
  semianualInterestIndex: boolean;
  annualInvestmentRate: number;
  annualRedRate: number;
  minimumRedValue: number;
  ISIN: string;
  indexedTo?: Index;
  lastDateOfNegotiation?: Date;
  texts?: treasuryBondTexts;
  created_at: Date;
  updated_at: Date;
}
