/* @flow */

import type {Action} from '../globalTypes';

export type ChangeAppTitleAction = Action<string>;
export const
  CHANGE_APP_TITLE_ACTION = 'CHANGE_APP_TITLE_ACTION',
  changeAppTitleAction = (title: string) => ({
    type: CHANGE_APP_TITLE_ACTION,
    payload: title,
  });
