import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import Thunk from 'redux-thunk';

import { Api } from './api';

const reducer = combineReducers({
  feed: () => ({})
});

export function configureStore(rootInitialState = {}) {
  const api = new Api('https://reqres.in/api/');

  const middlewares = [
    createLogger({ collapsed: true }),
    Thunk.withExtraArgument({ api }),
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    reducer,
    rootInitialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
}
