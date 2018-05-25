/* @flow */

import React from 'react';
import {mount} from 'enzyme';
import {createAppStore} from '../../../src/modules/core/createAppStore';
import {AppProviderCom} from '../../../src/modules/core/AppProviderCom';
import {AppCom} from '../../../src/modules/core/AppCom';

describe('Integration tests demo', () => {
  it('should render initial App', () => {
    const
      store = createAppStore({
        title: 'Test App',
      }),
      app = mount(<AppProviderCom store={store} />),
      appCom = app.find(AppCom);

    expect(appCom).toHaveLength(1);
    expect(appCom.props()).toMatchObject({
      state: {
        title: 'Test App',
      },
    });
  });

  it('should change app title', () => {
    const
      store = createAppStore({
        title: 'Test App',
      }),
      app = mount(<AppProviderCom store={store} />),
      appCom = app.find(AppCom),
      inputEl = appCom.find('.inputContainer > input');

    expect(appCom.find('.header').text()).toEqual('Test App');

    inputEl.simulate('change', {target: {value: 'Test App Updated'}});

    expect(appCom.find('.header').text()).toEqual('Test App Updated');
  });
});
