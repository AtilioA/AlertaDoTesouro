import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Notification from './Notification';

// Some miscellaneous texts that the API returns about the bond
interface treasuryBondTexts {
  investmentSubtitle: string;
  features: string;
  recommendedFor: string;
}

// Index the bond is associated to (e.g. SELIC, IPCA, etc)
interface Index {
  code: number;
  name: string;
}

@Entity('treasurybonds')
class TreasuryBond {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(type => Notification, notification => notification.bond)
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
  anualRedRate: number;

  @Column('float')
  minRedVal: number;

  @Column('text')
  ISIN: string;

  @Column('json')
  indexedTo: Index;

  @Column('timestamp with time zone')
  lastDateOfNegotiation?: Date;

  @Column('json')
  texts: treasuryBondTexts;
}

export default TreasuryBond;
