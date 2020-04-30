import React, {useState} from "react";
import cn from "classnames";
import "../TablePage.scss"
import {ReactComponent as Transfer} from "../../../assets/images/transfer.svg";
import AddBase from "./AddBase";
import {CSSTransition} from "react-transition-group";


const WordBases = (props) => {

  const [showInput, toggleShowInput] = useState(false);

  const setBaseToTransferTo = (currentBase, baseToTransferTo) => {
    if (currentBase !== baseToTransferTo) {
      props.setBaseToTransferTo(baseToTransferTo);
    }
  };

  const changeBase = async (currentBase, baseName) => {
    if (currentBase === baseName) return;
    await props.getBase(baseName);
  };

  const handleClick = async (baseName) => {
    if (props.isProcessing) return;
    if (props.wordIsAlready) return;

    if (props.mode === "transfer") {
      setBaseToTransferTo(props.currentBaseName, baseName);
    } else {
      props.setMode(null);
      props.setSelectedWord(null);
      await changeBase(props.currentBaseName, baseName);
      props.setPageNumber(1);
    }
  };

  return (
    <div className="word-bases__wrapper">
      <div className="word-bases__title">
        BASES
      </div>
      <div className="word-bases">
        {
          props.basesNames.map((baseName, index) => {
            if (baseName === "common" &&
              props.mode === "transfer" &&
              props.currentBaseName !== "common") return;

            return (
              <div key={index}
                   className={cn("word-bases__base",
                     baseName === props.currentBaseName && "selected",
                     //включает подсветку кнопок, чтобы обратить внимание пользователя
                     props.mode === "transfer" && "transfer"
                   )}
                   onClick={() => handleClick(baseName)}
              >

                {
                  props.baseToTransferTo === baseName &&
                  <div className="base-to-transfer-to">
                    <Transfer/>
                  </div>
                }

                {baseName}
              </div>
            )
          })
        }
        <div className="word-bases__btn"
             onMouseDown={(e) => e.preventDefault()}
             onClick={() => toggleShowInput(s => !s)}>
          +
        </div>
      </div>
      <CSSTransition in={showInput} timeout={500}
                     classNames="add-base__wrapper"
                     unmountOnExit
      >
        <div className="add-base__wrapper">
          <AddBase addNewBase={props.addNewBase}
                   deleteBase={props.deleteBase}
          />
        </div>
      </CSSTransition>
    </div>
  )
}


export default WordBases;