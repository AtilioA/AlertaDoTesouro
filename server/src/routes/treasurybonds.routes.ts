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
