export const requerFieldValidation = (value) => {
  if (typeof value === "string") return value.trim() !== "";
  else return true;
};
export const requerSelectionValidation = (value) => value.value !== "0";

export const EmailValidation = (value) =>
  value
    .trim()
    .toLowerCase()
    .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

export const DigitOnlyValidation = (value) => value.match(/^[0-9]*$/);

export const IsPastDate = (value) => {
  if (typeof value !== "string") {
    return value < new Date();
  } else {
    return false;
  }
};

export const IsfutureDate = (value) => {
  if (typeof value !== "string") {
    return value > new Date();
  } else {
    return false;
  }
};

export const LenValidation = (value, len) =>
  value.toString().trim().length === len;
export const LessThenLenValidation = (value, len) => value.trim().length < len;
export const GreaterThenLenValidation = (value, len) => value.length > len;
export const LessThenEqaltoLenValidation = (value, len) =>
  value.toString().trim().length <= len;
export const GreaterThenEqaltoLenValidation = (value, len) =>
  value.toString().trim().length >= len;
export const GreaterThenValidation = (value, len) => value > len;
export const LessThenValidation = (value, len) => value < len;
export const GreaterThenEqualtoValidation = (value, len) => value >= len;
export const LessThenEqualtoValidation = (value, len) => value <= len;

export const ShouldStartWith = (value, char) =>
  value.toString().trim()[0] === char;
export const ShouldNotStartWith = (value, char) =>
  value.toString().trim()[0] !== char;
