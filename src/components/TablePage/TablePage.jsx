import React, {useEffect, useMemo, useState} from "react";
import "./TablePage.scss"
import WordList from "./WordList/WordList";
import AddWordForm from "./AddWordForm";
import WordBases from "./WordBases/WordBases";
import Paginator from "./Paginator/Paginator";
import {ReactComponent as LoadingSVG} from "../../assets/images/processing.svg";
import checkText from "./js/checkText";
import {ReactComponent as InitializationSVG} from "../../assets/images/initialization.svg";
import {CSSTransition} from "react-transition-group";
import {changeSortingMethod} from "./js/sortList";
import OperationInfo from "./OperationInfo";
import {setWordIsAlready} from "../../store/reducers/tablePageReducer";



const TablePage = (props) => {
  const [portionNumber, setPortionNum] = useState(1);
  const wordCount = Object.keys(props.words).length;

  const {sortingMethod} = props;

  const handleSubmit = (data) => {
    props.addWord({
      ...data,
      errorMessage: checkText(data)
    })
  };


  const changeSorting = () => {
    props.setSortingMethod(changeSortingMethod());
  };


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
                  pageNumber={props.pageNumber}
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
                         isProcessing={props.isProcessing}
                         wordIsAlready={props.wordIsAlready}
                         setWordIsAlready={props.setWordIsAlready}
            />
          </div>
          <OperationInfo
            isProcessing={props.isProcessing}
            wordIsAlready={props.wordIsAlready}
            setWordIsAlready={props.setWordIsAlready}
            addWordConfirm={props.addWordConfirm}
          />
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
                     setPageNumber={props.setPageNumber}
                     wordIsAlready={props.wordIsAlready}
          />
        </div>
        <Paginator pageNumber={props.pageNumber}
                   setPageNumber={props.setPageNumber}
                   totalItemsCount={wordCount}
                   itemsOnPage={props.wordsOnPage}
                   portionNumber={portionNumber}
                   setPortionNum={setPortionNum}
        />
        <div className="sort-changer"
             onClick={changeSorting}
             onMouseDown={(e) => e.preventDefault()}
        >
          <div className="sort-changer__info">
            { (sortingMethod === "engAZ" && "A - Z") ||
              (sortingMethod === "engZA" && "Z - A") ||
              (sortingMethod === "rusAZ" && "А - Я") ||
              (sortingMethod === "rusZA" && "Я - А")
            }
          </div>
          S
        </div>
      </div>
    </div>
  )
};

export default TablePage;
