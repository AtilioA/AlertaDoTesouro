/**
 * Reponses for the National Treasury API
 */
export interface APIResponse {
  responseStatus: number;
  // Annotate any relevant explicit string we see on 'status' things
  responseStatusText: string | 'success';
  statusInfo: string | 'OK';
  response: TreasuryResponse;
}

export interface TreasuryResponse {
  BdTxTp: {
    cd: number;
  };
  TrsrBondMkt: {
    /// Opening DateTime
    opngDtTm: Date;
    /// Closing DateTime
    clsgDtTm: Date;
    qtnDtTm: Date;
    stsCd: number;
    /// Status
    sts: string | 'Fechado';
  };
  BizSts: {
    cd: number;
    dtTm: Date;
  };
  /// Trasury bond trading list
  TrsrBdTradgList: [Treasury];
}

export interface Treasury {
  cd: number;
  nm: string;
  featrs: string;
  mtrtyDt: Date;
  minInvstmtAmt: number;
  untrInvstmtVal: number;
  invstmtStbl: string;
  semiAnulIntrstInd: boolean;
  rcvgIncm: string;
  anulInvstmtRate: number;
  anulRedRate: number;
  minRedQty: number;
  untrRedVal: number;
  minRedVal: number;
  isinCd: string;
  FinIndxs: {
    cd: number;
    nm: string;
  };
  wdwlDt: Date;
}
