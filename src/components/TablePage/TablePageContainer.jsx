import React, {useEffect} from "react";
import TablePage from "./TablePage";
import {connect} from "react-redux";
import {getAllBasesNames, getBase,
  getInitBase, addSelectedWord,
  clearSelectedWords, setBaseToTransferTo } from "../../store/reducers/tablePageReducer";


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
  baseToTransferTo: state.tablePage.baseToTransferTo
});

const mapDispatchToProps = {
  getAllBasesNames,
  getInitBase,
  getBase,
  addSelectedWord,
  clearSelectedWords,
  setBaseToTransferTo
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(TablePageContainer);