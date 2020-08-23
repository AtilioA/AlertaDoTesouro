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

// Update (upsert) all treasury bonds endpoint
treasuryBondsRouter.put('/updateAll', async (request, response) => {
  try {
    const updateTreasuryBond = new UpdateTreasuryBondService();

    const treasuryBond = await updateTreasuryBond.execute();

    return response.json(treasuryBond);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default treasuryBondsRouter;
