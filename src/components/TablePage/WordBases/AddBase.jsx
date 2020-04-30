import React, {useState} from "react";

const AddBase = (props) => {

  const [state, setState] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;

    if (/[^a-z0-9]/i.test(value)) {
      setError("Only latin symbols!");
    } else {
      setError(null);
    }
    if (value.length > 11) {
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
             placeholder="base name"
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
};

export default AddBase;