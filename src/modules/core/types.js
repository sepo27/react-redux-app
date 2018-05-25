/* @flow */

import {Store, Dispatch} from 'redux';
import type {Action} from '../globalTypes';

export type AppState = {
  title: string,
};

export type AppStore = Store<AppState, Action<*>>;

export type AppDispatch = Dispatch<Action<*>>;
