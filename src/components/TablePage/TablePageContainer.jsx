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
  toggleIsInitializing,
  transferWords,
  setMode,
  deleteWords,
  setServerError,
  unsetServerError
} from "../../store/reducers/tablePageReducer";
import {resetAddWord} from "../../store/reducers/reduxFormReducer";


const TablePageContainer = (props) => {
  useEffect(() => {
    props.getAllBasesNames();
    props.getInitBase()
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
  isProcessing: state.tablePage.isProcessing,
  isInitializing: state.tablePage.isInitializing,
  mode: state.tablePage.mode,
  serverError: state.tablePage.serverError
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
  unsetServerError
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(TablePageContainer);