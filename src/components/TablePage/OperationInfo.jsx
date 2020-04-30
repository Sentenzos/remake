import React from 'react';
import {ReactComponent as LoadingSVG} from "../../assets/images/processing.svg";
import cn from "classnames";
import {CSSTransition} from "react-transition-group";


const OperationInfo = (props) => {
  return (
    <CSSTransition classNames="operation-info"
                   in={props.wordIsAlready}
                   timeout={500}>
      <div className={cn("operation-info")}>
        {
          props.wordIsAlready &&
          <div className="word-is-already">
            <div>Такое слово уже есть.</div>
            <div>Изменить его?</div>
            <div className="word-is-already__btns">
              <div onClick={() => props.addWordConfirm()}>Да</div>
              <div onClick={() => {
                props.setWordIsAlready(false);
              }}>
                Нет
              </div>
            </div>
          </div>
        }
        {
          props.isProcessing &&
          <LoadingSVG className="loading-svg"/>
        }
      </div>
    </CSSTransition>
  )
};

export default OperationInfo;