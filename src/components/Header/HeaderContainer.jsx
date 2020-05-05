import React from "react";
import "./Header.scss"
import Header from "./Header";
import {connect} from "react-redux";
import {
  clearSelectedWords,
  searchEngWord,
  searchRusWord,
  setBaseToTransferTo,
  setMode,
  setSelectedWord,
  getBase
} from "../../store/reducers/tablePageReducer";


function HeaderContainer(props) {
  return (
    <Header {...props}/>
  )
}

const mapStateToProps = (state) => ({
  currentBaseName: state.tablePage.currentBaseName,
  isSearching: state.tablePage.isSearching
});


const mapDispatchToProps = {
  searchEngWord,
  searchRusWord,
  setMode,
  clearSelectedWords,
  setBaseToTransferTo,
  setSelectedWord,
  getBase
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
