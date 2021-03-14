import {createStore,combineReducers} from 'redux';
import {orderReducer,userReducer,updateReducer} from './reducers';

const rootReducer = combineReducers({
    orderReducer: orderReducer,
    userReducer: userReducer,
    updateReducer:updateReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;