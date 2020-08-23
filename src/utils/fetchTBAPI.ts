import TreasuryBond from '../models/TreasuryBond';
const axios = require('axios');
var https = require('https');

export async function fetchTB(TBCode: number): Promise<TreasuryBond> {
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

  // Return TreasuryBond object (?)
  const treasuryBondObj = new TreasuryBond();

  console.log(treasuryBondJson);
  return new TreasuryBond();
}

export function updateTBs(): object {
  // Fetch & consume API
  // Return all data

  return {};
}
