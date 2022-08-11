/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-restricted-syntax */
import * as uuid from 'uuid';
import { getRepository } from 'typeorm';
import TreasuryBond from '../models/TreasuryBond';
import { fetchListOfTreasuryBond } from '../utils/fetchTBAPI';

/**
 * @class UpdateTreasuryBondService
 * @description Service for updating a TreasuryBond.
 */
class UpdateTreasuryBondService {
  public async execute(): Promise<boolean> {
    const treasuryBondRepository = getRepository(TreasuryBond);

    const treasuryBondList = await fetchListOfTreasuryBond();
    try {
      for (const tb of treasuryBondList) {
        const currentTb = tb.TrsrBd;
        const code = currentTb.cd;
        const name = currentTb.nm;
        const expirationDate = currentTb.mtrtyDt;
        let minimumInvestmentAmount = currentTb.minInvstmtAmt;
        const investmentUnitaryValue = currentTb.untrInvstmtVal;
        const semianualInterestIndex = currentTb.semiAnulIntrstInd;
        let annualInvestmentRate = currentTb.anulInvstmtRate;
        const annualRedRate = currentTb.anulRedRate;
        const minimumRedValue = currentTb.minRedVal;
        const ISIN = currentTb.isinCd;
        const lastDateOfNegotiation = currentTb.wdwlDt;
        const indexedTo = {
          code: currentTb.FinIndxs.cd,
          name: currentTb.FinIndxs.nm,
        };
        const texts = {
          investmentSubtitle: currentTb.invstmtStbl,
          features: currentTb.featrs,
          recommendedTo: currentTb.rcvgIncm,
        };

        if (lastDateOfNegotiation) {
          annualInvestmentRate = annualRedRate;
          minimumInvestmentAmount = minimumRedValue;
        }

        // Insert treasurybond into database or update if already exists
        const treasuryBond = treasuryBondRepository.create({
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
          lastDateOfNegotiation,
          indexedTo,
          texts,
        });
        // Generate uuid to be used if TreasuryBond is new
        treasuryBond.id = uuid.v4();

        const treasuryBondExists: TreasuryBond | undefined =
          await treasuryBondRepository.findOne({
            where: { code },
          });
        // If it doesn't exist, insert it
        if (treasuryBondExists) {
          treasuryBond.id = treasuryBondExists.id;
          await treasuryBondRepository.update(treasuryBond.id, treasuryBond);
        } else {
          await treasuryBondRepository.insert(treasuryBond);
        }
        await treasuryBondRepository.save(treasuryBond);
      }

      return true;
    } catch (err) {
      console.log(`Failed while trying to update treasury bond:${err}`);
      return false;
    }
  }
}

export default UpdateTreasuryBondService;
