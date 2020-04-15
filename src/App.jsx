import React from 'react';
import {Provider} from "react-redux";
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import CardsPage from "./components/CardsPage/CardsPage";
import reduxStore from "./store/reduxStore";
import TablePageContainer from "./components/TablePage/TablePageContainer";


function App() {

  return (
    <>
      <Header/>
      <Route path="/cards" render={() => <CardsPage/>}/>
      <Route path="/tables" render={() => <TablePageContainer/>}/>
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
