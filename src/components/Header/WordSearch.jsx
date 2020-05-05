import React, {useState} from "react";
import {CSSTransition} from "react-transition-group";
import {checkLanguage} from "../TablePage/js/checkLanguage";

const WordSearch = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [showTitle, setShowTitle] = useState(true);
  const [showInput, setShowInput] = useState(false);

  const handlePressingEnter = (e) => {
    if (e.key !== "Enter") return;
    let accordance;
    if (checkLanguage("english", inputValue)) {
      props.searchEngWord({
        word: inputValue,
        baseName: props.currentBaseName
      });
      accordance = true;
    } else if (checkLanguage("russian", inputValue)) {
      props.searchRusWord({
        word: inputValue,
        baseName: props.currentBaseName
      });
      accordance = true;
    }
    if (accordance) {
      //сброс состояний перед переходом в режим поиска
      props.setMode(null);
      props.clearSelectedWords();
      props.setBaseToTransferTo("");
      props.setSelectedWord(null);
    }
  };

  const deactivateSearch = () => {
    setShowInput(false);
    setInputValue("");
    if (props.isSearching) {
      props.getBase(props.currentBaseName);
    }
  };

  return (
    <div className="word-search">
      <CSSTransition in={showTitle} appear={true} timeout={250}
                     classNames="word-search__title"
                     unmountOnExit
                     onExited={() => setShowInput(true)}
      >
        <span className="word-search__title" onClick={() => setShowTitle(false)}>
          SEARCH
        </span>
      </CSSTransition>

      <CSSTransition in={showInput} timeout={250}
                     classNames="word-search__searcher"
                     unmountOnExit
                     onExited={() => setShowTitle(true)}>
        <div className="word-search__searcher">
          <div className="word-search__button" onClick={deactivateSearch}/>
          <input value={inputValue}
                 className="word-search__input"
                 autoFocus={true}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={handlePressingEnter}
          />
        </div>
      </CSSTransition>
    </div>
  )
};

export default WordSearch;