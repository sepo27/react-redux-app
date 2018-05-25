/* @flow */

import {createStore} from 'redux';
import {appReducer} from './appReducer';
import type {AppState, AppStore} from './types';

export const createAppStore = (
  preloadedState: AppState | typeof undefined,
): AppStore => createStore(
  appReducer,
  preloadedState,
);
