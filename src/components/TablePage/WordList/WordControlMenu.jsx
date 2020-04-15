import React from "react";
import {ReactComponent as Edit} from "../../../assets/images/edit.svg";
import {ReactComponent as Transfer} from "../../../assets/images/transfer.svg";
import {ReactComponent as Delete} from "../../../assets/images/delete.svg";
import {ReactComponent as Cross} from "../../../assets/images/cross.svg";
import cn from "classnames";


const WordControlMenu = (props) => {

  const modeControl = (modeName) => {
    if (!modeName) {
      props.setMode(null);
      props.clearSelectedWords();
      props.setBaseToTransferTo("");
      props.setSelectedWord(null);
      return
    }

    if (props.mode === modeName) {
      props.clearSelectedWords();
      props.setBaseToTransferTo("");
      props.setMode(null);
    } else {
      props.clearSelectedWords();
      props.setMode(modeName);
    }

  };

  return (
    <td className="word-control-menu">
      <div className="word-control-menu__btns">
        <div className={cn("word-control-menu__btn", props.mode ==="edit" && "selected")}
             onMouseUp={() => modeControl("edit")}>
          <Edit/>
        </div>
        <div className={cn("word-control-menu__btn", props.mode ==="transfer" && "selected")}
             onMouseUp={() => modeControl("transfer")}>
          <Transfer/>
        </div>
        <div className="word-control-menu__btn">
          <Delete/>
        </div>
        <div className="word-control-menu__btn" onMouseUp={() => modeControl(null)}>
          <Cross/>
        </div>
      </div>
      {
        props.mode && <div className="word-control-menu__ok-btn">OK</div>
      }
    </td>
  )
};

export default WordControlMenu;