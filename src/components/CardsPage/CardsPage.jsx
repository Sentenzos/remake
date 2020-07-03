import React, {useCallback, useRef, useState} from "react";
import "./CardsPage.scss"
import ToggleButton from "../../common/components/ToggleButton/ToggleButton";
import CustomSelect from "../../common/components/CustomSelect/CustomSelect";
import {CSSTransition} from "react-transition-group";
import wordRandomize from "./js/wordRandomize";
import {ReactComponent as Pulse} from "../../assets/images/pulse.svg";
import {ReactComponent as LoadingSVG} from "../../assets/images/ring-loading.svg";



function CardsPage(props) {

  const randomize = useCallback(
    wordRandomize(props.words),
    [props.words]);

  const getRandomWord = useCallback((e) => {
    if (!Object.keys(props.words)[0]) return;
    //Если слово еще не было отображено, то отобразить английский перевод
    if (!props.randomWord.length) {
      props.setRandomWord(randomize());
      //если отображен английский переод, то отобразить и  русский
    } else if (props.randomWord.length && props.wordStage === "eng") {
      props.toggleWordStage();
      //если отображен русский перевод, то переключить на следующее слово toggleWordStage
    } else if (props.randomWord.length && props.wordStage === "rus") {
      props.setRandomWord(randomize());
      props.toggleWordStage();
    }
  }, [props.words, props.wordStage, props.randomWord]);


  const [engWord, rusWord] = props.randomWord.length ?
    props.randomWord : ["", ""];

  return (
    <div className="cards-page">
      <CSSTransition classNames="server-error"
                     in={props.serverError.state}
                     timeout={1000}
      >
        <div className="server-error">{props.serverError.message}</div>
      </CSSTransition>
      <div className="cards-wrapper">
        <div className="cards">
          <div className="card-top">
            {
              props.mode === "firstEng" ?
                engWord ? engWord : !props.isProcessing && <Pulse/> :
                engWord ? rusWord : !props.isProcessing && <Pulse/>
            }
          </div>
          <span className="card-delimiter"/>
          <div className="card-bottom">
            {
              props.mode === "firstEng" ?
                props.wordStage === "rus" && rusWord :
                props.wordStage === "rus" && engWord
            }
          </div>
          {
            (props.isProcessing || props.isTransferring) && <LoadingSVG className="cards__loading-svg"/>
          }
        </div>
        <div className="cards-control">
          <ControlBtn name="далее" className="next"
                      disabled={props.isProcessing}
                      onClick={getRandomWord}
          />
          <ControlBtn name="выучено" className="learned"
                      disabled={props.isProcessing || !engWord}
                      delayOperation={true}
                      onClick={props.learnedTransfer}
          />
          <ControlBtn name="повторить" className="repeat"
                      disabled={props.isProcessing || !engWord}
                      delayOperation={true}
                      onClick={props.repeatTransfer}
          />
          <ToggleButton className="control-btn__lang-toggle"
                        activeName="rus"
                        inactiveName="eng"
                        onClick={props.toggleMode}
          />
        </div>
        <CustomSelect
          options={props.allBases}
          selected={props.currentBaseName}
          className="control-select"
          onClick={props.changeBase}
        />
      </div>
    </div>
  )
}


function ControlBtn(props) {
  const [delayOperation, setDelayOperation] = useState(false);
  const [operationIsDone, setOperationIsDone] = useState(false);


  const handleMouseDown = (e) => {
    e.persist();
    e.preventDefault();

    let timer;

    const clear = () => {
      setDelayOperation(false);
      setOperationIsDone(false);
      clearTimeout(timer);
      e.target.removeEventListener('mouseleave', clear);
      e.target.removeEventListener('mouseup', clear);
    };

    if (props.delayOperation) {
      setDelayOperation(true);
      e.target.addEventListener('mouseleave', clear);
      e.target.addEventListener('mouseup', clear);

       timer = setTimeout(() => {
         setOperationIsDone(true);
         if (props.onClick) {
           props.onClick();
         }
      }, 700)

    } else {
      if (props.onClick) {
        props.onClick();
      }
    }
  };


  return (
    <div className={`control-btn ${props.className} ${props.disabled ? "disabled" : ""}`}
         onMouseDown={props.disabled ? null : handleMouseDown}
    >
      <div className={`control-btn__lamp ${props.disabled ? 'disabled' : ''} 
        ${delayOperation ? 'control-btn__lamp--yellow' : ''} ${operationIsDone ? 'control-btn__lamp--green' : ''}`}
      />
      <div className={`control-btn__name ${operationIsDone ? 'control-btn__name--green' : ''}`}>{props.name}</div>
    </div>
  )
}


export default CardsPage;