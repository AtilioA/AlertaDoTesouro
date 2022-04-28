import * as uuid from 'uuid'
import { getRepository, getConnection } from 'typeorm';
import TreasuryBond, { treasuryBondTexts, Index } from '../models/TreasuryBond';
import { fetchListOfTreasuryBonds } from '../utils/fetchTBAPI';

class UpdateTreasuryBondService {
  public async execute(): Promise<any> {
    const treasuryBondsRepository = getRepository(TreasuryBond);

    const treasuryBondsList = await fetchListOfTreasuryBonds();
    try {
      for (let tb of treasuryBondsList) {
        let currentTb = tb['TrsrBd'];
        var code = currentTb['cd'];
        console.log;
        var name = currentTb['nm'];
        var expirationDate = currentTb['mtrtyDt'];
        var minimumInvestmentAmount = currentTb['minInvstmtAmt'];
        var investmentUnitaryValue = currentTb['untrInvstmtVal'];
        var semianualInterestIndex = currentTb['semiAnulIntrstInd'];
        var annualInvestmentRate = currentTb['anulInvstmtRate'];
        var annualRedRate = currentTb['anulRedRate'];
        var minimumRedValue = currentTb['minRedVal'];
        var ISIN = currentTb['isinCd'];
        var lastDateOfNegotiation = currentTb['wdwlDt'];
        var indexedTo = {
          code: currentTb['FinIndxs']['cd'],
          name: currentTb['FinIndxs']['nm'],
        };
        var texts = {
          investmentSubtitle: currentTb['invstmtStbl'],
          features: currentTb['featrs'],
          recommendedTo: currentTb['rcvgIncm'],
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
      console.log(
        'Failed while trying to update treasury bonds:' + err,
      );
      return false;
    }
  }
}

export default UpdateTreasuryBondService;
