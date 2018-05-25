/* @flow */

import React from 'react';
import styles from './AppCom.scss';
import type {AppDispatch, AppState} from './types';
import {changeAppTitleAction} from './actions';

type Props = {
  state: AppState,
  dispatch: AppDispatch,
};

export const AppCom = ({state, dispatch}: Props) => (
  <React.Fragment>
    <h1 className={styles.header}>{state.title}</h1>
    <div className={styles.inputContainer}>
      <input
        value={state.title}
        onChange={e => dispatch(changeAppTitleAction(e.target.value))}
      />
    </div>
  </React.Fragment>
);
