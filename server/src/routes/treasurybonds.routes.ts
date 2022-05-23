import { Router } from 'express';
import { getRepository, RepositoryNotTreeError } from 'typeorm';
import CreateTreasuryBondService from '../services/CreateTreasuryBondService';
import TreasuryBond from '../models/TreasuryBond';
import UpdateTreasuryBondService from '../services/UpdateTreasuryBondService';

const treasuryBondsRouter = Router();

/**
 * Endpoint for listing all treasury bonds.
 */
treasuryBondsRouter.get('/', async (_request, response) => {
  const treasuryBondsRepository = getRepository(TreasuryBond);
  const treasuryBond = await treasuryBondsRepository.find();

  return response.json(treasuryBond);
});

/**
 * Endpoint for updating all treasury bonds. // REVIEW: this shouldn't exist...
 */
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
