// Consume Tesouro Direto's API

import axios from 'axios';
import https from 'https';
import { treasuryBondTexts, Index } from '../models/TreasuryBond';

/**
 * Interface for the TreasuryBond object with data from the API.
 */
interface TreasuryBondJson {
  code: number;
  name: string;
  expirationDate: Date;
  minimumInvestmentAmount: number;
  investmentUnitaryValue: number;
  semianualInterestIndex: boolean;
  annualInvestmentRate: number;
  annualRedRate: number;
  minimumRedValue: number;
  ISIN: string;
  indexedTo?: Index;
  lastDateOfNegotiation?: Date;
  texts?: treasuryBondTexts;
}

/**
 * Fetches a specific TreasuryBond from Tesouro Direto's API with the given code.
 *
 * @param TBCode - Treasury bond code
 * @returns Treasury bond data
 */
export async function fetchTreasuryBondByCode(
  TBCode: number,
): Promise<TreasuryBondJson> {
  // Fetch API
  const APIUrl =
    'https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondinfo.json';
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const response = await axios.get(APIUrl, {
    httpsAgent: agent,
  });

  const treasuryBondList = response.data.response.TrsrBdTradgList;

  // Look for treasury bond by ID
  const treasuryBondJson = treasuryBondList.find(
    (tb: any) => tb.TrsrBd.cd === TBCode,
  );

  console.log(treasuryBondJson);
  return treasuryBondJson;
}

/**
 * Request treasury bond from Tesouro Direto's API
 *
 * @returns {Promise<Array<any>> | Promise<void>} - Array with treasury bond data or void if request fails
 */
export async function fetchListOfTreasuryBond(): Promise<Array<any>> {
  // Fetch API
  const APIUrl =
    'https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondinfo.json';

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const response = await axios.get(APIUrl, {
    httpsAgent: agent,
  });

  try {
    const treasuryBondList: Array<any> =
      response.data.response.TrsrBdTradgList;
    // console.log(treasuryBondList);
    console.log('Successfully fetched treasury bond from API.');
    return treasuryBondList;
  } catch (error) {
    console.log(`No treasury bond found: ${error}`);
    console.log('Unable to fetch treasury bond from API.');
    return [];
  }
}
