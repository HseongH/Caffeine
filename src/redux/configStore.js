// LIBRARY
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

// REDUCER
import user from './modules/user';
import post from './modules/post';
import image from './modules/image';
import comment from './modules/comment';

export const history = createBrowserHistory();
const rootReducer = combineReducers({ user, post, image, comment, router: connectRouter(history) });

const middlewares = [thunk.withExtraArgument({ history: history })];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
