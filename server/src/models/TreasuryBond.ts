// Model for a Treasury Bond

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import Notification from './Notification';

/**
 * @public
 * @interface TreasuryBondTexts
 * @description Some miscellaneous texts that the API returns about the bond
 * @property {string} investmentSubtitle - The subtitle/description for the investment
 * @property {string} features - // REVIEW
 * @property {string} recommendedFor - Description of who the bond is recommended for
 */
export interface treasuryBondTexts {
  investmentSubtitle: string;
  features: string;
  recommendedFor: string;
}

/**
 * @public
 * @interface Index
 * @description Index the bond is associated to (e.g. SELIC, IPCA, etc)
 * @property {number} code - The code of the index
 * @property {string} name - The name of the index
 */
export interface Index {
  code: number;
  name: string;
}

/**
 * @public
 * @class TreasuryBond
 * @description Model for a Treasury Bond
 * @property {number} id - Treasury Bond id
 * @property {Notification} notifications - The notifications associated with the bond
 * @property {number} code - The code of the bond
 * @property {string} name - The name of the bond
 * @property {Date} expirationDate - The expiration date of the bond (the last day to buy the bond) // REVIEW
 * @property {number} minimumInvestmentAmount - The minimum investment amount to purchase a slice of the bond // REVIEW
 * @property {number} investmentUnitaryValue - The investment unitary value of the bond // REVIEW
 * @property {number} semianualInterestIndex - The semianual interest index of the bond (when applicable)
 * @property {number} annualInterestIndex - The annual interest index of the bond
 * @property {number} annualRedRate - 🎷 // REVIEW
 * @property {number} minimumRedValue - 🎷 // REVIEW
 * @property {string} ISIN - The ISIN code of the bond
 * @property {json} indexedTo - The indexes (e.g. SELIC, IPCA, etc) that the bond is indexed to (when applicable)
 * @property {Date} lastDateOfNegotiation - The last date of negotiation of the bond (when the bond is not being traded anymore) // REVIEW
 * @property {json} treasuryBondTexts - Some miscellaneous texts that the API returns about the bond
 * @property {Date} created_at - The date when the bond was created in the database
 * @property {Date} updated_at - The date when the bond was updated in the database
 */
@Entity('treasurybond')
class TreasuryBond {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => Notification, notification => notification.bond)
  @JoinColumn({ name: 'notification_id' })
  notifications: Notification[];

  @Column('int')
  code: number;

  @Column('text')
  name: string;

  @Column('timestamp with time zone')
  expirationDate: Date;

  @Column('float')
  minimumInvestmentAmount: number;

  @Column('float')
  investmentUnitaryValue: number;

  @Column('boolean')
  semianualInterestIndex: boolean;

  @Column('float')
  annualInvestmentRate: number;

  @Column('float')
  annualRedRate: number;

  @Column('float')
  minimumRedValue: number;

  @Column('text')
  ISIN: string;

  @Column('json')
  indexedTo?: Index;

  @Column('timestamp with time zone')
  lastDateOfNegotiation?: Date;

  @Column('json')
  texts?: treasuryBondTexts;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default TreasuryBond;
