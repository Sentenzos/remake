import React, {useState} from "react";
import "./TablePage.scss"
import WordList from "./WordList/WordList";
import AddWordForm from "./AddWordForm";
import WordBases from "./WordBases";
import Paginator from "./Paginator";
import {addSelectedWord, clearSelectedWords} from "../../store/reducers/tablePageReducer";


// const arr = [
//   "common",
//   "learned",
//   "repeat",
//   "forgiven",
//   "something",
//   "just",
//   "name",
//   "eleven",
//   "symbols",
// ];

// const obj = {
//   "abomination": "мерзость",
//   "absorb": "поглощать",
//   "abundance": "изобилие",
//   "accelerate": "ускорять",
//   "accomplice": "соучастник",
//   "accomplish": "выполнять",
//   "accustom": "приучать",
//   "steady": "устойчивый, постоянный, стабилизировать",
//   "ache": "устойчивый, постоянный, стабилизировать",
//   "acrid": "едкий, резкий",
//   "adequate": "адекватный",
//   "adjective": "прилагательное",
//   "admission": "вход, прием, признание",
//   "admit": "признавать",
//   "adopt": "принимать",
//   "adore": "обожать",
//   "affect": "влиять",
//   "affectionate": "любящий",
// };


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