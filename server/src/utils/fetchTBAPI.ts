// Consume Tesouro Direto's API

import { treasuryBondTexts, Index } from '../models/TreasuryBond';
const axios = require('axios');
var https = require('https');

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

export async function fetchTreasuryBondByCode(
  TBCode: number,
): Promise<TreasuryBondJson> {
  // Fetch API
  const APIUrl =
    'https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json';
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const response = await axios.get(APIUrl, {
    httpsAgent: agent,
  });

  const treasuryBondsList = response['data']['response']['TrsrBdTradgList'];

  // console.log(treasuryBondsList);
  // for (let tb of treasuryBondsList) {
  //   console.log(tb['TrsrBd']['cd']);
  // }

  // Look for treasury bond by ID
  const treasuryBondJson = treasuryBondsList.find(
    (tb: any) => tb['TrsrBd']['cd'] === TBCode,
  );

  console.log(treasuryBondJson);
  return treasuryBondJson;
}

export async function fetchListOfTreasuryBonds(): Promise<Array<any>> {
  // Fetch API
  const APIUrl =
    'https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json';

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const response = await axios.get(APIUrl, {
    httpsAgent: agent,
  });

  try {
    const treasuryBondsList: Array<any> = response['data']['response']['TrsrBdTradgList'];
    // console.log(treasuryBondsList);
    console.log("Successfully fetched treasury bonds from API.");
    return treasuryBondsList;
  } catch (error) {
    console.log("No treasury bonds found: " + error);
    console.log("Unable to fetch treasury bonds from API.");
    return [];
  }
}
