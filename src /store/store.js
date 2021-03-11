import {createStore,combineReducers} from 'redux';
import {orderReducer,userReducer} from './reducers';

const rootReducer = combineReducers({
    orderReducer: orderReducer,
    userReducer: userReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;