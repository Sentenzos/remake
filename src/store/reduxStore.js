import {combineReducers, createStore, applyMiddleware} from "redux";
import {reducer as formReducer} from "redux-form";
import thunk from "redux-thunk";


const reducers = combineReducers({
  form: formReducer
});

const reduxStore = createStore(reducers, applyMiddleware(thunk));

export default reduxStore;