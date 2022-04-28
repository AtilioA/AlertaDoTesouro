import * as uuid from 'uuid';
import { getRepository } from 'typeorm';
import TreasuryBond from '../models/TreasuryBond';
import { fetchListOfTreasuryBonds } from '../utils/fetchTBAPI';

class UpdateTreasuryBondService {
  public async execute(): Promise<any> {
    const treasuryBondsRepository = getRepository(TreasuryBond);

    const treasuryBondsList = await fetchListOfTreasuryBonds();
    try {
      for (const tb of treasuryBondsList) {
        const currentTb = tb.TrsrBd;
        const code = currentTb.cd;
        const name = currentTb.nm;
        const expirationDate = currentTb.mtrtyDt;
        const minimumInvestmentAmount = currentTb.minInvstmtAmt;
        const investmentUnitaryValue = currentTb.untrInvstmtVal;
        const semianualInterestIndex = currentTb.semiAnulIntrstInd;
        const annualInvestmentRate = currentTb.anulInvstmtRate;
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

        // Insert treasurybond into database or update if already exists
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
          lastDateOfNegotiation,
          indexedTo,
          texts,
        });
        // Generate uuid to be used if TreasuryBond is new
        treasuryBond.id = uuid.v4();

        const treasuryBondExists = await treasuryBondsRepository.findOne({
          where: { code },
        });
        // console.log("TreasuryBond exists: " + JSON.stringify(treasuryBondExists));
        // If it doesn't exist, insert it
        if (treasuryBondExists) {
          treasuryBond.id = treasuryBondExists.id;
          treasuryBondsRepository.update(treasuryBond.id, treasuryBond);
        } else {
          await treasuryBondsRepository.insert(treasuryBond);
        }
        treasuryBondsRepository.save(treasuryBond);
      }

      return true;
    } catch (err) {
      console.log(`Failed while trying to update treasury bonds:${err}`);
      return false;
    }
  }
}

export default UpdateTreasuryBondService;
