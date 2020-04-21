import React, {useEffect, useState} from "react";
import "./TablePage.scss"
import WordList from "./WordList/WordList";
import AddWordForm from "./AddWordForm";
import WordBases from "./WordBases/WordBases";
import Paginator from "./Paginator";
import {ReactComponent as LoadingSVG} from "../../assets/images/processing.svg";
import checkText from "./js/checkText";
import {ReactComponent as InitializationSVG} from "../../assets/images/initialization.svg";
import {CSSTransition} from "react-transition-group";


const TablePage = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [portionNumber, setPortionNum] = useState(1);
  const wordCount = Object.keys(props.words).length;


  const handleSubmit = (data) => {
    props.addWord({
      ...data,
      errorMessage: checkText(data)
    })
  };

  //если сервер прислал сообщение с ошибкой, то убрать его через...
  useEffect(() => {
    if (props.serverError.state) {
      setTimeout(() => props.unsetServerError(),
        3000);
    }
  }, [props.serverError.state]);


  if (props.isInitializing) {
    return <div className="is-initializing">
      <InitializationSVG className="is-initializing-svg"/>
    </div>
  }

  return (
    <div className="tables-page">
      <div className="table-page__content">
        <CSSTransition classNames="server-error"
                       in={props.serverError.state}
                       timeout={1000}
        >
          <div className="server-error">{props.serverError.message}</div>
        </CSSTransition>
        <WordList basesNames={props.basesNames}
                  words={props.words}
                  currentBaseName={props.currentBaseName}
                  wordCount={wordCount}
                  pageNumber={pageNumber}
                  wordsOnPage={props.wordsOnPage}
                  mode={props.mode}
                  setMode={props.setMode}
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
                  transferWords={props.transferWords}
                  deleteWords={props.deleteWords}
        />
        <div className="list-control">
          <div className="add-word__wrapper">
            <AddWordForm onSubmit={handleSubmit}
                         resetAddWord={props.resetAddWord}
            />
          </div>
          <div className="loading-svg__wrapper">
            {
              props.isProcessing &&
              <LoadingSVG className="loading-svg"/>
            }
          </div>
          <WordBases basesNames={props.basesNames}
                     getBase={props.getBase}
                     currentBaseName={props.currentBaseName}
                     mode={props.mode}
                     setBaseToTransferTo={props.setBaseToTransferTo}
                     baseToTransferTo={props.baseToTransferTo}
                     addNewBase={props.addNewBase}
                     deleteBase={props.deleteBase}
                     isProcessing={props.isProcessing}
                     setMode={props.setMode}
                     setSelectedWord={props.setSelectedWord}
          />
        </div>
        <Paginator pageNumber={pageNumber}
                   setPageNumber={setPageNumber}
                   totalItemsCount={wordCount}
                   itemsOnPage={props.wordsOnPage}
                   portionNumber={portionNumber}
                   setPortionNum={setPortionNum}
        />
        <div className="sort-changer">
          S
        </div>
      </div>
    </div>
  )
};

export default TablePage;
