import React from "react";
import {ReactComponent as Editing} from "../../../assets/images/edit.svg";
import {ReactComponent as Transfer} from "../../../assets/images/transfer.svg";
import {ReactComponent as Deleting} from "../../../assets/images/delete.svg";
import {ReactComponent as Cancel} from "../../../assets/images/cross.svg";
import cn from "classnames";


const WordControlMenu = (props) => {

  //отвечает за включение режимов и очистку данных при их выключении
  const modeControl = (modeName) => {
    //нажат крестик
    if (!modeName) {
      props.setMode(null);
      clear();
      props.setSelectedWord(null);
      return
    }
    //если происходила операция editing, но не была окончена, то сбросить
    //value, чтобы при следующем отображении input'a было исходное value
    if (props.selectedWord.value !== props.selectedWord.originValue) {
      props.setSelectedWord({
        ...props.selectedWord,
        value: props.selectedWord.originValue
      });
    }

    if (props.mode === modeName) {
      clear();
      props.setMode(null);
    } else {
      clear();
      props.setMode(modeName);
    }

    function clear() {
      props.clearSelectedWords();
      props.setBaseToTransferTo("");
    }

  };

  const shouldDisplayOkBtn = () => {
    if (!props.mode) return false;

    if (props.mode === "editing" &&
      props.selectedWord.value !== props.selectedWord.originValue) {
      return true;

    } else if (
      (props.mode === "transfer" || props.mode === "deleting") &&
      (props.selectedWords.length > 0)) {
      return true;
    }
  };

  const handleClickOkBtn = () => {
    if (props.mode === "editing") {
      props.changeWord();
    } else if (props.mode === "transfer") {
      props.transferWords();
    } else if (props.mode === "deleting") {
      props.deleteWords();
    }
  };

  return (
    <td className="word-control-menu">
      <div className="word-control-menu__btns">
        <div className={cn("word-control-menu__btn", props.mode === "editing" && "selected")}
             onClick={props.isProcessing ? null : () => modeControl("editing")}>
          <Editing/>
        </div>
        <div className={cn("word-control-menu__btn", props.mode === "transfer" && "selected")}
             onClick={props.isProcessing ? null : () => modeControl("transfer")}>
          <Transfer/>
        </div>
        <div className={cn("word-control-menu__btn", props.mode === "deleting" && "selected")}
             onClick={props.isProcessing ? null : () => modeControl("deleting")}>
          <Deleting/>
        </div>
        <div className="word-control-menu__btn"
             onClick={props.isProcessing ? null : () => modeControl(null)}>
          <Cancel/>
        </div>
      </div>
      {
        shouldDisplayOkBtn() && <div className="word-control-menu__ok-btn"
                                     onClick={props.isProcessing ? null : handleClickOkBtn}>OK</div>
      }
    </td>
  )
};

export default WordControlMenu;