import { combineReducers } from 'redux';


    import commonReducer from '../src/reducer/commonReducer';


    const rootReducer = combineReducers({

        common: commonReducer,

    }); 

    export default rootReducer;