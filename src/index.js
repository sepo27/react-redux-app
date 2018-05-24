/* eslint-disable global-require */

import React from 'react';
import {render} from 'react-dom';

const renderApp = () => {
  const AppCom = require('./modules/core/AppCom').AppCom;
  render(
    <AppCom />,
    document.getElementById('root'),
  );
};

if (module.hot) {
  module.hot.accept('./modules/core/AppCom', () => {
    console.log('=== Hot reloading the app...');
    renderApp();
  });
}

renderApp();
