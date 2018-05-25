/* @flow */

import type {AppState} from './types';
import type {Action} from '../globalTypes';
import {CHANGE_APP_TITLE_ACTION} from './actions';

const appInitState = {
  title: 'React Redux App',
};

export const appReducer = (state: AppState, action: Action<*>) => {
  if (state === undefined) return appInitState;

  switch (action.type) {
    case CHANGE_APP_TITLE_ACTION: {
      return {
        title: action.payload,
      };
    }

    default: return state;
  }
};
