import {combineReducers, createStore, applyMiddleware} from "redux";
import {reducer as formReducer} from "redux-form";
import thunk from "redux-thunk";
import {tablePageReducer} from "./reducers/tablePageReducer";
import {reduxFormReducer} from "./reducers/reduxFormReducer";
import {mainReducer} from "./reducers/mainReducer";
import {cardsPageReducer} from "./reducers/cardsPageReducer";
import {homePageReducer} from "./reducers/homePageReducer";


const reducers = combineReducers({
  main: mainReducer,
  homePage: homePageReducer,
  cardsPage: cardsPageReducer,
  tablePage: tablePageReducer,
  form: formReducer.plugin(reduxFormReducer)
});

const reduxStore = createStore(reducers, applyMiddleware(thunk));

window.reduxStore = reduxStore;

export default reduxStore;