/* @flow */

import type {Action as ReduxAction} from 'redux';

export type Action<P> = ReduxAction<string> & {
  payload: P,
};
