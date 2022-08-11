import { Router } from 'express';
import { getRepository, RepositoryNotTreeError } from 'typeorm';
import CreateTreasuryBondService from '../services/CreateTreasuryBondService';
import TreasuryBond from '../models/TreasuryBond';
import UpdateTreasuryBondService from '../services/UpdateTreasuryBondService';

const treasuryBondRouter = Router();

/**
 * Endpoint for listing all treasury bond.
 */
treasuryBondRouter.get('/', async (_request, response) => {
  const treasuryBondRepository = getRepository(TreasuryBond);
  const treasuryBond = await treasuryBondRepository.find();

  return response.json(treasuryBond);
});

/**
 * Endpoint for listing a specific treasury bond.
 */
treasuryBondRouter.get('/:id', async (_request, response) => {
  const treasuryBondsRepository = getRepository(TreasuryBond);
  const treasuryBond = await treasuryBondsRepository.find({
    where: { id: _request.params.id },
  });

  return response.json(treasuryBond);
});

/**
 * Endpoint for updating all treasury bond. // REVIEW: this shouldn't exist...
 */
treasuryBondRouter.put('/', async (_request, response, next) => {
  const updateTreasuryBond = new UpdateTreasuryBondService();
  try {
    const checkResult = await updateTreasuryBond.execute();
    console.log('Successfully updated all treasury bond in the database!');
    return response.json({
      ok: checkResult,
      message: 'Successfully updated all treasury bond',
    });
  } catch (err) {
    next(err);
  }
});

export default treasuryBondRouter;
