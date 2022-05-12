import { Router } from 'express';
import { getRepository, RepositoryNotTreeError } from 'typeorm';
import CreateTreasuryBondService from '../services/CreateTreasuryBondService';
import TreasuryBond from '../models/TreasuryBond';
import UpdateTreasuryBondService from '../services/UpdateTreasuryBondService';

const treasuryBondsRouter = Router();

// List all treasuryBond endpoint
treasuryBondsRouter.get('/', async (_request, response) => {
  const treasuryBondsRepository = getRepository(TreasuryBond);
  const treasuryBond = await treasuryBondsRepository.find();

  return response.json(treasuryBond);
});

// Create treasuryBond endpoint
treasuryBondsRouter.post('/', async (request, response, next) => {
  try {
    const {
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
    } = request.body;

    const createTreasuryBond = new CreateTreasuryBondService();

    // Create and save it in the database
    const treasuryBond = await createTreasuryBond.execute({
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

    return response.json(treasuryBond);
  } catch (err) {
    next(err);
  }
});

// Update all treasury bonds
treasuryBondsRouter.put('/', async (_request, response, next) => {
  const updateTreasuryBonds = new UpdateTreasuryBondService();
  try {
    const checkResult = await updateTreasuryBonds.execute();
    console.log('Successfully updated all treasury bonds in the database!');
    return response.json({
      ok: checkResult,
      message: 'Successfully updated all treasury bonds',
    });
  } catch (err) {
    next(err);
  }
});

export default treasuryBondsRouter;
