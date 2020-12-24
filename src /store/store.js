import {createStore,combineReducers} from 'redux';
import orderReducer from './reducers';

const rootReducer = combineReducers({
    orderReducer: orderReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;