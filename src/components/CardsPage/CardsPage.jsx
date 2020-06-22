import React, {useCallback, useState, useRef} from "react";
import "./CardsPage.scss"
import ToggleButton from "../../common/components/ToggleButton/ToggleButton";
import CustomSelect from "../../common/components/CustomSelect/CustomSelect";
import {CSSTransition} from "react-transition-group";
import wordRandomize from "./js/wordRandomize";
import {ReactComponent as Pulse} from "../../assets/images/pulse.svg";
import {ReactComponent as LoadingSVG} from "../../assets/images/ring-loading.svg";
import {toggleMode} from "../../store/reducers/cardsPageReducer";


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
              engWord ? engWord : !props.isProcessing && <Pulse /> :
                engWord ? rusWord : !props.isProcessing && <Pulse />
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
            props.isProcessing && <LoadingSVG className="cards__loading-svg"/>
          }
        </div>
        <div className="cards-control">
          <ControlBtn name="далее" className="next"
                      onClick={getRandomWord}
                      disabled={props.isProcessing}
          />
          <ControlBtn name="выучено" className="learned"
                      disabled={props.isProcessing}
          />
          <ControlBtn name="повторить" className="repeat"
                      disabled={props.isProcessing}
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
  const [stretchColor, setStretchColor] = useState(false);

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }

    // if (props.stretch) {
    //   setStretchColor
    // }
  };


  return (
    <label className={`control-btn__wrapper ${props.className} ${props.disabled ? "disabled" : ""}`} onMouseDown={(e) => e.preventDefault()}>
      <div className={`control-btn__lamp ${props.disabled ? "disabled" : ""} ${stretchColor ? "stretch-color" : ""}`} />
      <div className="control-btn__name">{props.name}</div>
      <button disabled={props.disabled || false} className="control-btn" onClick={handleClick}/>
    </label>
  )
}


export default CardsPage;