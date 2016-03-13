import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import sampleReducer from './sampleReducer';

const rootReducer = combineReducers({
    app: sampleReducer,
    routing: routerReducer
});

export default rootReducer;
