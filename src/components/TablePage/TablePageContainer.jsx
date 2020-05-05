import React, {useEffect} from "react";
import TablePage from "./TablePage";
import {connect} from "react-redux";
import {
  addNewBase,
  addSelectedWord,
  changeWord,
  clearSelectedWords,
  getAllBasesNames,
  getBase,
  getInitBase,
  setBaseToTransferTo,
  setSelectedWord,
  setSortingMethod,
  deleteBase,
  addWord,
  transferWords,
  setMode,
  deleteWords,
  setPageNumber,
  setWordIsAlready,
  addWordConfirm
} from "../../store/reducers/tablePageReducer";

import {
  setServerError,
  unsetServerError,
  toggleIsInitializing,
} from "../../store/reducers/mainReducer";

import {resetAddWord} from "../../store/reducers/reduxFormReducer";
import {changeSortingMethod} from "./js/sortList";


const TablePageContainer = (props) => {

  useEffect(() => {
    props.getAllBasesNames();
    props.getInitBase();
  }, []);


  return (
    <TablePage {...props}/>
  )
};


const mapStateToProps = (state) => ({
  basesNames: state.tablePage.allBases,
  words: state.tablePage.words,
  currentBaseName: state.tablePage.currentBaseName,
  wordsOnPage: state.tablePage.wordsOnPage,
  selectedWords: state.tablePage.selectedWords,
  baseToTransferTo: state.tablePage.baseToTransferTo,
  selectedWord: state.tablePage.selectedWord,
  sortingMethod: state.tablePage.sortingMethod,
  isProcessing: state.main.isProcessing,
  isInitializing: state.main.isInitializing,
  mode: state.tablePage.mode,
  serverError: state.main.serverError,
  pageNumber: state.tablePage.pageNumber,
  wordIsAlready: state.tablePage.wordIsAlready,
  isSearching: state.tablePage.isSearching
});

const mapDispatchToProps = {
  getAllBasesNames,
  getInitBase, getBase,
  addSelectedWord, clearSelectedWords,
  setBaseToTransferTo, setSelectedWord,
  setSortingMethod, changeWord,
  addNewBase, deleteBase,
  addWord, resetAddWord,
  toggleIsInitializing,
  transferWords,
  setMode,
  deleteWords,
  setServerError,
  unsetServerError,
  setPageNumber,
  setWordIsAlready,
  addWordConfirm
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(TablePageContainer);