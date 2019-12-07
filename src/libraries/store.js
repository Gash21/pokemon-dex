import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import mainReducer from 'pages/main/reducers'
import thunk from 'redux-thunk';
// import commonReducer from "./reducers/commonReducer";
let reducers = combineReducers({
  main: mainReducer
});
const middleware = [thunk];
const composedEnhancers = compose(applyMiddleware(...middleware));
// let initialState = {};
export const store = createStore(reducers, composedEnhancers);