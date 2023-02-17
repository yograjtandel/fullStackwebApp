import React, { useState, useEffect } from "react";
import Selection from "./Selection";

import useInput from "../../hooks/use-Input";

import { Models } from "../../data/Models";
import useActions from "../../hooks/use-actions";

import {
  requerFieldValidation,
  requerSelectionValidation,
  LenValidation,
} from "./validations/validations";

const Address = (props) => {
  const [CountryList, setCountryList] = useState([]);
  const [StateList, setStateList] = useState([]);
  const [CityList, setCityList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!props.CountryList || props.CountryList.length === 0) {
          const CountryList_responce = await useActions(
            "get",
            Models.County,
            false,
            false,
            false
          );
          if (CountryList_responce.length !== 0) {
            setCountryList(
              CountryList_responce.map((country) => {
                return { value: country.id, label: country.name };
              })
            );
          }
        } else {
          if (
            props.DefaultAddress &&
            JSON.stringify(props.DefaultAddress) !== "{}"
          ) {
            SetAddress1(props.DefaultAddress.Address1);
            SetAddress2(props.DefaultAddress.Address2);
            SetAddress3(props.DefaultAddress.Address3);
            SetPincode(props.DefaultAddress.Pincode);
            setPhone(props.DefaultAddress.Phone);
            SetCountry(
              props.DefaultAddress.Country
                ? props.DefaultAddress.Country
                : { value: "0", label: "" }
            );
            SetState(
              props.DefaultAddress.State
                ? props.DefaultAddress.State
                : { value: "0", label: "" }
            );
            SetCity(
              props.DefaultAddress.City
                ? props.DefaultAddress.City
                : { value: "0", label: "" }
            );
          }
        }
      } catch (err) {
        console.log("err=", err);
      }
    };
    getData();
  }, [
    props.CountryList,
    props.StateList,
    props.CityList,
    props.Country,
    props.State,
    props.City,
  ]);
  const fetchState = async (country) => {
    if (State.value !== "0") {
      setStateList([]);
      setCityList([]);
      reSetState();
      reSetCity();
    }
    const StateList_responce = await useActions('get', Models.State, country);
    setStateList(
        StateList_responce.map((state) => {
        return { value: state.id, label: state.name };
      })
    );
  };

  const fetchCity = async (state) => {
    if (City.value !== "0") {
      setCityList([]);
      reSetCity();
    }

    const CityList_responce = await useActions('get', Models.Citiy, state);
    setCityList(
        CityList_responce.map((city) => {
        return { value: city.id, label: city.name };
      })
    );
  };

  const {
    inputValue: Address1,
    isvalid: Address1Isvalid,
    hasError: Address1HasError,
    valueChangeHandler: Address1onChange,
    inputBlurHandler: Address1onBlure,
    SetInputValue: SetAddress1,
    reset: reSetAddress1,
  } = useInput({
    defaultValue: "",
    validateValue: props.required
      ? (value) => requerFieldValidation(value)
      : false,
  });

  const {
    inputValue: Address2,
    isvalid: Address2Isvalid,
    hasError: Address2HasError,
    valueChangeHandler: Address2onChange,
    inputBlurHandler: Address2onBlure,
    SetInputValue: SetAddress2,
    reset: reSetAddress2,
  } = useInput({
    defaultValue: "",
    validateValue: props.required
      ? (value) => requerFieldValidation(value)
      : false,
  });

  const {
    inputValue: Address3,
    isvalid: Address3Isvalid,
    valueChangeHandler: Address3onChange,
    inputBlurHandler: Address3onBlure,
    SetInputValue: SetAddress3,
    reset: reSetAddress3,
  } = useInput({
    defaultValue: "",
  });

  const {
    inputValue: Country,
    isvalid: CountryIsvalid,
    hasError: CountryHasError,
    valueChangeHandler: CountryonChange,
    inputBlurHandler: CountryonBlure,
    SetInputValue: SetCountry,
    reset: reSetCountry,
  } = useInput({
    defaultValue: { value: "0", label: "" },
    validateValue: props.required
      ? (value) => requerSelectionValidation(value)
      : false,
    fetch: fetchState,
  });

  const {
    inputValue: City,
    isvalid: CityIsvalid,
    hasError: CityHasError,
    valueChangeHandler: CityonChange,
    inputBlurHandler: CityonBlure,
    SetInputValue: SetCity,
    reset: reSetCity,
  } = useInput({
    defaultValue: { value: "0", label: "" },
    validateValue: props.required
      ? (value) => requerSelectionValidation(value)
      : false,
  });

  const {
    inputValue: State,
    isvalid: StateIsvalid,
    hasError: StateHasError,
    valueChangeHandler: StateonChange,
    inputBlurHandler: StateonBlure,
    SetInputValue: SetState,
    reset: reSetState,
  } = useInput({
    defaultValue: { value: "0", label: "" },
    validateValue: props.required
      ? (value) => requerSelectionValidation(value)
      : false,
    fetch: fetchCity,
  });

  const {
    inputValue: Pincode,
    isvalid: PincodeIsvalid,
    hasError: PincodeHasError,
    valueChangeHandler: PincodeonChange,
    inputBlurHandler: PincodeonBlure,
    SetInputValue: SetPincode,
    reset: reSetPincode,
  } = useInput({
    defaultValue: "",
    validateValue: props.required
      ? (value) => requerFieldValidation(value) && LenValidation(value, 6)
      : (value) => LenValidation(value, 6),
    digitOnly: true,
    maxLen: 6,
  });

  const {
    inputValue: Phone,
    isvalid: PhoneIsvalid,
    valueChangeHandler: PhoneonChange,
    inputBlurHandler: PhoneonBlure,
    SetInputValue: setPhone,
    reset: reSetPhone,
  } = useInput({
    defaultValue: "",
    digitOnly: true,
    maxLen: 15,
  });

  useEffect(() => {
    props.validateAddress({
      validateAddress: {
        Address1: Address1Isvalid,
        Address2: Address2Isvalid,
        Address3: Address3Isvalid,
        Pincode: PincodeIsvalid,
        Country: CountryIsvalid,
        State: StateIsvalid,
        City: CityIsvalid,
        Phone: PhoneIsvalid,
      },
      values: {
        Address1: Address1,
        Address2: Address2,
        Address3: Address3,
        Pincode: Pincode,
        Country: Country,
        State: State,
        City: City,
        Phone: Phone,
      },
      updatevalue: {
        SetAddress1,
        SetAddress2,
        SetAddress3,
        SetPincode,
        SetCountry,
        SetState,
        SetCity,
        setPhone,
      },
      reSetvalue: {
        reSetAddress1,
        reSetAddress2,
        reSetAddress3,
        reSetPincode,
        reSetCountry,
        reSetState,
        reSetCity,
        reSetPhone,
      },
    });
  }, [
    Address1Isvalid,
    Address2Isvalid,
    Address3Isvalid,
    PincodeIsvalid,
    CountryIsvalid,
    StateIsvalid,
    CityIsvalid,
    PhoneIsvalid,
    Address1,
    Address2,
    Address3,
    Pincode,
    Country,
    State,
    City,
    Phone,
  ]);

  return (
    <>
      <div className="col-md-12 col-sm-12 mb-2 ">
        {props.title && (
          <h4 className={` ${props.required ? "asterisk_input" : ""}`}>
            {props.title}
          </h4>
        )}
        <div className="row p-0">
          <div className="col-md-4 col-sm-12 mb-2 ">
            <label
              htmlFor="ResidencialAddress"
              className={`form-label ${props.required ? "asterisk_input" : ""}`}
            >
              Address 1
            </label>
            <input
              type="text"
              id={`${props.title}-address1`}
              name="address1"
              className={`form-control ${
                Address1HasError || (props.validity && !Address1Isvalid)
                  ? "invalid"
                  : ""
              }`}
              value={Address1}
              onChange={Address1onChange}
              onBlur={Address1onBlure}
              disabled={props.read}
            />
          </div>
          <div className="col-md-4 col-sm-12 mb-2">
            <label
              htmlFor="ResidencialAddress"
              className={`form-label ${props.required ? "asterisk_input" : ""}`}
            >
              Address 2
            </label>
            <input
              type="text"
              id={`${props.title}-address2"`}
              name="address2"
              className={`form-control ${
                Address2HasError || (props.validity && !Address2Isvalid)
                  ? "invalid"
                  : ""
              }`}
              value={Address2}
              onChange={Address2onChange}
              onBlur={Address2onBlure}
              disabled={props.read}
            />
          </div>
          <div className="col-md-4 col-sm-12 mb-2">
            <label htmlFor="ResidencialAddress" className={`form-label`}>
              Address 3
            </label>
            <input
              type="text"
              id={`${props.title}-address3"`}
              name="address3"
              className={`form-control`}
              value={Address3}
              onChange={Address3onChange}
              onBlur={Address3onBlure}
              disabled={props.read}
            />
          </div>
        </div>
      </div>
      <div className="col-md-12 col-sm-12 ">
        <div className="row p-0">
          <div className="col-md-4 col-sm-12 mb-2">
            <label
              htmlFor="Country"
              className={`form-label ${props.required ? "asterisk_input" : ""}`}
            >
              Country
            </label>
            <Selection
              options={
                props.CountryList && props.CountryList.length !== 0
                  ? props.CountryList
                  : CountryList
              }
              Searchable="true"
              placeholder="State"
              hasError={CountryHasError || (props.validity && !CountryIsvalid)}
              value={Country}
              onChange={CountryonChange}
              onBlur={CountryonBlure}
              isReadOnly={props.read}
            />
          </div>
          <div className="col-md-4 col-sm-12 mb-2">
            <label
              htmlFor="State"
              className={`form-label ${props.required ? "asterisk_input" : ""}`}
            >
              State
            </label>
            <Selection
              options={
                props.StateList && props.StateList.length !== 0
                  ? props.StateList
                  : StateList
              }
              Searchable="true"
              placeholder="State"
              hasError={StateHasError || (props.validity && !StateIsvalid)}
              value={State}
              onChange={StateonChange}
              onBlur={StateonBlure}
              isReadOnly={Country.value === "0" || props.read ? true : false}
            />
          </div>
          <div className="col-md-4 col-sm-12 mb-2">
            <label
              htmlFor="City"
              className={`form-label ${props.required ? "asterisk_input" : ""}`}
            >
              City
            </label>
            <Selection
              options={
                props.CityList && props.CityList.length !== 0
                  ? props.CityList
                  : CityList
              }
              Searchable="true"
              hasError={CityHasError || (props.validity && !CityIsvalid)}
              value={City}
              onChange={CityonChange}
              onBlur={CityonBlure}
              isReadOnly={State.value === "0" || props.read ? true : false}
            />
          </div>
        </div>
      </div>
      <div className="col-md-12 col-sm-12 mb-md-3 mb-sm-2">
        <div className="row p-0">
          <div className="col-md-4 col-sm-12 mb-2">
            <label
              htmlFor="State"
              className={`form-label ${props.required ? "asterisk_input" : ""}`}
            >
              PinCode
            </label>
            <input
              type="text"
              name="pincode"
              className={`form-control ${
                PincodeHasError || (props.validity && !PincodeIsvalid)
                  ? "invalid"
                  : ""
              }`}
              value={Pincode}
              onChange={PincodeonChange}
              onBlur={PincodeonBlure}
              disabled={props.read}
            />
          </div>
          <div className="col-md-4 col-sm-12 mb-2">
            <label htmlFor="PhoneNo" className="form-label">
              Phone No
            </label>
            <input
              type="text"
              className={`form-control`}
              id={`${props.title}-PhoneNo`}
              value={Phone}
              onChange={PhoneonChange}
              onBlur={PhoneonBlure}
              disabled={props.read}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
