import React, {useCallback, useEffect, useRef, useState} from "react";
import "./TablePage.scss"
import disableDoubleClick from "./js/disableDoubleClick";
import cn from "classnames";
import {ReactComponent as Change} from "../../assets/images/change.svg";
import {ReactComponent as Transfer} from "../../assets/images/transfer.svg";
import {ReactComponent as Delete} from "../../assets/images/delete.svg";
import {ReactComponent as Cross} from "../../assets/images/cross.svg";
import debounce from "../../common/js/debounce";


const obj = {
  "abomination": "мерзость",
  "absorb": "поглощать",
  "abundance": "изобилие",
  "accelerate": "ускорять",
  "accomplice": "соучастник",
  "accomplish": "выполнять",
  "accustom": "приучать",
  "steady": "устойчивый, постоянный, стабилизировать",
  "ache": "болеть, ныть",
  "acrid": "едкий, резкий",
  "adequate": "адекватный",
  "adjective": "прилагательное",
  "admission": "вход, прием, признание",
  "admit": "признавать",
  "adopt": "принимать",
  "adore": "обожать",
  "affect": "влиять",
  "affectionate": "любящий",
};

const uniqueKeys = Object.keys(obj).map(() => {
  return Math.random()
});


//пока без редакса нагромождаю все в компонентах
const WordList = React.memo((props) => {

  const [chosenWord, setChosenWord] = useState(null);
  const [mode, setMode] = useState(null);

  const transferListRef = useRef(null);
  const menuElemRef = useRef(null);



  //Меню со списком баз для переноса пришлось сделать с абсолютным позиционированием,
  //для того чтобы менять его позицию в зависимости от места появления.
  const changeTransferMenuPos= () => {
    const transferListRefHeight = parseFloat(getComputedStyle(transferListRef.current).height);
    const menuElemHeight = parseFloat(getComputedStyle(menuElemRef.current).height);

    //если четвертая строка в таблице и ниже
    if (chosenWord.index < 3) {
      transferListRef.current.style.top = menuElemHeight + 10 + "px";
      transferListRef.current.style.bottom = "";

      //если третья строка и выше
    } else {
      transferListRef.current.style.bottom = menuElemHeight + 10 + "px";
      transferListRef.current.style.top = "";
    }
  };


  useEffect(() => {
    if (mode === "transfer") {
      changeTransferMenuPos();
    }

  }, [mode]);


  //чтобы не дублировать код
  const tdElem = (className, key, index, value) => {
    return (
      <td key={key} className={cn(className, chosenWord?.text === value && "selected")}
          onDoubleClick={(e) => setChosenWord({
            uniqueKey: uniqueKeys[index],
            text: e.target.innerHTML,
            index: index
          })}
      >{value}</td>
    )
  };


  return (
    <table className="word-list">
      <thead className="word-list__head">
      <tr className="word-list__tr">
        <td className="word-list__left-column">COMMON :</td>
        <td className="word-list__right-column">3341</td>
      </tr>
      </thead>
      <tbody className="word-list__body">
      {
        Object.entries(obj).map((item, index) => {
          const [key, value] = item;
          return (
            <tr key={uniqueKeys[index]} className="word-list__tr" onMouseDown={disableDoubleClick}>
              {
                [tdElem("word-list__left-column", 1, index, key),
                  tdElem("word-list__right-column", 2, index, value)]
              }

              {chosenWord?.uniqueKey === uniqueKeys[index] &&
              <td className="word-list__word-control-menu" ref={menuElemRef}>
                {
                  mode === "transfer" &&
                  <div className="word-control-menu__bases-for-transfer"
                       ref={transferListRef}>
                    {
                      props.bases.map((item, index) => {
                        return (
                          <div className="base-for-transfer" key={index}>
                            {item}
                          </div>
                        )
                      })
                    }
                  </div>
                }
                <div className="word-control-menu__btns">
                  <div className="word-control-menu__btn">
                    <Change/>
                  </div>
                  <div className="word-control-menu__btn" onMouseUp={() => setMode(s => s ? null : "transfer")}>
                    <Transfer/>
                  </div>
                  <div className="word-control-menu__btn">
                    <Delete/>
                  </div>
                  <div className="word-control-menu__btn">
                    <Cross/>
                  </div>
                </div>
                {
                  mode && <div className="word-control-menu__ok-btn">OK</div>
                }
              </td>
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