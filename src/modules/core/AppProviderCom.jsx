/* @flow */

import React from 'react';
import {connect, Provider} from 'react-redux';
import type {AppState, AppStore} from './types';
import {AppCom} from './AppCom';

type Props = {
  store: AppStore,
};

export const AppProviderCom = ({store}: Props) => {
  const AppHoc = connect((state: AppState) => ({state}))(AppCom);

  return (
    <Provider store={store}>
      <AppHoc />
    </Provider>
  );
};
