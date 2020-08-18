import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Some miscellaneous texts that the API returns about the bond
interface TreasuryBondTexts {
  investmentSubtitle: string;
  features: string;
  recommendedFor: string;
}

// Index the bond is associated to (e.g. SELIC, IPCA, etc)
interface Index {
  code: number;
  name: string;
}

class TreasuryBond {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  code: number;

  @Column('text')
  name: string;

  @Column('timestamp with time zone')
  expirationDate: Date;

  @Column('float')
  minimumInvestmentAmount: number;

  @Column('boolean')
  semianualInterestIndex: boolean;

  @Column('float')
  annualInvestmentRate: number;

  @Column('float')
  anualRedRate: number;

  @Column('text')
  ISIN: string;

  @Column('json')
  indexedTo: Index;

  @Column('timestamp with time zone')
  lastDateOfNegotiation?: Date;

  @Column('json')
  texts: TreasuryBondTexts;
}

export default TreasuryBond;
