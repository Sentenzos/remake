import React, {useMemo} from "react";
import "../TablePage.scss"
import disableDoubleClick from "./../js/disableDoubleClick";
import WordControlMenu from "./WordControlMenu";
import SortList from "../js/sortList";
import TdElem from "./TdElem";
import checkLanguage from "../js/checkLanguage";


const WordList = React.memo((props) => {

  const {
    selectedWord, setSelectedWord,
    sortingMethod, setSortingMethod
  } = props;

  //отсортированный массив массивов со словами [слово, перевод]
  const sortedWords = useMemo(() => {
    const sorter = new SortList(props.words);
    return sorter.sort(sortingMethod);
  }, [props.words, sortingMethod]);

  //с какого по какой индекс должны быть отображены слова
  const wordRange = {
    from: props.wordsOnPage * props.pageNumber - props.wordsOnPage,
    to: props.wordsOnPage * props.pageNumber - 1
  };

  const handleDoubleClick = (e, index, key) => {
    if (props.mode === "transfer" && props.baseToTransferTo) {
      props.addSelectedWord({
        word: sortedWords[index][0],
        index
      });

    } else if (props.mode === "deleting") {
      props.addSelectedWord({
        word: sortedWords[index][0],
        index
      });

    } else if (props.mode !== "transfer" && props.mode !== "deleting") {
      setSelectedWord({
        engWord: sortedWords[index][0],
        originValue: sortedWords[index][key],
        value: e.target.textContent,
        index,
        key
      });
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (checkLanguage(selectedWord.originValue, newValue)) return;

    setSelectedWord({
      ...selectedWord,
      value: newValue
    })
  };

  return (
    <table className="word-list">
      <thead className="word-list__head">
      <tr className="word-list__tr">
        <td className="word-list__left-column">{props.currentBaseName.toUpperCase()} :</td>
        <td className="word-list__right-column">{props.wordCount}</td>
      </tr>
      </thead>
      <tbody className="word-list__body">
      {
        sortedWords.map((item, index) => {
          if (index < wordRange.from || index > wordRange.to) return;
          const [key, value] = item;

          const restProps = {
            mode: props.mode,
            selectedWord: props.selectedWord,
            selectedWords: props.selectedWords,
            handleDoubleClick,
            handleChange
          };

          return (
            <tr key={index} className="word-list__tr" onMouseDown={disableDoubleClick}>
              <TdElem className="word-list__left-column"
                      forKey={0}
                      index={index}
                      value={key}
                      {...restProps}
              />
              <TdElem className="word-list__right-column"
                      forKey={1}
                      index={index}
                      value={value}
                      {...restProps}
              />
              {
                selectedWord?.index === index &&
                <WordControlMenu
                  mode={props.mode}
                  basesNames={props.basesNames}
                  setMode={props.setMode}
                  clearSelectedWords={props.clearSelectedWords}
                  setBaseToTransferTo={props.setBaseToTransferTo}
                  selectedWord={selectedWord}
                  setSelectedWord={setSelectedWord}
                  selectedWords={props.selectedWords}
                  changeWord={props.changeWord}
                  isProcessing={props.isProcessing}
                />
              }
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
});


export default WordList;