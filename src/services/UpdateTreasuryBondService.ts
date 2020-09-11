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
          name: currentTb['FinIndxs']['cd'],
        };
        var texts = {
          investmentSubtitle: currentTb['invstmtStbl'],
          features: currentTb['featrs'],
          recommendedTo: currentTb['rcvgIncm'],
        };

        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(TreasuryBond)
          .values({
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
          })
          .orUpdate({
            conflict_target: ['code'],
            overwrite: [
              'code',
              'name',
              // 'expirationDate',
              // 'minimumInvestmentAmount',
              // 'investmentUnitaryValue',
              // 'semianualInterestIndex',
              // 'annualInvestmentRate',
              // 'annualRedRate',
              // 'minimumRedValue',
              // 'ISIN',
              // 'lastDateOfNegotiation',
              // 'indexedTo',
              // 'texts',
            ],
          })
          .execute();
        const treasuryBond = await treasuryBondsRepository.update(
          { code },
          {
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
          },
        );
        // console.log(treasuryBond);
        // await treasuryBondsRepository.save(treasuryBond);
      }

      return true;
    } catch (err) {
      throw new Error(
        'Failed while trying to update treasury bonds:' + err.message,
      );
    }
  }
}

export default UpdateTreasuryBondService;
