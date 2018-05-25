/* @flow */

import {appInitState, appReducer} from './appReducer';
import {changeAppTitleAction} from './actions';

describe('appReducer()', () => {
  it('should handle initial state', () => {
    // $FlowFixMe
    expect(appReducer(undefined, {})).toEqual({
      title: 'React Redux App',
    });
  });

  it('should change title', () => {
    const
      state = appInitState,
      action = changeAppTitleAction('React Redux App Boilerplate');

    expect(appReducer(state, action)).toEqual({
      title: 'React Redux App Boilerplate',
    });
  });
});
