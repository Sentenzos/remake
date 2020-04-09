import React, {useState} from "react";
import "./ToggleButton.scss"
import {CSSTransition} from "react-transition-group";


function ToggleButton(props) {
  const [state, setState] = useState(false);

  function handleClick() {
    setState(state => {
     return  !state
    })
  }

  function prevDef(e) {
    e.preventDefault();
  }

  return (
    <div className={`toggle-button ${props.className}`} onClick={handleClick} onMouseDown={prevDef}>
      {
        state ? <div className="toggle-button__mode-name active">{props.activeName}</div> :
          <div className="toggle-button__mode-name inactive">{props.inactiveName}</div>
      }
      <CSSTransition in={state} classNames="toggle-button__bead" timeout={200}>
        <div className="toggle-button__bead"/>
      </CSSTransition>
    </div>
  )
}

export default ToggleButton;