import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import mainReducer from 'pages/Main/reducers'
import detailReducer from 'pages/Detail/reducers'
import myPokemonReducer from 'pages/MyPokemon/reducers'
import thunk from 'redux-thunk';
let reducers = combineReducers({
  main: mainReducer,
  detail: detailReducer,
  myPokemon: myPokemonReducer
});

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const middleware = [thunk];
const composedEnhancers = compose(applyMiddleware(...middleware));
const persistReducers = persistReducer(persistConfig, reducers);
export const store = createStore(persistReducers, composedEnhancers);
export const persistor = persistStore(store);
