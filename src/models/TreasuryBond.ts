import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import Notification from './Notification';

// Some miscellaneous texts that the API returns about the bond
export interface treasuryBondTexts {
  investmentSubtitle: string;
  features: string;
  recommendedFor: string;
}

// Index the bond is associated to (e.g. SELIC, IPCA, etc)
export interface Index {
  code: number;
  name: string;
}

@Entity('treasurybonds')
class TreasuryBond {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
