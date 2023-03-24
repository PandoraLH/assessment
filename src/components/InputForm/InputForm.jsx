import React from "react";
import "./InputForm.scss";

const InputForm = (props) => {
   const { label, placeholder, type, value, onChange, onBlur, errorMessage } = props;
   return (
      <div className="InputForm">
         <label className="label">{label}</label>
         <input
            className="input"
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
         ></input>
         {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
   );
};

export default InputForm;
