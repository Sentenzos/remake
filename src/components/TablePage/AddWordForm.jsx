import React from "react";
import {Field, reduxForm} from 'redux-form';
import "./TablePage.scss"
import {Input} from "../../common/components/FormControl/FormControl";
import {maxLengthCreator} from "../../common/js/validators";


const engMaxLength = maxLengthCreator(40);
const rusMaxLength = maxLengthCreator(30);

function AddWordForm(props) {

  return (
    <form className="add-word">
      <div className="add-word__btns">
        <label className="add-word__add-wrapper">
          добавить
          <button className="add-word__add-btn"/>
        </label>
        <div className="add-word__cancel-btn">
          отмена
        </div>
      </div>
      <Field
        className="add-eng-word"
        type={"text"}
        name={"engWord"}
        component={Input}
        placeholder={"english"}
        validate={[engMaxLength]}
        wrapperClassName={"add-eng-word__wrapper"}
      />
      <Field
        className="add-rus-word"
        type={"text"}
        name={"rusWord"}
        component={Input}
        placeholder={"russian"}
        validate={[rusMaxLength]}
        wrapperClassName={"add-rus-word__wrapper"}
      />
    </form>
  )
}


export default reduxForm({
  form: "addWord"
})(AddWordForm);