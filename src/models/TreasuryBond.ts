import { uuid } from 'uuidv4';

interface TreasuryBondTexts {
  features: string;
  recommendedFor: string;
}

interface Index {
  code: number;
  name: string;
}

class TreasuryBond {
  id: string;
  name: string;
  expirationDate: Date;
  minimumInvestmentAmount: number;
  investmentSubtitle: string;
  semianualInterestIndex: boolean;
  anualInvestmentRate: number;
  anualRedRate: number;
  ISIN: number;
  indexedTo: Index;
  lastDateOfNegotiation?: Date;
  texts: TreasuryBondTexts;

  constructor(
    name: string,
    expirationDate: Date,
    minimumInvestmentAmount: number,
    investmentSubtitle: string,
    semianualInterestIndex: boolean,
    anualInvestmentRate: number,
    ISIN: number,
    anualRedRate: number,
    lastDateOfNegotiation: Date,
    texts: TreasuryBondTexts,
    indexedTo: Index,
  ) {
    this.id = uuid();
    this.name = name;
    this.expirationDate = expirationDate;
    this.minimumInvestmentAmount = minimumInvestmentAmount;
    this.investmentSubtitle = investmentSubtitle;
    this.semianualInterestIndex = semianualInterestIndex;
    this.anualInvestmentRate = anualInvestmentRate;
    this.anualRedRate = anualRedRate;
    this.ISIN = ISIN;
    this.indexedTo = indexedTo;
    this.lastDateOfNegotiation = lastDateOfNegotiation;
    this.texts = texts;
  }
}

export default TreasuryBond;
