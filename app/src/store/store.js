import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const middleware = [thunk];

function saveToLocalStorage(state) {
  try {
    const serializeState = JSON.stringify(state);
    localStorage.setItem('state', serializeState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializeState = localStorage.getItem('state');
    if (serializeState === null) return undefined;
    const parsedState = JSON.parse(serializeState);
    const state = {
      ...parsedState
    };
    return state;
  } catch (e) {
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();
var compose = 
  process.env.REACT_APP_ENVIRONMENT === "Production" ?
  applyMiddleware(...middleware) :
  composeWithDevTools(applyMiddleware(...middleware));

export const store = createStore(
  reducers,
  persistedState,
  compose
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
