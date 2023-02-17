import { useState } from "react";

import { DigitOnlyValidation } from "../components/Form/validations/validations";
// const useInput = (args.defaultValue, args.validateValue, args.fetch, args.DisplayErrorMsg, args.maxLen) => {
const useInput = (args) => {
  const [inputValue, setInputValue] = useState(args.defaultValue);
  const [IsTouched, setIsTouched] = useState(false);
  const valueIsValid = args.validateValue
    ? args.validateValue(inputValue || "", IsTouched)
    : true;
  const hasError = !valueIsValid && IsTouched;
  const valueChangeHandler = (event) => {
    setIsTouched(true);
    if (event) {
      if (event.target) {
        if (args.digitOnly && !DigitOnlyValidation(event.target.value)) {
          event.preventDefault();
          return;
        }
        if (event.target.value.trim().length > args.maxLen) {
          event.preventDefault();
          return;
        }
        setInputValue(event.target.value);
        if (args.setDependent) {
          args.setDependent(event.target.value);
        }
      } else {
        if (event.value) {
          setInputValue({ value: event.value, label: event.label });
          if (args.setDependent) {
            args.setDependent(event.value);
          }
        } else {
          setInputValue(event);
          if (args.setDependent) {
            args.setDependent(event);
          }
        }
        if (args.fetch) {
          args.fetch(event.value);
        }
      }
    }
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
    if (args.DisplayErrorMsg) {
      args.DisplayErrorMsg(inputValue);
    }
    if (args.BlureAction) {
      args.BlureAction(inputValue);
    }
  };

  const SetInputValue = (value, type) => {
    if (type === "date") {
      value = new Date(value);
    }
    setInputValue(value);
  };
  const reset = (value) => {
    setInputValue(value || "");
    setIsTouched(false);
  };

  const setValidity = (valid) => {
    setIsTouched(true);
  };
  return {
    inputValue,
    isvalid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    SetInputValue,
    reset,
    setValidity,
  };
};

export default useInput;
