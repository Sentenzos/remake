import {combineReducers, createStore, applyMiddleware} from "redux";
import {reducer as formReducer} from "redux-form";
import thunk from "redux-thunk";
import {tablePageReducer} from "./reducers/tablePageReducer";
import {reduxFormReducer} from "./reducers/reduxFormReducer";


const reducers = combineReducers({
  tablePage: tablePageReducer,
  form: formReducer.plugin(reduxFormReducer)
});

const reduxStore = createStore(reducers, applyMiddleware(thunk));

window.reduxStore = reduxStore;

export default reduxStore;