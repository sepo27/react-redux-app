/* @flow */

import {createStore} from 'redux';
import {appReducer} from './appReducer';
import type {AppStore} from './types';

export const createAppStore = (): AppStore => createStore(
  appReducer,
);
