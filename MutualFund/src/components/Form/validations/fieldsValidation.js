import {
  requerFieldValidation,
  EmailValidation,
  requerSelectionValidation,
  DigitOnlyValidation,
  IsPastDate,
  LenValidation,
  LessThenLenValidation,
  GreaterThenLenValidation,
  LessThenEqaltoLenValidation,
  GreaterThenEqaltoLenValidation,
  ShouldStartWith,
  ShouldNotStartWith,
} from "./validations";

export const emailFieldValidation = {
  defaultValue: "",
  validateValue: (value) =>
    requerFieldValidation(value) && EmailValidation(value),
};

export const mobileFieldValidation = {
  defaultValue: "",
  validateValue: (value) =>
    requerFieldValidation(value) && LenValidation(value, 10),
  maxLen: 10,
  digitOnly: true,
};

export const aadharFieldValidation = {
  defaultValue: "",
  validateValue: (value) => {
    return (
      //   LenValidation(value, 0) ||
      requerFieldValidation(value) &&
      LenValidation(value, 12) &&
      ShouldNotStartWith(value, "1") &&
      DigitOnlyValidation
    );
  },
  maxLen: 12,
};
