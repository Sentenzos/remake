import React from "react";
import "./CardsPage.scss"
import ToggleButton from "../../common/components/ToggleButton/ToggleButton";
import CustomSelect from "../../common/components/CustomSelect/CustomSelect";


function CardsPage(props) {
  return (
    <div className="cards-page">
      <div className="cards-wrapper">
        <div className="cards">
          <div className="card-upper">Something</div>
          <span className="card-delimiter"/>
          <div className="card-bottom">передача, эстафета, передавать</div>
        </div>
        <div className="cards-control">
          <ControlBtn name="далее" className="next"/>
          <ControlBtn name="выучено" className="learned"/>
          <ControlBtn name="повторить" className="repeat"/>
          <ToggleButton className="control-btn__lang-toggle"
                        activeName="rus"
                        inactiveName="eng"
          />
        </div>
        <CustomSelect
          options={['common', 'repeat', 'learned', 'forgotten']}
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
      <button disabled={props.disabled || false} className="control-btn"/>
    </label>
  )
}


export default CardsPage;