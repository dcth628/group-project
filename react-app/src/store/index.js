import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session'
import albumReducer from './album'
import playlistReducer from './playlist';
import songReducer from './song';
import playerReducer from './playerState';
import searchReducer from './search';
import likeReducer from './like';

const rootReducer = combineReducers({
  session: sessionReducer,
  albums: albumReducer,
  playlists: playlistReducer,
  songs: songReducer,
  search: searchReducer,
  player: playerReducer,
  like: likeReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
