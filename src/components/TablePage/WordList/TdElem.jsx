import cn from "classnames";
import React from "react";


const TdElem = (props) => {

  const {
    forKey: key, index,
    value, mode, selectedWord,
    selectedWords, handleDoubleClick,
    handleChange, className
  } = props;

  //Условие для редактирования слова
  const isEditing = props.mode === "editing"
    && selectedWord?.key === key
    && selectedWord?.index === index;

  return (
    <td key={key}
        className={cn(className,
          (props.mode === "transfer" || props.mode === "deleting") ?
            props.selectedWords.some((item) => {
              return item.index === index
            }) && "selected" :
            selectedWord?.key === key &&
            selectedWord?.index === index && "selected")}

        onDoubleClick={(e) => handleDoubleClick(e, index, key)}
    >
      {
        isEditing && <input value={selectedWord?.value}
                            className="edit-input"
          //во время отправки запроса отключить ввод
                            onChange={props.isProcessing ? null : handleChange}
                            autoFocus={true}
        />
      }
      {
        !isEditing && value
      }
    </td>
  )
};

export default TdElem;