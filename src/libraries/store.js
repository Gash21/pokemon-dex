import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import mainReducer from 'pages/Main/reducers'
import detailReducer from 'pages/Detail/reducers'
import myPokemonReducer from 'pages/MyPokemon/reducers'
import thunk from 'redux-thunk';
// import commonReducer from "./reducers/commonReducer";
let reducers = combineReducers({
  main: mainReducer,
  detail: detailReducer,
  myPokemon: myPokemonReducer
});
const middleware = [thunk];
const composedEnhancers = compose(applyMiddleware(...middleware));
// let initialState = {};
export const store = createStore(reducers, composedEnhancers);