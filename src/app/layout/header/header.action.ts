import { Action } from '@ngrx/store'

export const SEARCH_TEXT = '[Header] Search Text'

export class SearchTExtAction implements Action {
  readonly type = SEARCH_TEXT
  constructor(public text: string) {}
}

export type Actions =
SearchTExtAction
