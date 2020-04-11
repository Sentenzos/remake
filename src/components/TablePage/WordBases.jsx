import React from "react";
import cn from "classnames";
import {Field, reduxForm} from "redux-form";
import "./TablePage.scss"
import {Input} from "../../common/components/FormControl/FormControl";
import {maxLengthCreator, required} from "../../common/js/validators";



const maxLength = maxLengthCreator(11);

function WordBases(props) {

  const base = "common";

  return (
    <div className="words-bases__wrapper">
      <div className="words-bases__title">
        BASES
      </div>
      <div className="words-bases">
        {
          props.bases.map((item, index) => {
            return (
              <div key={index} className={cn("words-bases__base", item === base && "selected")}>{item}</div>
            )
          })
        }
        <div className="words-bases__btn">
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