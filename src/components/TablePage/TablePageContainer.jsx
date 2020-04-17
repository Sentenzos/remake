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
  deleteBase
} from "../../store/reducers/tablePageReducer";


const TablePageContainer = (props) => {
  useEffect(() => {
    props.getAllBasesNames();
    props.getInitBase()
  }, []);

  if (Object.keys(props.words).length === 0) return null;


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
  isProcessing: state.tablePage.isProcessing
});

const mapDispatchToProps = {
  getAllBasesNames,
  getInitBase,
  getBase,
  addSelectedWord,
  clearSelectedWords,
  setBaseToTransferTo,
  setSelectedWord,
  setSortingMethod,
  changeWord,
  addNewBase,
  deleteBase
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(TablePageContainer);