import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface TreasuryBondTexts {
  features: string;
  recommendedFor: string;
}

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

  @Column('text')
  investmentSubtitle: string;

  @Column('boolean')
  semianualInterestIndex: boolean;

  @Column('float')
  anualInvestmentRate: number;

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
