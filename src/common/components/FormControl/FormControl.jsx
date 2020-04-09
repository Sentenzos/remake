import React from 'react';
import cn from "classnames";
import "./FormControl.css"

const FormControl = (props) => {
  const {children, wrapperClassName, textleft, textright, meta: {touched, error}} = props;
  return (
    <div className={wrapperClassName + cn(touched && error ? ` form__input-body--error` : "")}>
      {textleft}{children}{textright}
      {touched && error ? <span className="form__input-error">{error}</span> : null}
    </div>
  )
};

export const Input = (props) => {
  //wrapperClassName - это мой кастомный пропс содержащий класс для настройки css элемента содержащего input или textarea
  const {input, wrapperClassName, meta, ...restProps} = props;

  //Тут обязательно отдельно сделать деструктурирующее присваивание input'a и передать с использованием спрэд оператора
  //В противном случае он не будет реагировать на ошибки. Похоже в нем передается обработчик событий.
  //Плейсхолдер и тип вручную передавать не обязательно. Можно спрэд оператором как restProps
  return (
    <FormControl {...props} >
      <input {...input} {...restProps}/>
    </FormControl>
  )
};

export const Textarea = (props) => {
  const {input, wrapperClassName, meta, ...restProps} = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps}/>
    </FormControl>
  )
};