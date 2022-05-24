import { getRepository } from 'typeorm';
import TreasuryBond, { treasuryBondTexts, Index } from '../models/TreasuryBond';

/**
 * Interface for the request object for creating a new TreasuryBond.
 */
interface Request {
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
}

/**
 * @class CreateTreasuryBondService
 * @description Service for creating a new TreasuryBond.
 */
class CreateTreasuryBondService {
  public async execute({
    code,
    name,
    expirationDate,
    minimumInvestmentAmount,
    investmentUnitaryValue,
    semianualInterestIndex,
    annualInvestmentRate,
    annualRedRate,
    minimumRedValue,
    ISIN,
    indexedTo,
    texts,
  }: Request): Promise<TreasuryBond> {
    const treasuryBondsRepository = getRepository(TreasuryBond);

    const checkIfTreasuryBondExists: TreasuryBond | undefined  = await treasuryBondsRepository.findOne({
      where: { code },
    });

    if (checkIfTreasuryBondExists) {
      throw new Error('Treasury bond is already in the database.');
    }

    console.log(texts);
    const treasuryBond = treasuryBondsRepository.create({
      code,
      name,
      expirationDate,
      minimumInvestmentAmount,
      investmentUnitaryValue,
      semianualInterestIndex,
      annualInvestmentRate,
      annualRedRate,
      minimumRedValue,
      ISIN,
      indexedTo,
      texts,
    });

    await treasuryBondsRepository.save(treasuryBond);

    return treasuryBond;
  }
}

export default CreateTreasuryBondService;
