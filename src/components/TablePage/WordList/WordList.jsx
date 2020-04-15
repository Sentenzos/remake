import React, {useMemo, useState} from "react";
import "../TablePage.scss"
import disableDoubleClick from "./../js/disableDoubleClick";
import cn from "classnames";
import WordControlMenu from "./WordControlMenu";
import SortList from "../js/sortList";


const WordList = React.memo((props) => {

  //название метода сортировки списка
  const [sorting, setSorting] = useState('engAZ');

  //Объект содержащий uniqueKeys, text, index и key
  //uniqueKey служит key для React и позволяет всплывающему меню висеть у верной строки таблицы.
  //text нужен инпуту для value, так же в него onChange записывает новые значения
  //index позволяет из массива uniqueKeys доставать верный ключ для того чтобы закрепить меню
  //key позволяет отличать левое слово от правого и подсвечивать нужное после дабл клика
  const [selectedWord, setSelectedWord] = useState(null);

  //отсортированный массив массивов со словами [слово, перевод]
  const sortedWords = useMemo(() => {
    const sorter = new SortList(props.words);
    return sorter.sort(sorting);
  }, [props.words, sorting]);

  //с какого по какой индекс должны быть отображены слова
  const wordRange = {
    from: props.wordsOnPage * props.pageNumber - props.wordsOnPage,
    to: props.wordsOnPage * props.pageNumber - 1
  };

  const uniqueKeys = useMemo(() => {
    return sortedWords.map(() => {
      return Math.random()
    })
  }, [sortedWords]);


  const handleDoubleClick = (e, uniqueKey, index, key) => {
    if (selectedWord && props.mode === "transfer" && props.baseToTransferTo) {
      props.addSelectedWord({
        word: e.target.parentElement.firstElementChild.textContent,
        uniqueKey
      });
      return
    }

    if (props.mode !== "transfer" && props.mode !== "deleting") {
      setSelectedWord({
        uniqueKey: uniqueKeys[index],
        text: e.target.textContent,
        index,
        key
      });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setSelectedWord((obj) => {
      return {
        ...obj,
        text: value
      }
    })
  };
  console.log(selectedWord);

  //Чтобы не дублировать код
  const tdElem = (className, key, index, value) => {
    const uniqueKey = uniqueKeys[index];

    //Условие для редактирования слова
    const isEditing = props.mode === "edit"
      && selectedWord?.key === key
      && selectedWord?.uniqueKey === uniqueKey;

    return (
      <td key={key}
          className={cn(className,
            (props.mode === "transfer" || props.mode === "deleting") ? props.selectedWords.some((item) => {
              return item.uniqueKey === uniqueKey
            }) && "selected" :
              selectedWord?.key === key &&
              selectedWord?.uniqueKey === uniqueKey && "selected")}

          onDoubleClick={(e) => handleDoubleClick(e, uniqueKey, index, key)}
      >
        {
          isEditing && <input value={selectedWord?.text}
                              className="edit-input"
                              onChange={handleChange}
          />
        }
        {
          !isEditing && value
        }
      </td>
    )
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
          return (
            <tr key={uniqueKeys[index]} className="word-list__tr" onMouseDown={disableDoubleClick}>
              {
                [tdElem("word-list__left-column", 1, index, key),
                  tdElem("word-list__right-column", 2, index, value)]
              }

              {selectedWord?.uniqueKey === uniqueKeys[index] &&
              <WordControlMenu
                mode={props.mode}
                basesNames={props.basesNames}
                setMode={props.setMode}
                clearSelectedWords={props.clearSelectedWords}
                setBaseToTransferTo={props.setBaseToTransferTo}
                setSelectedWord={setSelectedWord}
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