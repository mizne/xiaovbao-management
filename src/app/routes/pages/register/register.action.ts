import { Action } from '@ngrx/store'

export const REGISTRY_REQUEST = '[Login] Registry Request'
export const REGISTRY_SUCCESS = '[Login] Registry Suceess'
export const REGISTRY_FAILURE = '[Login] Registry Failure'

export class RegistryRequestAction implements Action {
  readonly type = REGISTRY_REQUEST
  constructor(public payload: {
    name: string,
    password: string,
    phone: string,
    role: string,
    industry?: string
  }) {}
}
export class RegistrySuccessAction implements Action {
  readonly type = REGISTRY_SUCCESS
}
export class RegistryFailureAction implements Action {
  readonly type = REGISTRY_FAILURE
}


export type Actions =
RegistryRequestAction |
RegistrySuccessAction |
RegistryFailureAction
