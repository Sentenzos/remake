import React, {useCallback} from "react";
import "./CardsPage.scss"
import ToggleButton from "../../common/components/ToggleButton/ToggleButton";
import CustomSelect from "../../common/components/CustomSelect/CustomSelect";
import {CSSTransition} from "react-transition-group";
import wordRandomize from "./js/wordRandomize";
import {ReactComponent as Pulse} from "../../assets/images/pulse.svg";


function CardsPage(props) {

  const randomize = useCallback(
    wordRandomize(props.words),
    [props.words]);

  const getRandomWord = useCallback(() => {
    //Если слово еще не было отображено, то отобразить английский перевод
    if (!props.randomWord.length) {
      props.setRandomWord(randomize());
      //если отображен английский переод, то отобразить и  русский
    } else if (props.randomWord.length && props.wordStage === "eng") {
      props.toggleWordStage();
      //если отображен русский перевод, то переключить на следующее слово
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
          <div className="card-upper">
            {
              engWord ? engWord : <Pulse/>
            }
          </div>
          <span className="card-delimiter"/>
          <div className="card-bottom">
            {
              props.wordStage === "rus" && rusWord
            }
          </div>
        </div>
        <div className="cards-control">
          <ControlBtn name="далее" className="next"
                      onClick={getRandomWord}/>
          <ControlBtn name="выучено" className="learned"/>
          <ControlBtn name="повторить" className="repeat"/>
          <ToggleButton className="control-btn__lang-toggle"
                        activeName="rus"
                        inactiveName="eng"
          />
        </div>
        <CustomSelect
          options={props.allBases}
          selected={props.currentBaseName}
          className="control-select"
        />
      </div>
    </div>
  )
}


function ControlBtn(props) {
  return (
    <label className={`control-btn__wrapper ${props.className}`}>
      <div className="control-btn__lamp"/>
      <div className="control-btn__name">{props.name}</div>
      <button disabled={props.disabled || false} className="control-btn" onClick={props.onClick}/>
    </label>
  )
}


export default CardsPage;