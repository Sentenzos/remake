import React from "react";
import cn from "classnames";
import {Field, reduxForm} from "redux-form";
import "./TablesPage.scss"
import {Input} from "../../common/components/FormControl/FormControl";
import {maxLengthCreator, required} from "../../common/js/validators";

const arr = [
  "common",
  "learned",
  "repeat",
  "forgiven",
  "something",
  "just",
  "name",
  "eleven",
  "symbols",
];


const maxLength = maxLengthCreator(11);

function WordsBases(props) {

  const base = "common";

  return (
    <div className="words-bases__wrapper">
      <div className="words-bases__title">
        BASES
      </div>
      <div className="words-bases">
        {
          arr.map(i => {
            return (
              <div className={cn("words-bases__base", i === base && "selected")}>{i}</div>
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




export default WordsBases;