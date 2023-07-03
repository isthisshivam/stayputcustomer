import { createStore, combineReducers } from 'redux';
import RefreshCallbackReducer from '../reducers/RefreshCallbackReducer';
const rootReducer = combineReducers(
    { RefreshCallbackReducer: RefreshCallbackReducer }
);
const store = createStore(rootReducer);

export default store;