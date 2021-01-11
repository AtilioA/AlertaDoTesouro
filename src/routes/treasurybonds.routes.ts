import { Router, request, response } from 'express';
import CreateTreasuryBondService from '../services/CreateTreasuryBondService';
import { getRepository } from 'typeorm';
import TreasuryBond from '../models/TreasuryBond';
import UpdateTreasuryBondService from '../services/UpdateTreasuryBondService';
const treasuryBondsRouter = Router();

// List all treasuryBond endpoint
treasuryBondsRouter.get('/', async (request, response) => {
  const treasuryBondsRepository = getRepository(TreasuryBond);
  const treasuryBond = await treasuryBondsRepository.find();

  return response.json(treasuryBond);
});

// Create treasuryBond endpoint
treasuryBondsRouter.post('/', async (request, response) => {
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
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

// Update all treasury bonds
treasuryBondsRouter.put('/', async (request, response) => {
  const updateTreasuryBonds = new UpdateTreasuryBondService();
  try {
    const checkResult = await updateTreasuryBonds.execute();
    console.log('Successfully updated all treasury bonds in the database!');
    response.json({
      ok: checkResult,
      message: 'Successfully updated all treasury bonds',
    });
  } catch (err) {
    console.log(err);
    response.json({ error: err.message });
  }
});

export default treasuryBondsRouter;
