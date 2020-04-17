import React, {useState} from "react";
import cn from "classnames";
import "./TablePage.scss"
import {maxLengthCreator} from "../../common/js/validators";
import {ReactComponent as Transfer} from "../../assets/images/transfer.svg";


const maxLength = maxLengthCreator(11);

function WordBases(props) {

  const setBaseToTransferTo = (currentBase, baseToTransferTo) => {
    if (currentBase !== baseToTransferTo) {
      props.setBaseToTransferTo(baseToTransferTo);
    }
  };

  const changeBase = (currentBase, baseName) => {
    if (currentBase === baseName) return;
    props.getBase(baseName);
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
                   onClick={props.mode === "transfer" ?
                     () => setBaseToTransferTo(props.currentBaseName, baseName) :
                     () => changeBase(props.currentBaseName, baseName)}
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
        <div className="word-bases__btn">
          +
        </div>
      </div>
      <div className="add-base__wrapper">
        <AddBase addNewBase={props.addNewBase}
                 deleteBase={props.deleteBase}
        />
      </div>
    </div>
  )
}


function AddBase(props) {

  const [state, setState] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;

    if (/[^a-z0-9]/i.test(value)) {
      setError("Only latin symbols!");
    } else {
      setError(null);
    }
    if (value.length > 10) {
      setError("Max 10 characters!");
      return;
    }

    setState(value);
  };

  return (
    <form className="add-base" onSubmit={(e) => e.preventDefault()}>
      <input className="add-base__input"
             type="text"
             name="addBase"
             placeholder="Base name"
             value={state}
             onChange={handleChange}
      />
      <div className="add-base__btns-wrapper">
        <label className="add-base__btn-wrapper">
          добавить
          <button className="add-base__btn" disabled={error} onClick={(e) => props.addNewBase(state)}/>
        </label>
        <label className="add-base__btn-wrapper">
          удалить
          <button className="add-base__btn" disabled={error}  onClick={(e) => props.deleteBase(state)}/>
        </label>
      </div>
      {
        error && <div className="sync-error">{error}</div>
      }
    </form>
  )
}


export default WordBases;