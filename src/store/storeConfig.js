import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import clientsReducer from '#/store/reducers/clientsReducer';

const logger = createLogger({ collapsed: true });

const middleware = [thunk];

if (__DEV__) {
  middleware.push(logger);
}

const reducers = combineReducers({
  clients: clientsReducer
});

const storeConfig = () => {
  return createStore(reducers, applyMiddleware(...middleware));
};

export default storeConfig;
