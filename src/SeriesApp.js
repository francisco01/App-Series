import React from 'react';
import Router from './Router';

import { createStore, applyMiddleware } from 'redux';
import { Provider, createStoreHook } from 'react-redux';
import reduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(reduxThunk)
));

const SeriesApp = props => (
  <Provider store={store}>
    <Router/>
  </Provider>
);


export default SeriesApp;