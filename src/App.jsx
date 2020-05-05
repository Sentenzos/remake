import React, {useEffect} from 'react';
import {connect} from "react-redux";
import './App.scss';
import {Route} from "react-router-dom";
import TablePageContainer from "./components/TablePage/TablePageContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {unsetServerError} from "./store/reducers/mainReducer";
import CardsPageContainer from "./components/CardsPage/CardsPageContainer";


function App(props) {

  //если сервер прислал сообщение с ошибкой, то убрать его через...
  useEffect(() => {
    if (props.serverError.state) {
      setTimeout(() => props.unsetServerError(),
        3000);
    }
  }, [props.serverError.state]);

  return (
    <>
      <HeaderContainer/>
      <Route path="/cards" render={() => <CardsPageContainer/>}/>
      <Route path="/tables" render={() => <TablePageContainer/>}/>
    </>
  );
}


const mapStateToProps = (state) => ({
  serverError: state.main.serverError
});

const mapDispatchToProps = {
  unsetServerError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
