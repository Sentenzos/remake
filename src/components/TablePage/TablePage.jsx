import React, {useState} from "react";
import "./TablePage.scss"
import WordList from "./WordList/WordList";
import AddWordForm from "./AddWordForm";
import WordBases from "./WordBases";
import Paginator from "./Paginator";
import {addSelectedWord, clearSelectedWords} from "../../store/reducers/tablePageReducer";


function TablePage(props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [portionNumber, setPortionNum] = useState(1);
  const [mode, setMode] = useState(null);
  const wordCount = Object.keys(props.words).length;


  return (
    <div className="tables-page">
      <div className="table-page__content">
        <WordList basesNames={props.basesNames}
                  words={props.words}
                  currentBaseName={props.currentBaseName}
                  wordCount={wordCount}
                  pageNumber={pageNumber}
                  wordsOnPage={props.wordsOnPage}
                  mode={mode}
                  setMode={setMode}
                  selectedWords={props.selectedWords}
                  addSelectedWord={props.addSelectedWord}
                  clearSelectedWords={props.clearSelectedWords}
                  setBaseToTransferTo={props.setBaseToTransferTo}
                  baseToTransferTo={props.baseToTransferTo}
                  selectedWord={props.selectedWord}
                  setSelectedWord={props.setSelectedWord}
                  sortingMethod={props.sortingMethod}
                  setSortingMethod={props.setSortingMethod}
                  changeWord={props.changeWord}
                  isProcessing={props.isProcessing}
        />
        <div className="list-control">
          <div className="add-word_wrapper">
            <AddWordForm/>
          </div>
          <WordBases basesNames={props.basesNames}
                      getBase={props.getBase}
                      currentBaseName={props.currentBaseName}
                      mode={mode}
                      setBaseToTransferTo={props.setBaseToTransferTo}
                      baseToTransferTo={props.baseToTransferTo}
                      addNewBase={props.addNewBase}
                      deleteBase={props.deleteBase}
          />
        </div>
        <Paginator pageNumber={pageNumber}
                   setPageNumber={setPageNumber}
                   totalItemsCount={wordCount}
                   itemsOnPage={props.wordsOnPage}
                   portionNumber={portionNumber}
                   setPortionNum={setPortionNum}
        />
      </div>
    </div>
  )
}

export default TablePage;
