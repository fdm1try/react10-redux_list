import { combineReducers, legacy_createStore } from 'redux';
import { itemListReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension'

export const configureStore = () => legacy_createStore(
  combineReducers({
    itemList: itemListReducer
  }), 
  composeWithDevTools()
);

export default configureStore;