import React from 'react';
import {Provider} from "react-redux";
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import CardsPage from "./components/CardsPage/CardsPage";
import TablesPage from "./components/TablesPage/TablesPage";
import reduxStore from "./store/reduxStore";


function App() {

  return (
    <>
      <Header/>
      <Route path="/cards" render={() => <CardsPage/>}/>
      <Route path="/tables" render={() => <TablesPage/>}/>
    </>
  );
}


function AppWrapper(props) {
  return (
    <BrowserRouter>
      <Provider store={reduxStore}>
        <App/>
      </Provider>
    </BrowserRouter>
  )
}

export default AppWrapper;
