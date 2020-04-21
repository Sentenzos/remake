import React from "react";
import {Field, reduxForm} from 'redux-form';
import "./TablePage.scss"
import {Input} from "../../common/components/FormControl/FormControl";
import {maxLengthCreator} from "../../common/js/validators";


function AddWordForm(props) {

  return (
    <form className="add-word" onSubmit={props.handleSubmit}>
      <div className="add-word__btns">
        <label className="add-word__add-wrapper">
          добавить
          <button className="add-word__add-btn"/>
        </label>
        <div className="add-word__cancel-btn" onClick={props.resetAddWord}>
          отмена
        </div>
      </div>
      <Field
        className="add-eng-word"
        type={"text"}
        name={"engWord"}
        component={Input}
        placeholder={"english"}
        wrapperClassName={"add-eng-word__wrapper"}
      />
      <Field
        className="add-rus-word"
        type={"text"}
        name={"rusWord"}
        component={Input}
        placeholder={"russian"}
        wrapperClassName={"add-rus-word__wrapper"}
      />
      {
        props.error && <div className="add-word__error">
          {props.error}
        </div>
      }
    </form>
  )
}


export default reduxForm({
  form: "addWord"
})(AddWordForm);