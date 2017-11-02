import { Action } from '@ngrx/store'
import { PreciseAnalysis } from '../models/precise-analysis.model'

export const FETCH_PRECISE_ANALYSIS = '[PreciseAnalysis] Fetch Precise Analysis'
export const FETCH_PRECISE_ANALYSIS_SUCCESS = '[PreciseAnalysis] Fetch Precise Analysis Success'
export const FETCH_PRECISE_ANALYSIS_FAILURE = '[PreciseAnalysis] Fetch Precise Analysis Failure'

export const FETCH_PRECISE_ANALYSIS_COUNT = '[PreciseAnalysis] Fetch Precise Analysis Count'
export const FETCH_PRECISE_ANALYSIS_COUNT_SUCCESS = '[PreciseAnalysis] Fetch Precise Analysis Count Success'
export const FETCH_PRECISE_ANALYSIS_COUNT_FAILURE = '[PreciseAnalysis] Fetch Precise Analysis Count Failure'

export const SEND_SMS = '[PreciseAnalysis] Send SMS'
export const SEND_SMS_SUCCESS = '[PreciseAnalysis] Send SMS Success'
export const SEND_SMS_FAILURE = '[PreciseAnalysis] Send SMS Failure'

export const BATCH_SEND_SMS = '[PreciseAnalysis] Batch Send SMS'
export const BATCH_SEND_SMS_SUCCESS = '[PreciseAnalysis] Batch Send SMS Success'
export const BATCH_SEND_SMS_FAILURE = '[PreciseAnalysis] Batch Send SMS Failure'

export class FectchPreciseAnalysisAction implements Action {
  readonly type = FETCH_PRECISE_ANALYSIS
  constructor(public payload: {
    action: number,
    startDate: string,
    endDate: string,
    pageIndex: number,
    pageSize: number
  }) {}
}

export class FetchPreciseAnalysisSuccessAction implements Action {
  readonly type = FETCH_PRECISE_ANALYSIS_SUCCESS
  constructor(public preciseAnalysis: PreciseAnalysis[]) {}
}

export class FetchPreciseAnalysisFailureAction implements Action {
  readonly type = FETCH_PRECISE_ANALYSIS_FAILURE
}


export class FetchPreciseAnalysisCountAction implements Action {
  readonly type = FETCH_PRECISE_ANALYSIS_COUNT
  constructor(public payload: {
    action: number,
    startDate: string,
    endDate: string
  }) {}
}

export class FetchPreciseAnalysisCountSuccessAction implements Action {
  readonly type = FETCH_PRECISE_ANALYSIS_COUNT_SUCCESS
  constructor(public count: number) {}
}

export class FetchPreciseAnalysisCountFailureAction implements Action {
  readonly type = FETCH_PRECISE_ANALYSIS_COUNT_FAILURE
}


export class SendSMSAction implements Action {
  readonly type = SEND_SMS
  constructor(public phones: string[]) {}
}

export class SendSMSSuccessAction implements Action {
  readonly type = SEND_SMS_SUCCESS
}

export class SendSMSFailureAction implements Action {
  readonly type = SEND_SMS_FAILURE
}

export class BatchSendSMSAction implements Action {
  readonly type = BATCH_SEND_SMS
  constructor(public phones: string[]) {}
}
export class BatchSendSMSSuccessAction implements Action {
  readonly type = BATCH_SEND_SMS_SUCCESS
  constructor(public phonesCount: number) {}
}
export class BatchSendSMSFailureAction implements Action {
  readonly type = BATCH_SEND_SMS_FAILURE
}




export type Actions =
FectchPreciseAnalysisAction |
FetchPreciseAnalysisSuccessAction |
FetchPreciseAnalysisFailureAction |

FetchPreciseAnalysisCountAction |
FetchPreciseAnalysisCountSuccessAction |
FetchPreciseAnalysisCountFailureAction |

SendSMSAction |
SendSMSSuccessAction |
SendSMSFailureAction |

BatchSendSMSAction |
BatchSendSMSSuccessAction |
BatchSendSMSFailureAction
