import React from "react";
import cn from "classnames";
import {Field, reduxForm} from "redux-form";
import "./TablePage.scss"
import {Input} from "../../common/components/FormControl/FormControl";
import {maxLengthCreator, required} from "../../common/js/validators";
import {ReactComponent as Transfer} from "../../assets/images/transfer.svg";


const maxLength = maxLengthCreator(11);

function WordBases(props) {

  const setBaseToTransferTo = (currentBase, baseToTransferTo) => {
    if ( currentBase !== baseToTransferTo) {
      props.setBaseToTransferTo(baseToTransferTo);
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
                   onClick={props.mode === "transfer" ?
                     () => setBaseToTransferTo(props.currentBaseName, baseName)  :
                     (e) => props.getBase(e.target.textContent)}
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
        <AddBaseWrapper/>
      </div>
    </div>
  )
}


function AddBase(props) {
  return (
    <form className="add-base">
      <Field
        className="add-base__input"
        type={"text"}
        name={"addBase"}
        component={Input}
        placeholder={"base name"}
        validate={[maxLength, required]}
        wrapperClassName={"add-base__input-wrapper"}
      />
      <label className="add-base__btn-wrapper">
        добавить
        <button className="add-base__btn"/>
      </label>
    </form>
  )
}

const AddBaseWrapper = reduxForm({
  form: "addBase"
})(AddBase);


export default WordBases;