import React, { useState, useRef, useEffect, useContext } from "react";
import uuid from "react-uuid";
import DatePicker from "react-datepicker";
import Selection from "../components/Form/Selection";
import Address from "../components/Form/Address";
import FileInput from "../components/Form/FileInput";
import BreadCrum from "../components/UI/BreadCrum";
import CustomeDatePicker from "../components/Form/CustomeDatePicker";
// import CSRFToken from "../components/Form/Csrf";


import useInput from "../hooks/use-Input";
import usePanVarify from "../hooks/use-pan-varify";
import useAadharVarify from "../hooks/use-aadhar-varify";
import UseNotificationManager from "../hooks/use-notification-manager";
import useActions from "../hooks/use-actions";
import UseAddress from "../hooks/use-address";

import SvgFileEarmarkFrame from "../assets/iconComponents/FileEarmarkFrame";
import SvgUnion from "../assets/iconComponents/Union";

import { EndPoint } from "../data/EndPoint";
import { CreateClientTabList } from "../data/TabList";
import {
  UserTypeList,
  AccountTypeList,
  GenderList,
  MaritalStatusLis,
  BloodGroupList,
  OccupationList,
  ClientNomineeRelationList,
} from "../data/DropDownList";

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
  GreaterThenValidation,
  LessThenValidation,
  LessThenEqualtoValidation,
} from "../components/Form/validations/validations";

import {
  emailFieldValidation,
  mobileFieldValidation,
  aadharFieldValidation,
} from "../components/Form/validations/fieldsValidation";

import FormContext from "../store/FormContext";
import { RoutPath } from "../data/Paths";
import { Models } from "../data/Models";

const Client = () => {
  const [TabChange, setTabChange] = useState(false);
  const [FocusPan, setFocusPan] = useState(false);
  const [GuardianFocusPan, setGuardianFocusPan] = useState(false);

  const [IsCkycDone, setIsCkycDone] = useState(false);
  const [PanData, setPanData] = useState(false);
  const [Esign, setEsign] = useState(false);
  const [EsignHasError, setEsignHasError] = useState(false);
  const [EsignValid, setEsignValid] = useState(false);
  
  const [IsMinor, setIsMinor] = useState(false);
  const [BirthYearAsPan, setBirthYearAsPan] = useState();
  const [ClientCode, setClientCode] = useState();
  const [AddharIsVarified, setAddharIsVarified] = useState(false);
  const [AddressValidation, setAddressValidation] = useState(false);
  const [AddressValues, setAddressValues] = useState({});
  const [UpdateAddressValues, setUpdateAddressValues] = useState(false);
  const [CountryList, setCountryList] = useState([]);
  const [StateList, setStateList] = useState([]);
  const [CityList, setCityList] = useState([]);
  const [DefaultAddress, setDefaultAddress] = useState({});

  const [OfficeAddressValues, setOfficeAddressValues] = useState({});
  const [OfficeAddressValidation, setOfficeAddressValidation] = useState(false);
  const [UpdateOfficeAddressValues, setUpdateOfficeAddressValues] =
    useState(false);
  const [OfficeAddressStateList, setOfficeAddressStateList] = useState([]);
  const [OfficeAddressCityList, setOfficeAddressCityList] = useState([]);
  const [OfficeDefaultAddress, setOfficeDefaultAddress] = useState({});

  const [GuardianPanData, setGuardianPanData] = useState(false);
  const [GuardianBirthYearAsPan, setGuardianBirthYearAsPan] = useState();
  //   const [GuardianAddharIsVarified, setGuardianAddharIsVarified] =
  //     useState(false);
  const [GuardianAddressValidation, setGuardianAddressValidation] =
    useState(false);
  const [GuardianAddressValues, setGuardianAddressValues] = useState({});
  const [GuardianUpdateAddressValues, setGuardianUpdateAddressValues] =
    useState({});
  const [IsGuardianAddressSameAsMy, setIsGuardianAddressSameAsMy] =
    useState(false);
  const [GuardianAddressStateList, setGuardianAddressStateList] = useState([]);
  const [GuardianAddressCityList, setGuardianAddressCityList] = useState([]);
  const [DefaultGuardianAddress, setDefaultGuardianAddress] = useState({});

  const [DmatInEditMode, setDmatInEditMode] = useState("");
  const [DmatInfoList, setDmatInfoList] = useState([]);

  const [FocusBank, setFocusBank] = useState(false);
  const [EditBankAcNo, setEditBankAcNo] = useState(false);

  const [IsHomeAddressPrimary, setIsHomeAddressPrimary] = useState(true);
  const [IsofficeAddressPrimary, setIsofficeAddressPrimary] = useState(false);
  const [IsBankAcPrimary, setIsBankAcPrimary] = useState(true);
  const [BankInEditMode, setBankInEditMode] = useState("");
  const [BankInfoList, setBankInfoList] = useState([]);
  const [visibleTab, setVisibleTab] = useState(CreateClientTabList[0].id);
  const [ontificationList, setontificationList] = useState([]);

  const [NomineeIsMinor, setNomineeIsMinor] = useState(false);
  const [NomineeList, setNomineeList] = useState([]);
  const [isNomineeUPdateMode, setisNomineeUPdateMode] = useState(false);
  const [NomineeAddressValidation, setNomineeAddressValidation] =
    useState(false);
  const [NomineeAddressValues, setNomineeAddressValues] = useState({});
  const [NomineeUpdateAddressValues, setNomineeUpdateAddressValues] = useState(
    {}
  );
  const [NomineereSetAddressValues, setNomineereSetAddressValues] = useState(
    {}
  );
  const [NomineeTotalShare, setNomineeTotalShare] = useState();
  const [NomineeInEditMode, setNomineeInEditMode] = useState();
  const [IsNomineeAddressSameAsMy, setIsNomineeAddressSameAsMy] =
    useState(false);
  const DeamtRef = useRef();
  //   const PhoneRef = useRef();
  //   const MICRRef = useRef();
  //   const DPDetailsRef = useRef();
  //   const DpNameRef = useRef();
  const GuardianPanRef = useRef();
  const PanRef = useRef();
  const BankRef = useRef();
  const idRef = useRef();

  const { fetchCountry, fetchState, fetchCity } = UseAddress();
  const formContext = useContext(FormContext);
  const notificationList = UseNotificationManager(
    ontificationList,
    "error-alert"
  );

  const create = formContext.mode === "save";
  const edit = formContext.mode === "edit";
  const read = formContext.mode === "read";

  const emailValidationMsg = (value) => {
    if (!EmailValidation(value)) {
      setontificationList((prev) => [...prev, { msg: "Enter Valid Email!" }]);
    }
  };
  const mobileValidationMsg = (value) => {
    if (!LenValidation(value, 10)) {
      setontificationList((prev) => [
        ...prev,
        { msg: "mobile number should have 10 digit long!" },
      ]);
    }
  };

  const aadharValidationMsg = (value) => {
    if (!LenValidation(value, 12)) {
      setontificationList((prev) => [
        ...prev,
        { msg: "Aadhar number should have 12 digit long!" },
      ]);
    } else if (ShouldStartWith(value, "1")) {
      setontificationList((prev) => [
        ...prev,
        { msg: "Aadhar number should not start with 1!" },
      ]);
    } else if (!DigitOnlyValidation(value)) {
      setontificationList((prev) => [
        ...prev,
        { msg: "Aadhar number is should only have digit!" },
      ]);
    }
  };

  useEffect(() => {
    const set_country = async (
      Country,
      officeCountry = false,
      guardianCountry = false
    ) => {
      try {
        const list = await fetchCountry();
        setCountryList(list);
        setDefaultAddress((prev) => ({
          ...prev,
          Country: list.filter((item) => item.value === Country)[0],
        }));
        if (officeCountry) {
          setOfficeDefaultAddress((prev) => ({
            ...prev,
            Country: list.filter((item) => item.value === officeCountry)[0],
          }));
        }
        if (guardianCountry) {
          setDefaultGuardianAddress((prev) => ({
            ...prev,
            Country: list.filter((item) => item.value === guardianCountry),
          }));
        }
      } catch (err) {
        console.log("err=", err);
      }
    };

    const set_state = async (
      country,
      state,
      officeCountry = false,
      officeState = false,
      guardianCountry = false,
      guardianState = false
    ) => {
      const list = await fetchState(country);
      setStateList((prev) => list);
      setDefaultAddress((prev) => {
        return {
          ...prev,
          State: list.filter((item) => item.value === state)[0],
        };
      });

      if (officeCountry && country === officeCountry) {
        setOfficeAddressStateList(list);
        setOfficeDefaultAddress((prev) => ({
          ...prev,
          State: list.filter((item) => item.value === officeState)[0],
        }));
      } else {
        if (officeCountry) {
          const list = await fetchState(officeCountry);
          setOfficeAddressStateList(list);
          setOfficeDefaultAddress((prev) => ({
            ...prev,
            State: list.filter((item) => item.value === officeState)[0],
          }));
        }
      }
      if (guardianCountry && country === guardianCountry) {
        setGuardianAddressStateList(list);
        setDefaultGuardianAddress((prev) => ({
          ...prev,
          State: list.filter((item) => item.value === guardianState)[0],
        }));
      } else {
        if (guardianCountry) {
          const list = await fetchState(guardianCountry);
          setGuardianAddressStateList(list);
          setDefaultGuardianAddress((prev) => ({
            ...prev,
            State: list.filter((item) => item.value === guardianState)[0],
          }));
        }
      }
    };

    const set_city = async (
      state,
      city,
      officeState = false,
      officeCity = false,
      guardianState = false,
      guardianCity = false
    ) => {
      const list = await fetchCity(state);
      setCityList(list);
      setDefaultAddress((prev) => {
        return {
          ...prev,
          City: list.filter((item) => item.value === city)[0],
        };
      });
      if (officeState && officeState === state) {
        setOfficeAddressCityList(list);
        setOfficeDefaultAddress((prev) => ({
          ...prev,
          City: list.filter((item) => item.value === officeCity)[0],
        }));
      } else {
        if (officeState) {
          const list = await fetchCity(officeState);

          setOfficeAddressCityList(list);
          setOfficeDefaultAddress((prev) => ({
            ...prev,
            City: list.filter((item) => item.value === officeCity)[0],
          }));
        }
      }

      if (guardianState && guardianState === state) {
        setGuardianAddressCityList(list);
        setDefaultGuardianAddress((prev) => ({
          ...prev,
          City: list.filter((item) => item.value === guardianCity)[0],
        }));
      } else {
        if (guardianState) {
          const list = await fetchCity(guardianState);

          setGuardianAddressCityList(list);
          setDefaultGuardianAddress((prev) => ({
            ...prev,
            City: list.filter((item) => item.value === guardianCity)[0],
          }));
        }
      }
    };

    formContext.setActiveview("form");
    // formContext.setActiveMode("save");
    if (FocusPan) {
      PanRef.current.focus();
    }
    if (FocusBank) {
      BankRef.current.focus();
    }
    if (GuardianFocusPan) {
      GuardianPanRef.current.focus();
    }

    if (read || edit) {
      //   const CountryList_responce = await fetch(`${EndPoint}${Models.County}/`);
      //   const CountryList_body = await CountryList_responce.json();
      //   const countrys = CountryList_body.map((country) => {
      //     return { value: country.id, label: country.name };
      //   });
      //   setDefaultCountry(countrys.fil)

      const record = formContext.Activerecord;
      const HomeAddress = record.address[0];
      const OfficeAddress = record.address[1];
      const guardianAddress =
        record.uccholder.length > 0 ? record.uccholder[0].address[0] : false;
      set_country(
        HomeAddress.country,
        OfficeAddress ? OfficeAddress.country : false,
        guardianAddress ? guardianAddress.country : false
      );

      set_state(
        HomeAddress.country,
        HomeAddress.state,
        OfficeAddress ? OfficeAddress.country : false,
        OfficeAddress ? OfficeAddress.state : false,
        guardianAddress ? guardianAddress.country : false,
        guardianAddress ? guardianAddress.state : false
      );
      set_city(
        HomeAddress.state,
        HomeAddress.city,
        OfficeAddress ? OfficeAddress.state : false,
        OfficeAddress ? OfficeAddress.city : false,
        guardianAddress ? guardianAddress.state : false,
        guardianAddress ? guardianAddress.city : false
      );
      setDefaultAddress((prev) => {
        return {
          ...prev,
          id: HomeAddress.id,
          Address1: HomeAddress.address1,
          Address2: HomeAddress.address2,
          Address3: HomeAddress.address3,
          Pincode: HomeAddress.pincode,
          Phone: HomeAddress.phone,
        };
      });

      if (OfficeAddress) {
        setOfficeDefaultAddress((prev) => {
          return {
            ...prev,
            id: OfficeAddress.id,
            Address1: OfficeAddress.address1,
            Address2: OfficeAddress.address2,
            Address3: OfficeAddress.address3,
            Pincode: OfficeAddress.pincode,
            Phone: OfficeAddress.phone,
          };
        });
      }

      setBankInfoList([...record.bank]);
      setDmatInfoList(record.demat);
      setNomineeList(record.nominee);
      // uccholder
      if (record.uccholder.length > 0) {
        SetGuardianfirstName(record.uccholder[0].first_name);
        SetGuardianMiddleName(record.uccholder[0].middle_name);
        SetGuardianlastName(record.uccholder[0].last_name);
        SetGuardianDOB(record.uccholder[0].date_of_birth, "date");
        setGuardianpan(record.uccholder[0].pan_number);
        setDefaultGuardianAddress((prev) => {
          return {
            ...prev,
            id: guardianAddress.id,
            Address1: guardianAddress.address1,
            Address2: guardianAddress.address2,
            Address3: guardianAddress.address3,
            Pincode: guardianAddress.pincode,
            Phone: guardianAddress.phone,
          };
        });
      }
      setClientCode(record.client_code);
      SetfirstName(record.first_name);
      SetmiddleName(record.middle_name);
      SetlastName(record.last_name);
      // tax_status
      Setgender(record.gender);
      SetDOB(record.date_of_birth, "date");
      SetOccupation(
        OccupationList.filter((item) => item.value === record.occupation_code)
      );
      // client_holding
      // pan_excemption
      SetPan(record.pan_number);
      // pan_excemption_category
      // client_type
      // PMS
      // default_dp
      // cdsl_dpid
      // cdsl_cltid
      // cmbp_id
      // nsdl_dpid
      // nsdl_cltid
      SetEmail(record.email);
      // check_name
      // divident_pay_mode
      // communication_mode
      setMobile(record.mobile);
      // aadhar_updated
      // mapin_id
      // paperless_flag
      // lei_no
      // lei_validity
      // mobile_self_declare_flag
      // email_self_declare_flag
      // is_active
      // father_first_name
      // father_last_name
      // arn_code
      // cancel_check
      // kyc_type
      // ckyc_number
      // kra_excemption_ref_no
      setAadhar(record.aadhar_number);
      SetAnniversary(record.anniversary_date);
      // broker_code
      //   emfi_code
      // family_group_code
      Setstatus(record.marital_status);
      SetBloodGroup(record.blood_group);
      // income_slab
    }
    return () => {
      setFocusPan(false);
      setFocusBank(false);
      //   setDefaultAddress(false);
    };
  }, [
    IsMinor,
    FocusPan,
    FocusBank,
    GuardianFocusPan,
    formContext.mode,
    formContext.Activerecord,
  ]);

  const changeTabHandler = (val) => {
    setTabChange(val);
    if (
      val < visibleTab ||
      val === visibleTab ||
      (val === 2 && tab1IsValid) ||
      (val === 3 && tab1IsValid && tab2IsValid) ||
      (val === 4 && tab1IsValid && tab2IsValid && tab3IsValid) ||
      (val === 5 &&
        tab1IsValid &&
        tab2IsValid &&
        tab3IsValid &&
        (tab4IsValid || BankInfoList.length !== 0)) ||
      (val === 6 &&
        tab1IsValid &&
        tab2IsValid &&
        tab3IsValid &&
        BankInfoList.length !== 0 &&
        (tab5IsValid || NomineeList.length !== 0))
    ) {
      if (val === 5 && BankInfoList.length === 0) {
        setontificationList((prev) => [...prev, { msg: "Please add bank!" }]);
        return;
      }
      if (val === 6 && NomineeList.length === 0) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Please add nominee!" },
        ]);
        return;
      }
      //   else if ([2, 3, 4].includes(val) && IsMinor && !tab6IsValid) {
      //     setontificationList((prev) => [
      //       ...prev,
      //       { msg: "Please fill all the required details!" },
      //     ]);
      //     return;
      //   }
      setVisibleTab(val);
    } else {
      if (!tab1IsValid) {
        if (!PanData) {
          setontificationList((prev) => [
            ...prev,
            { msg: "Please varify Pan!" },
          ]);
        } else if (!AddharIsVarified) {
          setontificationList((prev) => [
            ...prev,
            { msg: "Please varify Aadhar!" },
          ]);
        } else if (
          BirthYearAsPan &&
          DOB.getFullYear() !== parseInt(BirthYearAsPan)
        ) {
          setontificationList((prev) => [
            ...prev,
            { msg: "Birthdate should be as pan!" },
          ]);
        } else {
          setontificationList((prev) => [
            ...prev,
            { msg: "Please fill all the required details!" },
          ]);
        }
      } else if (!tab2IsValid) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Please fill all the required details!" },
        ]);
      } else if (dmateIsRequer && DmatInfoList.length === 0) {
        setontificationList((prev) => [...prev, { msg: "please add Dmat!" }]);
      } else if (BankInfoList.length === 0) {
        setontificationList((prev) => [...prev, { msg: "Please add bank!" }]);
      } else if (NomineeList.length === 0) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Please add nominee!" },
        ]);
      } else {
        setontificationList((prev) => [
          ...prev,
          { msg: "Please fill all the required details!" },
        ]);
      }
    }
  };

  const listTitles = CreateClientTabList.map((item) => {
    return (
      <li
        onClick={() => changeTabHandler(item.id)}
        className={` nav-item 
         ${!IsMinor && item.id === 6 ? "d-none" : ""}`}
        key={uuid()}
      >
        <button
          className={`nav-link ${visibleTab === item.id ? "active" : ""}`}
          id={item.id}
          type="button"
        >
          {item.Title}
        </button>
      </li>
    );
  });

  // distributor detail validaton
  //   {
  //     defaultValue: {value: "0", label : "Super Distributor" },
  //     validateValue: (value) => { requerFieldValidation}
  //  }
  const {
    inputValue: SuperDistributor,
    isvalid: SuperDistributorIsvalid,
    hasError: SuperDistributorHasError,
    valueChangeHandler: SuperDistributoronChange,
    inputBlurHandler: SuperDistributoronBlure,
  } = useInput({
    defaultValue: { value: "0" },
    validateValue: (value) => requerSelectionValidation(value),
  });

  const {
    inputValue: Distributor,
    isvalid: DistributorIsvalid,
    hasError: DistributorHasError,
    valueChangeHandler: DistributoronChange,
    inputBlurHandler: DistributoronBlure,
  } = useInput({
    defaultValue: { value: "0" },
    validateValue: (value) => requerSelectionValidation(value),
  });

  const {
    inputValue: reference,
    isvalid: referenceIsvalid,
    hasError: referenceHasError,
    valueChangeHandler: referenceonChange,
    inputBlurHandler: referenceonBlure,
  } = useInput({
    defaultValue: { value: "0" },
    validateValue: (value) => requerSelectionValidation(value),
  });

  const {
    inputValue: branch,
    isvalid: branchIsvalid,
    hasError: branchHasError,
    valueChangeHandler: branchonChange,
    inputBlurHandler: branchonBlure,
  } = useInput({
    defaultValue: { value: "0" },
    validateValue: (value) => requerSelectionValidation(value),
  });

  //   personal detail tab validation
  const {
    inputValue: Pan,
    isvalid: PanIsvalid,
    hasError: PanHasError,
    valueChangeHandler: PanonChange,
    inputBlurHandler: PanonBlure,
    SetInputValue: SetPan,
  } = useInput({
    defaultValue: "",
    validateValue: (value) =>
      requerFieldValidation(value) && LenValidation(value, 10),
    maxLen: 10,
  });

  const IsCkycDoneChange = () => {
    setIsCkycDone((prev) => !prev);
  };

  const {
    inputValue: Ckyc,
    isvalid: CkycIsvalid,
    hasError: CkycHasError,
    valueChangeHandler: CkyconChange,
    inputBlurHandler: CkyconBlure,
    SetInputValue: SetCkyc,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => LenValidation(value, 10),
    DisplayErrorMsg: (value) => {
      if (LenValidation(value, 14)) {
        setontificationList((prev) => [
          ...prev,
          { msg: "C-kyc number should be 14 digit long !" },
        ]);
      }
    },
    maxLen: 14,
    digitOnly: true,
  });

  const {
    inputValue: firstName,
    isvalid: firstNameIsvalid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameonChange,
    inputBlurHandler: firstNameonBlure,
    SetInputValue: SetfirstName,
  } = useInput({ defaultValue: "" });

  const {
    inputValue: middleName,
    isvalid: middleNameIsvalid,
    hasError: middleNameHasError,
    valueChangeHandler: middleNameonChange,
    inputBlurHandler: middleNameonBlure,
    SetInputValue: SetmiddleName,
  } = useInput({ defaultValue: "" });

  const {
    inputValue: lastName,
    isvalid: lastNameIsvalid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameonChange,
    inputBlurHandler: lastNameonBlure,
    SetInputValue: SetlastName,
  } = useInput({ defaultValue: "" });

  const {
    inputValue: phone,
    isvalid: phoneIsvalid,
    hasError: phoneHasError,
    valueChangeHandler: phoneonChange,
    inputBlurHandler: phoneonBlure,
    SetInputValue: setphone,
  } = useInput({ defaultValue: "", digitOnly: true });

  const {
    inputValue: Mobile,
    isvalid: MobileIsvalid,
    hasError: MobileHasError,
    valueChangeHandler: MobileonChange,
    inputBlurHandler: MobileonBlure,
    SetInputValue: setMobile,
  } = useInput({
    ...mobileFieldValidation,
    DisplayErrorMsg: mobileValidationMsg,
  });

  const {
    inputValue: Aadhar,
    isvalid: AadharIsvalid,
    hasError: AadharHasError,
    valueChangeHandler: AadharonChange,
    inputBlurHandler: AadharonBlure,
    SetInputValue: setAadhar,
  } = useInput({
    ...aadharFieldValidation,
    DisplayErrorMsg: aadharValidationMsg,
    digitOnly: true,
  });

  const {
    inputValue: Email,
    isvalid: EmailIsvalid,
    hasError: EmailHasError,
    valueChangeHandler: EmailonChange,
    inputBlurHandler: EmailonBlure,
    SetInputValue: SetEmail,
  } = useInput({
    ...emailFieldValidation,
    DisplayErrorMsg: emailValidationMsg,
  });

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const UpdateIsMinor = (value) => {
    const age = getAge(value);
    let setMinor = false;
    // if (age < 18 && IsPastDate(value)) {
    if (visibleTab === 1) {
      setMinor = setIsMinor;
    } else {
      setMinor = setNomineeIsMinor;
    }
    if (
      age < 18 &&
      IsPastDate(value) &&
      BirthYearAsPan &&
      value.getFullYear() === parseInt(BirthYearAsPan)
    ) {
      setMinor(true);
      if (visibleTab === 1) Setstatus({ value: "S", label: "Single" });
    } else {
      setMinor(false);
    }
  };

  const {
    inputValue: DOB,
    isvalid: DOBIsvalid,
    hasError: DOBHasError,
    valueChangeHandler: DOBonChange,
    inputBlurHandler: DOBonBlure,
    SetInputValue: SetDOB,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => {
      return (
        requerFieldValidation(value) &&
        IsPastDate(value) &&
        (BirthYearAsPan
          ? value.getFullYear() === parseInt(BirthYearAsPan)
          : true)
      );
    },
    DisplayErrorMsg: (value) => {
      if (
        BirthYearAsPan &&
        value &&
        value.getFullYear() !== parseInt(BirthYearAsPan)
      ) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Birthdate should be as per pan!" },
        ]);
      } else if (requerFieldValidation(value) && !IsPastDate(value)) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Birthdate should not not be futuristic!" },
        ]);
      }
    },
    setDependent: UpdateIsMinor,
  });

  const {
    inputValue: BloodGroup,
    isvalid: BloodGroupIsvalid,
    hasError: BloodGroupHasError,
    valueChangeHandler: BloodGrouponChange,
    inputBlurHandler: BloodGrouponBlure,
    SetInputValue: SetBloodGroup,
  } = useInput({
    defaultValue: { value: "0" },
  });

  const {
    inputValue: gender,
    isvalid: genderIsvalid,
    hasError: genderHasError,
    valueChangeHandler: genderonChange,
    inputBlurHandler: genderonBlure,
    SetInputValue: Setgender,
  } = useInput({
    defaultValue: { value: "0" },
    validateValue: (value) => requerSelectionValidation(value),
  });

  const {
    inputValue: status,
    isvalid: statusIsvalid,
    hasError: statusHasError,
    valueChangeHandler: statusonChange,
    inputBlurHandler: statusonBlure,
    SetInputValue: Setstatus,
  } = useInput({
    defaultValue: { value: "0" },
    validateValue: (value) => requerSelectionValidation(value),
  });

  const {
    inputValue: Anniversary,
    isvalid: AnniversaryIsvalid,
    hasError: AnniversaryHasError,
    valueChangeHandler: AnniversaryonChange,
    inputBlurHandler: AnniversaryonBlure,
    SetInputValue: SetAnniversary,
  } = useInput({
    defaultValue: null,
    validateValue: (value) => {
      return requerFieldValidation(value) && IsPastDate(value);
    },
    DisplayErrorMsg: (value) => {
      if (!IsPastDate) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Anniversary should not not be futuristic!" },
        ]);
      }
    },
  });

  const {
    inputValue: Occupation,
    isvalid: OccupationIsvalid,
    hasError: OccupationHasError,
    valueChangeHandler: OccupationonChange,
    inputBlurHandler: OccupationonBlure,
    SetInputValue: SetOccupation,
  } = useInput({
    defaultValue: { value: "0" },
    validateValue: (value) => requerSelectionValidation(value),
  });

  //   guardian detail
  const {
    inputValue: Guardianpan,
    isvalid: GuardianpanIsvalid,
    hasError: GuardianpanHasError,
    valueChangeHandler: GuardianpanonChange,
    inputBlurHandler: GuardianpanonBlure,
    SetInputValue: setGuardianpan,
  } = useInput({
    defaultValue: "",
    validateValue: (value) =>
      requerFieldValidation(value) && LenValidation(value, 10),
    maxLen: 10,
  });

  const {
    inputValue: GuardianfirstName,
    isvalid: GuardianfirstNameIsvalid,
    hasError: GuardianfirstNameHasError,
    valueChangeHandler: GuardianfirstNameonChange,
    inputBlurHandler: GuardianfirstNameonBlure,
    SetInputValue: SetGuardianfirstName,
  } = useInput({ defaultValue: "" });

  const {
    inputValue: GuardianMiddleName,
    isvalid: GuardianMiddleNameIsvalid,
    hasError: GuardianMiddleNameHasError,
    valueChangeHandler: GuardianMiddleNameonChange,
    inputBlurHandler: GuardianMiddleNameonBlure,
    SetInputValue: SetGuardianMiddleName,
  } = useInput({ defaultValue: "" });

  const {
    inputValue: GuardianlastName,
    isvalid: GuardianlastNameIsvalid,
    hasError: GuardianlastNameHasError,
    valueChangeHandler: GuardianlastNameonChange,
    inputBlurHandler: GuardianlastNameonBlure,
    SetInputValue: SetGuardianlastName,
  } = useInput({ defaultValue: "" });

  const {
    inputValue: GuardianMobile,
    isvalid: GuardianMobileIsvalid,
    hasError: GuardianMobileHasError,
    valueChangeHandler: GuardianMobileonChange,
    inputBlurHandler: GuardianMobileonBlure,
  } = useInput({
    ...mobileFieldValidation,
    DisplayErrorMsg: mobileValidationMsg,
  });

  //   const {
  //     inputValue: GuardianAadhar,
  //     isvalid: GuardianAadharIsvalid,
  //     hasError: GuardianAadharHasError,
  //     valueChangeHandler: GuardianAadharonChange,
  //     inputBlurHandler: GuardianAadharonBlure,
  //   } = useInput({
  //     ...aadharFieldValidation,
  //     DisplayErrorMsg: aadharValidationMsg,
  //     digitOnly: true,
  //     BlureAction: CompareWithSelfAadhar,
  //   });

  const {
    inputValue: GuardianEmail,
    isvalid: GuardianEmailIsvalid,
    hasError: GuardianEmailHasError,
    valueChangeHandler: GuardianEmailonChange,
    inputBlurHandler: GuardianEmailonBlure,
    SetInputValue: SetGuardianEmail,
  } = useInput({
    ...emailFieldValidation,
    DisplayErrorMsg: emailValidationMsg,
  });

  const {
    inputValue: GuardianDOB,
    isvalid: GuardianDOBIsvalid,
    hasError: GuardianDOBHasError,
    valueChangeHandler: GuardianDOBonChange,
    inputBlurHandler: GuardianDOBonBlure,
    SetInputValue: SetGuardianDOB,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => {
      const age = getAge(value);
      return requerFieldValidation(value) && IsPastDate(value) && age >= 18;
    },
    DisplayErrorMsg: (value) => {
      const age = getAge(value);
      if (age < 18) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Guardian Should not be Minor!" },
        ]);
      }
      if (value && value.getFullYear() !== GuardianBirthYearAsPan) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Birthdate should be as per Guardianpan!" },
        ]);
      } else if (!IsPastDate(value)) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Birthdate should not not be futuristic!" },
        ]);
      }
    },
  });

  const getGuardianAddressValues = (...args) => {
    setGuardianAddressValidation({
      ...GuardianAddressValidation,
      ...args[0].validateAddress,
    });
    setGuardianAddressValues({ ...GuardianAddressValues, ...args[0].values });
    setGuardianUpdateAddressValues({
      ...GuardianUpdateAddressValues,
      ...args[0].updatevalue,
    });
  };

  const IsGuardianAddressSameAsMyChange = (event) => {
    setIsGuardianAddressSameAsMy((prev) => !prev);
  };

  // address tab validation
  const IsHomeAddressPrimaryChange = () => {
    // if (!tab2IsValid) {
    //   return;
    // }
    setIsHomeAddressPrimary((prev) => !prev);
    setIsofficeAddressPrimary((prev) => !prev);
  };

  const IsofficeAddressPrimaryChange = () => {
    setIsHomeAddressPrimary((prev) => !prev);
    setIsofficeAddressPrimary((prev) => !prev);
  };

  const validateAddress = (...args) => {
    setAddressValidation({
      ...AddressValidation,
      ...args[0].validateAddress,
    });
    setAddressValues({ ...AddressValues, ...args[0].values });
    setUpdateAddressValues({ ...UpdateAddressValues, ...args[0].updatevalue });
  };

  const getOfficeAddressValues = (...args) => {
    setOfficeAddressValidation({
      ...OfficeAddressValid,
      ...args[0].validateAddress,
    });
    setOfficeAddressValues({ ...AddressValues, ...args[0].values });
  };

  const varifyAadharClickHandler = async () => {
    const aadhar = visibleTab === 1 ? Aadhar : false;
    const Validaadhar = visibleTab === 1 ? AadharIsvalid : false;
    const res = await useAadharVarify(aadhar);
    // const res_data = res["data"]["pan_data"];
    if (!Validaadhar) {
      setontificationList((prev) => [
        ...prev,
        { msg: "Please Enter Valid Aadhar Number!" },
      ]);
      return;
    }
    if (res.status !== 200) {
      setontificationList((prev) => [
        ...prev,
        { msg: "There is some error while varify Aadhar!" },
      ]);
      return;
    }
    if (visibleTab === 1) {
      setAddharIsVarified(true);
    }
  };
  const EditAadharClickHandler = async () => {
    setAddharIsVarified(false);
  };
  const varifyPanClickHandler = async () => {
    // pan_data:
    //     aadhaar_linked: true
    //     address_data:
    //         city: "HYDERABAD"
    //         line_1: "21 LEHNA SINGH MARKET"
    //         line_2: "NAYANAGAR GANJ"
    //         pincode: "500001"
    //     category: "P"
    //     date_of_birth: "1994-XX-XX"
    //     document_id: "DXXPXXXX6F"
    //     document_type: "PAN"
    //     email: "JOHNDOE229@GMAIL.COM"
    //     first_name: "JOHN"
    //     gender: "MALE"
    //     last_name: "DOE"
    //     masked_aadhaar_number: "XXXXXXXX0617"
    // const res = await usePanVarify("DQXXXXXXXX");
    const pan = visibleTab === 1 ? Pan : Guardianpan;
    const ValidPan = visibleTab === 1 ? PanIsvalid : GuardianpanIsvalid;
    const res = await usePanVarify(pan);
    const res_data = res["data"]["pan_data"];

    if (!ValidPan) {
      setontificationList((prev) => [
        ...prev,
        { msg: "Please Enter Valid Pan Number!" },
      ]);
      return;
    }
    if (res.status !== 200) {
      setontificationList((prev) => [
        ...prev,
        { msg: "There is some error while varify Pan!" },
      ]);
      return;
    }
    visibleTab === 1 ? setPanData(res_data) : setGuardianPanData(res_data);
    const dob = res_data.date_of_birth.slice(0, 4);
    visibleTab === 1 ? setBirthYearAsPan(dob) : setGuardianBirthYearAsPan(dob);
    // SetDOB("00-00-" + res_data.date_of_birth.slice(0,4))
    let gender = res_data.gender.toLowerCase();
    let genderVal = false;
    gender === "MALE"
      ? (genderVal = "M")
      : gender === "FEMALE"
      ? (genderVal = "M")
      : (genderVal = "O");

    if (visibleTab === 1) {
      //   ############################################################################################
      //   ToDo: do set address and other user detail afater kyc api or api for varify pan is finalised
      //   ############################################################################################
      SetfirstName(res_data.first_name);
      SetlastName(res_data.last_name);

      Setgender({ value: genderVal, label: res_data.gender });

      SetEmail(res_data.email);

      //   UpdateAddressValues.SetAddress1(res_data.address_data.line_1);
      //   UpdateAddressValues.SetAddress2(res_data.address_data.line_2);
      //   UpdateAddressValues.SetCity(res_data.address_data.city);
      //   UpdateAddressValues.SetPincode(res_data.address_data.pincode);
    } else {
      //   ############################################################################################
      //   ToDo: do set address and other user detail afater kyc api or api for varify pan is finalised
      //   ############################################################################################
      SetGuardianfirstName(res_data.first_name);
      SetGuardianlastName(res_data.last_name);
      //   SetGuardiangender({ value: genderVal, label: res_data.gender });

      SetGuardianEmail(res_data.GuardianEmail);
      // UpdateAddressValues.SetAddress1(res_data.address_data.line_1);
      // UpdateAddressValues.SetAddress2(res_data.address_data.line_2);
      // UpdateAddressValues.SetCity(res_data.address_data.city);
      // UpdateAddressValues.SetPincode(res_data.address_data.pincode);
    }
  };

  const EditPanClickHandler = () => {
    if (visibleTab === 1) {
      setPanData(false);
      SetfirstName("");
      SetlastName("");
      Setgender({ value: "0", label: "" });
      SetEmail("");
      //   UpdateAddressValues.SetAddress1("");
      //   UpdateAddressValues.SetAddress2("");
      //   UpdateAddressValues.SetAddress3("");
      //   UpdateAddressValues.SetCountry(null);
      //   UpdateAddressValues.SetState(null);
      //   UpdateAddressValues.SetCity(null);
      //   UpdateAddressValues.SetPincode("");
      setFocusPan(true);
    } else {
      setGuardianPanData(false);
      SetGuardianfirstName("");
      SetGuardianlastName("");
      //   SetGuardiangender({ value: "0", label: "" });
      SetGuardianEmail("");
      //   UpdateAddressValues.SetGuardianAddress1("");
      //   UpdateAddressValues.SetGuardianAddress2("");
      //   UpdateAddressValues.SetGuardianCity("");
      //   UpdateAddressValues.SetGuardianPincode("");
      setFocusPan(true);
    }
  };
  //   bank tab validation

  const IsBankAcPrimaryChange = () => {
    setIsBankAcPrimary((prev) => !prev);
  };

  const {
    inputValue: BankName,
    isvalid: BankNameIsvalid,
    hasError: BankNameHasError,
    valueChangeHandler: BankNameonChange,
    inputBlurHandler: BankNameonBlure,
    SetInputValue: setBankName,
    reset: resetBankName,
  } = useInput({ defaultValue: "" });

  const {
    inputValue: AccountNumber,
    isvalid: AccountNumberIsvalid,
    hasError: AccountNumberHasError,
    valueChangeHandler: AccountNumberonChange,
    inputBlurHandler: AccountNumberonBlure,
    SetInputValue: setAccountNumber,
    reset: resetAccountNumber,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => {
      return (
        requerFieldValidation &&
        GreaterThenEqaltoLenValidation(value, 8) &&
        LessThenEqaltoLenValidation(value, 16)
      );
    },
    DisplayErrorMsg: (value) => {
      if (!DigitOnlyValidation(value)) {
        setontificationList((prev) => [
          ...prev,
          { msg: "AccountNumber should only have Digits !" },
        ]);
      } else if (
        LessThenLenValidation(value, 8) ||
        GreaterThenLenValidation(value, 16)
      ) {
        setontificationList((prev) => [
          ...prev,
          { msg: "AccountNumber should be 8-16 digit long !" },
        ]);
      }
    },
    maxLen: 16,
    digitOnly: true,
  });

  const {
    inputValue: ConfimAccountNumber,
    isvalid: ConfimAccountNumberIsvalid,
    hasError: ConfimAccountNumberHasError,
    valueChangeHandler: ConfimAccountNumberonChange,
    inputBlurHandler: ConfimAccountNumberonBlure,
    setValidity: setConfimAccountNumberIsvalid,
    reset: resetConfimAccountNumber,
    SetInputValue: setConfimAccountNumber,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => {
      return (
        requerFieldValidation &&
        GreaterThenEqaltoLenValidation(value, 8) &&
        LessThenEqaltoLenValidation(value, 16) &&
        AccountNumber === value
      );
    },
    DisplayErrorMsg: (value) => {
      if (!DigitOnlyValidation(value)) {
        setontificationList((prev) => [
          ...prev,
          { msg: "AccountNumber should only have Digits !" },
        ]);
      } else if (
        LessThenLenValidation(value, 8) ||
        GreaterThenLenValidation(value, 16)
      ) {
        setontificationList((prev) => [
          ...prev,
          { msg: "AccountNumber should be 8-16 digit long !" },
        ]);
      } else if (value.trim() !== AccountNumber) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Account Number and Confirm Account Number shoud be same!" },
        ]);
      }
    },
    maxLen: 16,
    digitOnly: true,
  });

  const {
    inputValue: AccountType,
    isvalid: AccountTypeIsvalid,
    hasError: AccountTypeHasError,
    valueChangeHandler: AccountTypeonChange,
    inputBlurHandler: AccountTypeonBlure,
    SetInputValue: setAccountType,
    reset: resetAccountType,
  } = useInput({
    defaultValue: { value: "SB", label: "Savings" },
    validateValue: (value) => requerSelectionValidation(value),
  });

  const {
    inputValue: BankCity,
    // isvalid: BankCityIsvalid,
    // hasError: BankCityHasError,
    valueChangeHandler: BankCityonChange,
    inputBlurHandler: BankCityonBlure,
    SetInputValue: setBankCity,
    reset: resetBankCity,
  } = useInput({ defaultValue: "" });

  const {
    inputValue: IFSC,
    isvalid: IFSCIsvalid,
    hasError: IFSCHasError,
    valueChangeHandler: IFSConChange,
    inputBlurHandler: IFSConBlure,
    SetInputValue: setIFSC,
    reset: resetIFSC,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => requerFieldValidation(value),
    BlureAction: fetchBankDetail,
  });

  const {
    inputValue: MICR,
    isvalid: MICRIsvalid,
    hasError: MICRHasError,
    valueChangeHandler: MICRonChange,
    inputBlurHandler: MICRonBlure,
    SetInputValue: setMICR,
    reset: resetMICR,
  } = useInput({ defaultValue: "" });

  const fetchBankDetail = async (value) => {
    const res = await fetch("https://ifsc.razorpay.com/" + value);
    const data = await res.json();
    setBankName(data.BANK);
    setBankCity(data.CITY);
    setMICR(data.MICR);
  };

  const EditBankAcNumberClickHandler = () => {
    setEditBankAcNo(true);
  };
  const resetBankForm = () => {
    resetIFSC();
    resetAccountNumber();
    resetConfimAccountNumber();
    resetAccountType({ value: "SB", label: "Savings" });
    resetBankName();
    resetBankCity();
    resetMICR();
    setIsBankAcPrimary(false);
    setBankInEditMode("");
  };

  const calcBankIsACtive = (bankISPrimary = false) => {
    const List = [...BankInfoList];
    if (List.length) {
      //   if (BankInEditMode !== "") {
      //     const curPrimaryBankIndex = List.findIndex(
      //             (bank) => bank.isPrimary === true
      //           );
      //     if(curPrimaryBankIndex !== BankInEditMode && List[BankInEditMode].isPrimary) {
      //         List[curPrimaryBankIndex].isPrimary = false;
      //     }
      //     // if (bankISPrimary) {
      //     //   const curPrimaryBankIndex = List.findIndex(
      //     //     (bank) => bank.isPrimary === true
      //     //   );
      //     //   if(BankInEditMode !== curPrimaryBankIndex) {
      //     //     List[curPrimaryBankIndex].isPrimary = false;
      //     //   }
      //     // }
      //     return [List];
      //   } else {
      const curPrimaryBankIndex = List.findIndex(
        (bank) => bank.isPrimary === true
      );
      if (curPrimaryBankIndex !== BankInEditMode && IsBankAcPrimary) {
        List[curPrimaryBankIndex].isPrimary = false;
        if (BankInEditMode !== "") {
          List[BankInEditMode].isPrimary = IsBankAcPrimary;
        }
        return [List, true];
      } else {
        if (
          curPrimaryBankIndex === BankInEditMode &&
          IsBankAcPrimary === false
        ) {
          setontificationList((prev) => [
            ...prev,
            { msg: "there shoud atleast one primary Bank!" },
          ]);
          return [List, false];
        }
        return [List, true];
      }
    }
    // }
    return [List];
  };
  const checkBankAxist = () => {
    // const List = [ ...BankInfoList ];
    const index = BankInfoList.findIndex(
      (bank) => bank.account_number === AccountNumber
    );
    if (index !== -1) {
      if (BankInEditMode === "") {
        setontificationList((prev) => [
          ...prev,
          { msg: "Bank is already there!" },
        ]);
        resetBankForm();
      }
      return true;
    } else {
      return false;
    }
  };
  const onAddBankHandler = () => {
    // const List = [ ...BankInfoList ];
    // const index = BankInfoList.findIndex(
    //   (bank) => bank.account_number === AccountNumber
    // );
    // if (index !== -1) {
    //   setontificationList((prev) => [
    //     ...prev,
    //     { msg: "Bank is already there!" },
    //   ]);
    //   resetBankForm();
    //   return;
    // }
    if (checkBankAxist()) {
      return;
    }
    const List = [
      ...calcBankIsACtive(IsBankAcPrimary)[0],
      //   {
      //     name: BankName,
      //     branch_city: BankCity,
      //     account_number: AccountNumber,
      //     account_type_bse: AccountType,
      //     ifsc_code: IFSC,
      //     micr_code: MICR,
      //     isPrimary: IsBankAcPrimary,
      //     // anr_no :,
      //     // anr_valid:,
      //   },
      {
        name: BankName,
        branch_name: "",
        branch_city: BankCity,
        account_type: AccountType,
        account_number: AccountNumber,
        ifsc_code: IFSC,
        micr_code: MICR,
        anr_no: "",
        anr_valid: null,
        default_bank_flag: IsBankAcPrimary ? "Y" : "N",
        // cheque_name: "",
      },
    ];

    setBankInfoList(List);
    resetBankForm();
  };

  const BankDetailClick = (event) => {
    setBankInEditMode(parseInt(event.currentTarget.id));
    const record = BankInfoList[event.currentTarget.id];
    setIFSC(record["ifsc_code"]);
    setAccountNumber(record["account_number"]);
    // setConfimAccountNumber(record["account_number"])
    setAccountType(record["account_type"]);
    setBankName(record["name"]);
    setBankCity(record["branch_city"]);
    setMICR(record["micr_code"]);
    setIsBankAcPrimary(record["isPrimary"]);
  };

  const BankDetailUpdateClick = () => {
    const data = calcBankIsACtive();
    const List = data[0];
    if (
      checkBankAxist() &&
      List[BankInEditMode].account_number !== AccountNumber
    ) {
      return;
    }
    if (data[1]) {
      List[BankInEditMode].ifsc_code = IFSC;
      List[BankInEditMode].account_number = AccountNumber;
      List[BankInEditMode].account_type = AccountType;
      List[BankInEditMode].micr_code = MICR;
      List[BankInEditMode].name = BankName;
    }
    setBankInfoList(List);
    resetBankForm();
    setBankInEditMode("");
    setEditBankAcNo(false);
  };
  const bankList = BankInfoList.map((bank, index) => {
    return (
      <tr key={uuid()} id={index} onClick={BankDetailClick}>
        <td>{bank.name}</td>
        <td>{bank.account_number}</td>
        <td>{bank.account_type["label"]}</td>
        <td>{bank.branch_city}</td>
        <td>{bank.micr_code}</td>
        <td>{bank.ifsc_code}</td>
        <td>
          <input
            type={"checkbox"}
            defaultChecked={bank.default_bank_flag}
            readOnly
            style={{ pointerEvents: "none" }}
          />
        </td>
      </tr>
    );
  });

  //   damat  tab validation
  const {
    inputValue: DpDetail,
    isvalid: DpDetailIsvalid,
    hasError: DpDetailHasError,
    valueChangeHandler: DpDetailonChange,
    inputBlurHandler: DpDetailonBlure,
    SetInputValue: setDpDetail,
    reset: resetDpDetail,
  } = useInput({
    defaultValue: "",
  });

  const {
    inputValue: DpName,
    isvalid: DpNameIsvalid,
    hasError: DpNameHasError,
    valueChangeHandler: DpNameonChange,
    inputBlurHandler: DpNameonBlure,
    SetInputValue: setDpName,
    reset: resetDpName,
  } = useInput({
    defaultValue: "",
  });

  const {
    inputValue: DpId,
    isvalid: DpIdIsvalid,
    hasError: DpIdHasError,
    valueChangeHandler: DpIdonChange,
    inputBlurHandler: DpIdonBlure,
    SetInputValue: setDpId,
    reset: resetDpId,
  } = useInput({
    defaultValue: "",
    validateValue: (value) =>
      requerFieldValidation(value) && LessThenEqaltoLenValidation(value, 16),
    DisplayErrorMsg: (value) => {
      if (GreaterThenLenValidation(value, 16)) {
        setontificationList((prev) => [
          ...prev,
          { msg: "DpId should be 1-16 digit long !" },
        ]);
      }
    },
    maxLen: 16,
  });

  const {
    inputValue: BeneficiaryAcNo,
    isvalid: BeneficiaryAcNoIsvalid,
    hasError: BeneficiaryAcNoHasError,
    valueChangeHandler: BeneficiaryAcNoonChange,
    inputBlurHandler: BeneficiaryAcNoonBlure,
    SetInputValue: setBeneficiaryAcNo,
    reset: resetBeneficiaryAcNo,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => {
      return (
        requerFieldValidation &&
        GreaterThenEqaltoLenValidation(value, 8) &&
        LessThenEqaltoLenValidation(value, 16)
      );
    },
    DisplayErrorMsg: (value) => {
      if (!DigitOnlyValidation(value)) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Beneficiary AccountNumber should only have Digits !" },
        ]);
      } else if (
        LessThenLenValidation(value, 8) ||
        GreaterThenLenValidation(value, 16)
      ) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Beneficiary AccountNumber should be 8-16 digit long !" },
        ]);
      }
    },
    maxLen: 16,
    digitOnly: true,
  });

  const resetDmatForm = () => {
    resetDpDetail();
    resetDpName();
    resetDpId();
    resetBeneficiaryAcNo();
  };

  const onAddDmatHandler = () => {
    // const List = [ ...BankInfoList ];
    const index = DmatInfoList.findIndex((dmat) => dmat.Dp_Id === DpId);
    if (index !== -1) {
      setontificationList((prev) => [
        ...prev,
        { msg: "Dmat is already added!" },
      ]);
      resetDmatForm();
      return;
    }
    const List = [
      //   ...calcBankIsACtive(IsBankAcPrimary)[0],
      ...DmatInfoList,
      {
        dp_details: DpDetail,
        dp_name: DpName,
        dp_id: DpId,
        benificary_acc_no: BeneficiaryAcNo,
      },
    ];

    setDmatInfoList(List);
    resetDmatForm();
  };

  const DmatDetailClick = (event) => {
    setDmatInEditMode(parseInt(event.currentTarget.id));
    const record = DmatInfoList[event.currentTarget.id];
    setDpDetail(record["dp_details"]);
    setDpName(record["dp_name"]);
    setDpId(record["dp_id"]);
    setBeneficiaryAcNo(record["benificary_acc_no"]);
  };

  const DmatDetailUpdateClick = () => {
    // const data = calcBankIsACtive();
    const List = [...DmatInfoList];
    if (DmatInEditMode.length !== 0) {
      List[DmatInEditMode].dp_details = DpDetail;
      List[DmatInEditMode].dp_name = DpName;
      List[DmatInEditMode].dp_id = DpId;
      List[DmatInEditMode].benificary_acc_no = BeneficiaryAcNo;
    }
    setDmatInfoList(List);
    resetDmatForm();
    setDmatInEditMode("");
  };
  const dmatlist = DmatInfoList.map((dmat, index) => {
    return (
      <tr key={uuid()} id={index} onClick={DmatDetailClick}>
        <td>{dmat.dp_details}</td>
        <td>{dmat.dp_name}</td>
        <td>{dmat.dp_id}</td>
        <td>{dmat.benificary_acc_no}</td>
      </tr>
    );
  });

  //   nominee tab
  const {
    inputValue: NomineeFirstName,
    isvalid: NomineeFirstNameIsvalid,
    hasError: NomineeFirstNameHasError,
    valueChangeHandler: NomineeFirstNameonChange,
    inputBlurHandler: NomineeFirstNameonBlure,
    SetInputValue: setNomineeFirstName,
    reset: resetNomineeFirstName,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => requerFieldValidation(value),
  });

  const {
    inputValue: NomineeMiddleName,
    isvalid: NomineeMiddleNameIsvalid,
    hasError: NomineeMiddleNameHasError,
    valueChangeHandler: NomineeMiddleNameonChange,
    inputBlurHandler: NomineeMiddleNameonBlure,
    SetInputValue: setNomineeMiddleName,
    reset: resetNomineeMiddleName,
  } = useInput({ defaultValue: "" });

  const {
    inputValue: NomineeLastName,
    isvalid: NomineeLastNameIsvalid,
    hasError: NomineeLastNameHasError,
    valueChangeHandler: NomineeLastNameonChange,
    inputBlurHandler: NomineeLastNameonBlure,
    SetInputValue: setNomineeLastName,
    reset: resetNomineeLastName,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => requerFieldValidation(value),
  });

  const {
    inputValue: NomineeDOB,
    isvalid: NomineeDOBIsvalid,
    hasError: NomineeDOBHasError,
    valueChangeHandler: NomineeDOBonChange,
    inputBlurHandler: NomineeDOBonBlure,
    SetInputValue: setNomineeDOB,
    reset: resetNomineeDOB,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => {
      const age = getAge(value);
      return requerFieldValidation(value) && IsPastDate(value);
      //   && age >= 18;
    },
    DisplayErrorMsg: (value) => {
      const age = getAge(value);
      if (value && !IsPastDate(value)) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Birthdate should not not be futuristic!" },
        ]);
        return;
      }
      // if (value && age < 18) {
      //   setontificationList((prev) => [
      //     ...prev,
      //     { msg: "Nominee Should not be Minor!" },
      //   ]);
      //   return;
      // }
    },
  });

  const {
    inputValue: NomineeEmail,
    isvalid: NomineeEmailIsvalid,
    hasError: NomineeEmailHasError,
    valueChangeHandler: NomineeEmailonChange,
    inputBlurHandler: NomineeEmailonBlure,
    SetInputValue: setNomineeEmail,
    reset: resetNomineeEmail,
  } = useInput({
    ...emailFieldValidation,
    DisplayErrorMsg: emailValidationMsg,
  });

  const {
    inputValue: NomineeMobile,
    isvalid: NomineeMobileIsvalid,
    hasError: NomineeMobileHasError,
    valueChangeHandler: NomineeMobileonChange,
    inputBlurHandler: NomineeMobileonBlure,
    SetInputValue: setNomineeMobile,
    reset: resetNomineeMobile,
  } = useInput({
    ...mobileFieldValidation,
    DisplayErrorMsg: mobileValidationMsg,
  });

  const {
    inputValue: PercentageofShare,
    isvalid: PercentageofShareIsvalid,
    hasError: PercentageofShareHasError,
    valueChangeHandler: PercentageofShareonChange,
    inputBlurHandler: PercentageofShareonBlure,
    SetInputValue: setPercentageofShare,
    reset: resetPercentageofShare,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => {
      return (
        requerFieldValidation(value) &&
        GreaterThenValidation(parseInt(value.trim()), 0) &&
        LessThenEqualtoValidation(parseInt(value.trim()), 100)
      );
    },
    DisplayErrorMsg: (value) => {
      if (requerFieldValidation) {
        if (
          LessThenValidation(parseInt(value.trim()), 0) ||
          GreaterThenValidation(parseInt(value.trim()), 100)
        ) {
          setontificationList((prev) => [
            ...prev,
            { msg: "Share should be bitween 0-100!" },
          ]);
        }
      }
    },
    maxLen: 3,
  });

  const {
    inputValue: NomineeIsMy,
    isvalid: NomineeIsMyIsvalid,
    hasError: NomineeIsMyHasError,
    valueChangeHandler: NomineeIsMyonChange,
    inputBlurHandler: NomineeIsMyonBlure,
    SetInputValue: setNomineeIsMy,
    reset: resetNomineeIsMy,
  } = useInput({
    defaultValue: { value: "0" },
    validateValue: requerSelectionValidation,
  });

  const EsignValidation = (files) => {
    return files.length !== 0;
  };

  const EsignValue = (file) => {
    setEsign(file);
  };
  const validateEsign = (validation) => {
    setEsignHasError(validation.hasError);
    setEsignValid(validation.isvalid);
  };
  
  const varifyEsign = async () => {
    const res = await useActions("post", "CreateFiles", false, Esign);
    const data = await res.json();

    debugger

    // const createres = await fetch("http://192.168.1.27:8080/CreateFiles/", {
    //     method: "post",
    //     body: JSON.stringify({file: Esign}),
    //     headers: {
    //       "Authorization": "Bearer " + JSON.parse(localStorage.getItem('token')).access
    //     },
    //   });
  }

  const CompareWithSelfAadhar = (value) => {
    if (value === Aadhar) {
      const per = visibleTab === 5 ? "Nominee" : "Guardian";
      setontificationList((prev) => [
        ...prev,
        { msg: per + " Aadhar should not be same as self" },
      ]);
    }
  };

  const {
    inputValue: NomineeAadhar,
    isvalid: NomineeAadharIsvalid,
    hasError: NomineeAadharHasError,
    valueChangeHandler: NomineeAadharonChange,
    inputBlurHandler: NomineeAadharonBlure,
    SetInputValue: setNomineeAadhar,
    reset: resetNomineeAadhar,
  } = useInput({
    ...aadharFieldValidation,
    DisplayErrorMsg: aadharValidationMsg,
    digitOnly: true,
    BlureAction: CompareWithSelfAadhar,
  });

  const IsNomineeAddressSameAsMyChange = () => {
    setIsNomineeAddressSameAsMy((prev) => !prev);
  };

  const validateNomineeAddress = (...args) => {
    setNomineeAddressValidation({
      ...NomineeAddressValidation,
      ...args[0].validateAddress,
    });
    setNomineeAddressValues({ ...AddressValues, ...args[0].values });
    setNomineeUpdateAddressValues({
      ...NomineeUpdateAddressValues,
      ...args[0].updatevalue,
    });
    setNomineereSetAddressValues({
      ...NomineereSetAddressValues,
      ...args[0].reSetvalue,
    });
  };

  const resetNomineeForm = () => {
    resetNomineeFirstName();
    resetNomineeMiddleName();
    resetNomineeLastName();
    resetNomineeDOB();
    resetNomineeEmail();
    resetNomineeMobile();
    resetPercentageofShare();
    resetNomineeIsMy({ value: "0" });
    // setNomineeIDProof();
    resetNomineeAadhar();
    NomineereSetAddressValues.reSetAddress1();
    NomineereSetAddressValues.reSetAddress2();
    NomineereSetAddressValues.reSetAddress3();
    NomineereSetAddressValues.reSetPincode();
    NomineereSetAddressValues.reSetCountry({ value: "0", label: "" });
    NomineereSetAddressValues.reSetState({ value: "0", label: "" });
    NomineereSetAddressValues.reSetCity({ value: "0", label: "" });
  };

  const onAddNomineeHandler = () => {
    if (!tab5IsValid) {
      setontificationList((prev) => [
        ...prev,
        { msg: "If You want To Add Nominee Fill all Requer Field!" },
      ]);
      return;
    }
    if (NomineeList.length !== 0) {
      const Sharesum = NomineeList.reduce(
        (totalShare, item) => totalShare + parseInt(item.share_appicable),
        0
      );
      const totalShare = Sharesum + parseInt(PercentageofShare);
      setNomineeTotalShare(totalShare);

      if (totalShare > 100) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Total of share should not exceed 100!" },
        ]);
        return;
      }
    }
    const List = [
      ...NomineeList,
      {
        first_name: NomineeFirstName,
        middle_name: NomineeMiddleName,
        last_name: NomineeLastName,
        date_of_birth: NomineeDOB.toISOString().substr(0, 10),
        email: NomineeEmail,
        mobile: NomineeMobile,
        minor_flag: NomineeIsMinor,
        client_nominee_relation: NomineeIsMy.value,
        share_appicable: PercentageofShare,
        address: [
          {
            address1: IsNomineeAddressSameAsMy
              ? AddressValues.Address1
              : NomineeAddressValues.Address1,
            address2: IsNomineeAddressSameAsMy
              ? AddressValues.Address2
              : NomineeAddressValues.Address2,
            address3: IsNomineeAddressSameAsMy
              ? AddressValues.Address3
              : NomineeAddressValues.Address3,
            pincode: IsNomineeAddressSameAsMy
              ? AddressValues.Pincode
              : NomineeAddressValues.Pincode,
            country: IsNomineeAddressSameAsMy
              ? AddressValues.Country.value
              : NomineeAddressValues.Country.value,
            state: IsNomineeAddressSameAsMy
              ? AddressValues.State.value
              : NomineeAddressValues.State.value,
            city: IsNomineeAddressSameAsMy
              ? AddressValues.City.value
              : NomineeAddressValues.City.value,
            phone: IsNomineeAddressSameAsMy
              ? AddressValues.Phone
              : NomineeAddressValues.Phone,
          },
        ],
      },
    ];
    setNomineeList(List);
    resetNomineeForm();
  };

  const NomineeDetailClick = async (event) => {
    setisNomineeUPdateMode(true);
    setNomineeInEditMode(parseInt(event.currentTarget.id));
    const record = NomineeList[event.currentTarget.id];
    setNomineeFirstName(record["first_name"]);
    setNomineeMiddleName(record["middle_name"]);
    setNomineeLastName(record["last_name"]);
    setNomineeDOB(record["date_of_birth"], "date");
    setNomineeEmail(record["email"]);
    setNomineeMobile(record["mobile"]);
    setNomineeIsMy(
      ClientNomineeRelationList.filter(
        (item) => item.value === record["client_nominee_relation"]
      )[0]
    );
    setPercentageofShare(record["share_appicable"]);
    NomineeUpdateAddressValues.SetAddress1(record.address[0].address1);
    NomineeUpdateAddressValues.SetAddress2(record.address[0].address2);
    NomineeUpdateAddressValues.SetAddress3(record.address[0].address3);
    NomineeUpdateAddressValues.SetPincode(record.address[0].Pincode);
    NomineeUpdateAddressValues.SetPincode(record.address[0].phone);
    NomineeUpdateAddressValues.SetCountry(
      CountryList.filter(
        (country) => country.value === record.address[0].country
      )
    );
    const state = StateList.filter(
      (state) => state.value === record.address[0].state
    );
    if (state.length !== 0) {
      NomineeUpdateAddressValues.SetState(state[0]);
    } else {
      const list = await fetchState(record.address[0].country);
      NomineeUpdateAddressValues.SetState(
        list.filter((state) => state.value === record.address[0].state)[0]
      );
    }

    const city = CityList.filter(
      (city) => city.value === record.address[0].city
    );
    if (city.length !== 0) {
      NomineeUpdateAddressValues.SetCity(city[0]);
    } else {
      const list = await fetchCity(record.address[0].state);
      NomineeUpdateAddressValues.SetCity(
        list.filter((city) => city.value === record.address[0].city)[0]
      );
    }
  };

  const NomineeDetailUpdateClick = () => {
    const List = [...NomineeList];
    List[NomineeInEditMode].first_name = NomineeFirstName;
    List[NomineeInEditMode].middle_name = NomineeMiddleName;
    List[NomineeInEditMode].last_name = NomineeLastName;
    List[NomineeInEditMode].date_of_birth =
      NomineeDOB.getFullYear() +
      "-" +
      NomineeDOB.getMonth() +
      "-" +
      NomineeDOB.getDate();
    List[NomineeInEditMode].email = NomineeEmail;
    List[NomineeInEditMode].mobile = NomineeMobile;
    List[NomineeInEditMode].client_nominee_relation = NomineeIsMy.value;
    List[NomineeInEditMode].share_appicable = PercentageofShare;
    List[NomineeInEditMode].minor_flag = NomineeIsMinor;
    List[NomineeInEditMode].address[0].address1 = IsNomineeAddressSameAsMy
      ? AddressValues.Address1
      : NomineeAddressValues.Address1;
    List[NomineeInEditMode].address[0].address2 = IsNomineeAddressSameAsMy
      ? AddressValues.Address2
      : NomineeAddressValues.Address2;
    List[NomineeInEditMode].address[0].address3 = IsNomineeAddressSameAsMy
      ? AddressValues.Address3
      : NomineeAddressValues.Address3;
    List[NomineeInEditMode].address[0].Pincode = IsNomineeAddressSameAsMy
      ? AddressValues.Pincode
      : NomineeAddressValues.Pincode;
    List[NomineeInEditMode].address[0].Country = IsNomineeAddressSameAsMy
      ? AddressValues.Country.value
      : NomineeAddressValues.Country.value;
    List[NomineeInEditMode].address[0].State = IsNomineeAddressSameAsMy
      ? AddressValues.State.value
      : NomineeAddressValues.State.value;
    List[NomineeInEditMode].address[0].City = IsNomineeAddressSameAsMy
      ? AddressValues.City.value
      : NomineeAddressValues.City.value;
    List[NomineeInEditMode].address[0].Phone = IsNomineeAddressSameAsMy
      ? AddressValues.Phone.value
      : NomineeAddressValues.Phone.value;

    setNomineeList(List);
    resetNomineeForm();
    setisNomineeUPdateMode(false);
  };
  const Nomineelist = NomineeList.map((nominee, index) => {
    return (
      <tr key={uuid()} id={index} onClick={NomineeDetailClick}>
        <td>
          {nominee.first_name +
            " " +
            nominee.middle_name +
            " " +
            nominee.last_name}
        </td>
        <td>{nominee.date_of_birth}</td>
        <td>{nominee.email}</td>
        <td>{nominee.mobile}</td>
        <td>{nominee.share_appicable}</td>
        <td>
          {
            ClientNomineeRelationList.filter(
              (item) => item.value === nominee.client_nominee_relation
            )[0].label
          }
        </td>
        <td>{nominee.address[0].address1}</td>
      </tr>
    );
  });

  //   const tab1IsValid = !read
  //     ? branchIsvalid &&
  //       referenceIsvalid &&
  //       DistributorIsvalid &&
  //       SuperDistributorIsvalid &&
  //       PanData &&
  //       PanIsvalid &&
  //       MobileIsvalid &&
  //       // (Aadhar.length ===0 || (Aadhar.length > 0 && AadharIsvalid)) &&
  //       AadharIsvalid &&
  //       AddharIsVarified &&
  //       EmailIsvalid &&
  //       DOBIsvalid &&
  //       BirthYearAsPan &&
  //       DOB.getFullYear() === parseInt(BirthYearAsPan) &&
  //       (gender ? genderIsvalid : true) &&
  //       statusIsvalid
  //     : // ((status.value ==="M") || status.value ==="S")
  //       true;

  const OfficeAddressIsRequer =
    OfficeAddressValues.Address1 ||
    OfficeAddressValues.Address2 ||
    OfficeAddressValues.Pincode ||
    (OfficeAddressValues.Country && +OfficeAddressValues.Country.value !== 0) ||
    (OfficeAddressValues.State && +OfficeAddressValues.State.value !== 0) ||
    (OfficeAddressValues.City && +OfficeAddressValues.City.value !== 0);

  const OfficeAddressValid = !read
    ? OfficeAddressIsRequer
      ? OfficeAddressValidation.Address1 &&
        OfficeAddressValidation.Address2 &&
        OfficeAddressValidation.Pincode &&
        OfficeAddressValidation.Country &&
        OfficeAddressValidation.State &&
        OfficeAddressValidation.City
      : true
    : //   AddressValidation.Address1 &&
      //   AddressValidation.Address2 &&
      //   AddressValidation.Pincode
      true;

  //   const tab2IsValid = !read
  //     ? AddressValidation.Address1 &&
  //       AddressValidation.Address2 &&
  //       AddressValidation.Pincode &&
  //       AddressValidation.Country &&
  //       AddressValidation.State &&
  //       AddressValidation.City &&
  //       OfficeAddressValid
  //     : true;

  const dmateIsRequer = DpDetail || DpName || DpId || BeneficiaryAcNo;

  //   const tab3IsValid = !read
  //     ? dmateIsRequer
  //       ? DpIdIsvalid && BeneficiaryAcNoIsvalid
  //       : true
  //     : true;

  //   const tab4IsValid = !read
  //     ? IFSCIsvalid &&
  //       AccountNumberIsvalid &&
  //       AccountTypeIsvalid &&
  //       (ConfimAccountNumberIsvalid ||
  //         (BankInEditMode.length !== 0 && !EditBankAcNo)) &&
  //       (AccountNumber === ConfimAccountNumber ||
  //         (BankInEditMode.length !== 0 && !EditBankAcNo))
  //     : //   BankInfoList.length !== 0
  //       true;

  const nomineeIsRequer = true;
  //   NomineeFirstName.length ||
  //   NomineeMiddleName.length ||
  //   NomineeLastName.length ||
  //   NomineeDOB.length ||
  //   NomineeEmail.length ||
  //   NomineeMobile.length ||
  //   NomineeIsMy.length ||
  //   PercentageofShare.length ||
  //   NomineeIDProof ||
  //   IsNomineeAddressSameAsMy ||
  //   NomineeAddressValues.Address1 ||
  //   NomineeAddressValues.Address2 ||
  //   NomineeAddressValues.Pincode
  //   NomineeAddressValues.Country ||
  //   NomineeAddressValues.State ||
  //   NomineeAddressValues.City;

  const tab5IsValid = !read
    ? nomineeIsRequer
      ? NomineeFirstNameIsvalid &&
        NomineeLastNameIsvalid &&
        NomineeDOBIsvalid &&
        NomineeEmailIsvalid &&
        NomineeMobileIsvalid &&
        NomineeIsMyIsvalid &&
        // NomineeIDProofValid &&
        // NomineeAadharIsvalid &&
        // NomineeAadhar !== Aadhar &&
        (IsNomineeAddressSameAsMy
          ? AddressValidation.Address1 &&
            AddressValidation.Address2 &&
            AddressValidation.Pincode
          : AddressValidation.Country &&
            AddressValidation.State &&
            AddressValidation.City &&
            NomineeAddressValidation.Address1 &&
            NomineeAddressValidation.Address2 &&
            NomineeAddressValidation.Pincode)
      : NomineeAddressValidation.Country &&
        NomineeAddressValidation.State &&
        NomineeAddressValidation.City
    : //   true
      true;

  const tab6IsValid = !read
    ? GuardianPanData &&
      GuardianpanIsvalid &&
      GuardianMobileIsvalid &&
      // (Aadhar.length ===0 || (Aadhar.length > 0 && AadharIsvalid)) &&
      // GuardianAadharIsvalid &&
      NomineeAadhar !== Aadhar &&
      // GuardianAddharIsVarified &&
      GuardianEmailIsvalid &&
      GuardianDOBIsvalid &&
      GuardianAddressValidation.Address1 &&
      GuardianAddressValidation.Address2 &&
      GuardianAddressValidation.Pincode &&
      GuardianAddressValidation.Country &&
      GuardianAddressValidation.State &&
      GuardianAddressValidation.City
    : true;

  const tab1IsValid = true;
  const tab2IsValid = true;
  const tab3IsValid = true;
  const tab4IsValid = true;
  //   const tab5IsValid = true;
  //   const tab6IsValid = true;

  //   const ActiveTabHandler = (val) => {
  //     let tab = visibleTab + val;
  //     // if ((tab === 2 || tab === 1) && IsMinor && visibleTab === 1) {
  //     //   tab = 6;
  //     // }
  //     setTabChange(tab);
  //     if (
  //       tab < visibleTab ||
  //       (tab === 2 && tab1IsValid) ||
  //       (tab === 3 && tab1IsValid && tab2IsValid) ||
  //       (tab === 4 && tab1IsValid && tab2IsValid && tab3IsValid) ||
  //       (tab === 5 &&
  //         tab1IsValid &&
  //         tab2IsValid &&
  //         tab3IsValid &&
  //         (tab4IsValid || BankInfoList.length !== 0)) ||
  //       (tab === 6 &&
  //         tab1IsValid &&
  //         tab2IsValid &&
  //         tab3IsValid &&
  //         BankInfoList.length !== 0 &&
  //         (tab5IsValid || NomineeList.length !== 0))
  //     ) {
  //       if (tab === 5 && BankInfoList.length === 0) {
  //         setontificationList((prev) => [...prev, { msg: "Please add bank!" }]);
  //         return;
  //       }
  //       if (tab === 6 && NomineeList.length === 0) {
  //         setontificationList((prev) => [
  //           ...prev,
  //           { msg: "Please add nominee!" },
  //         ]);
  //         return;
  //       }
  //       //   else if ([2, 3, 4].includes(tab) && IsMinor && !tab6IsValid) {
  //       //     setontificationList((prev) => [
  //       //       ...prev,
  //       //       { msg: "Please fill all the required details!" },
  //       //     ]);
  //       //     return;
  //       //   }
  //       setVisibleTab(tab);
  //     } else {
  //       if (!tab1IsValid) {
  //         if (!PanData) {
  //           setontificationList((prev) => [
  //             ...prev,
  //             { msg: "Please varify Pan!" },
  //           ]);
  //         } else if (!AddharIsVarified) {
  //           setontificationList((prev) => [
  //             ...prev,
  //             { msg: "Please varify Aadhar!" },
  //           ]);
  //         } else if (
  //           BirthYearAsPan &&
  //           DOB.getFullYear() !== parseInt(BirthYearAsPan)
  //         ) {
  //           setontificationList((prev) => [
  //             ...prev,
  //             { msg: "Birthdate should be as pan!" },
  //           ]);
  //         } else {
  //           setontificationList((prev) => [
  //             ...prev,
  //             { msg: "Please fill all the required details!" },
  //           ]);
  //         }
  //       } else if (!tab2IsValid || !tab3IsValid) {
  //         setontificationList((prev) => [
  //           ...prev,
  //           { msg: "Please fill all the required details!" },
  //         ]);
  //       } else if (BankInfoList.length === 0) {
  //         setontificationList((prev) => [...prev, { msg: "Please add bank!" }]);
  //       } else if (NomineeList.length === 0) {
  //         setontificationList((prev) => [
  //           ...prev,
  //           { msg: "Please add nominee!" },
  //         ]);
  //       } else {
  //         setontificationList((prev) => [
  //           ...prev,
  //           { msg: "Please fill all the required details!" },
  //         ]);
  //       }
  //     }
  //   };

  const FormIsValid =
    tab1IsValid &&
    tab2IsValid &&
    tab3IsValid &&
    BankInfoList.length !== 0 &&
    NomineeList.length !== 0 &&
    (IsMinor ? tab6IsValid : true);

  const submitHandler = async (event) => {
    event.preventDefault();
    const dob = new Date(DOB);
    if (FormIsValid) {
      const PersonalDetail = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        tax_status: null,
        gender: gender.value,
        date_of_birth: DOB.toISOString().substr(0, 10),
        //   dob.getFullYear() + "-" + (dob.getMonth() + 1) + "-" + dob.getDate(),
        occupation_code: Occupation.value,
        client_holding: null,
        pan_excemption: null,
        pan_number: Pan.toUpperCase(),
        pan_excemption_category: "",
        client_type: DmatInfoList.length === 0 ? "D" : "P",
        email: Email,
        mobile: Mobile,
        aadhar_updated: null,
        mapin_id: "",
        paperless_flag: null,
        lei_no: "",
        lei_validity: null,
        mobile_self_declare_flag: null,
        email_self_declare_flag: null,
        is_active: false,
        father_first_name: "",
        father_last_name: "",
        arn_code: "",
        cancel_check: null,
        aadhar_number: Aadhar,
        broker_code: null,
        emfi_code: "",
        family_group_code: "",
        marital_status: status.value,
        blood_group: BloodGroup.value,
        income_slab: null,
      };
      if (Anniversary !== null) {
        PersonalDetail["anniversary_date"] =
          Anniversary.getFullYear() +
          "-" +
          Anniversary.getMonth() +
          "-" +
          Anniversary.getDate();
      }
      const AddressDetail = {
        address_type: "01",
        address1: AddressValues.Address1,
        address2: AddressValues.Address2,
        address3: AddressValues.Address3,
        pincode: AddressValues.Pincode,
        is_primary: IsHomeAddressPrimary,
        phone: AddressValues.Phone,
        city: AddressValues.City.value,
        state: AddressValues.State.value,
        country: AddressValues.Country.value,
      };

      const OfficeAddressDetail = {
        address_type: "02",
        address1: OfficeAddressValues.Address1,
        address2: OfficeAddressValues.Address2,
        address3: OfficeAddressValues.Address3,
        pincode: OfficeAddressValues.Pincode,
        is_primary: IsofficeAddressPrimary,
        phone: "",
        city: OfficeAddressValues.City.value,
        state: OfficeAddressValues.State.value,
        country: OfficeAddressValues.Country.value,
      };

      if (NomineeTotalShare < 100) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Total of share should be 100!" },
        ]);
        return;
      }

      const nomineeList = NomineeList.map((nominee) => {
        return { ...nominee };
      });

      const NomineeDetail = nomineeList.map((nominee) => {
        const Nominee = {
          nomineeDetail: {
            first_name: nominee.first_name,
            middle_name: nominee.middle_name,
            last_name: nominee.last_name,
            date_of_birth: nominee.date_of_birth,
            client_nominee_relation: nominee.client_nominee_relation,
            share_appicable: nominee.share_appicable,
            mobile: nominee.mobile,
            email: nominee.email,
            minor_flag: nominee.minor_flag ? "Y" : "N",
            guardian: "",
          },
          Address: {
            address1: nominee.address[0].address1,
            address2: nominee.address[0].address2,
            address3: nominee.address[0].address3,
            pincode: nominee.address[0].pincode,
            country: nominee.address[0].country,
            state: nominee.address[0].state,
            city: nominee.address[0].city,
            phone: nominee.address[0].phone,
            is_primary: true,
            address_type: "01",
          },
        };
        if (edit) {
          Nominee.nomineeDetail["id"] = nominee.id;
          Nominee.Address["id"] = nominee.address[0].id;
        }
        return Nominee;
      });

      const GuardianDetail = {
        first_name: GuardianfirstName,
        middle_name: GuardianMiddleName,
        last_name: GuardianlastName,
        date_of_birth:
          GuardianDOB !== "" ? GuardianDOB.toISOString().substr(0, 10) : "",
        pan_excemption: null,
        pan_number: Guardianpan.toUpperCase(),
        pan_excemption_category: "",
        holder_type: null,
        kyc_type: null,
        ckyc_number: "",
        kra_excemption_ref_no: "",
        client: null,
        address: IsGuardianAddressSameAsMy
          ? [AddressDetail]
          : [
              {
                address1: GuardianAddressValues.address1,
                address2: GuardianAddressValues.address2,
                address3: GuardianAddressValues.address3,
                pincode: GuardianAddressValues.pincode,
                is_primary: true,
                phone: GuardianAddressValues.phone,
                city: GuardianAddressValues.City.value,
                state: GuardianAddressValues.State.value,
                country: GuardianAddressValues.Country.value,
              },
            ],
      };
      if (edit) {
        AddressDetail["id"] = DefaultAddress.id;
        PersonalDetail["client_code"] = ClientCode;
        if (OfficeDefaultAddress.id) {
          OfficeAddressDetail["id"] = OfficeDefaultAddress.id;
        }
      }
      const temp = BankInfoList.map((item) => {
        return { ...item };
      });
      const BankDetail = temp.map((item) => {
        item["account_type"] = item["account_type"]["value"];
        return item;
      });
      const formData = {
        ucc: {
          PersonalDetail: PersonalDetail,
          AddressDetail: AddressDetail,
          OfficeAddressDetail: OfficeAddressDetail,
          BankDetail: BankDetail,
          DmatDetail: DmatInfoList,
        },
        nominee: NomineeDetail,
      };

      if (IsMinor) {
        formData["guardian"] = GuardianDetail;
      }

      if (create) {
        const CreateRes = await useActions(
          "post",
          Models.client,
          false,
          JSON.stringify(formData)
        );
        debugger
        if (CreateRes.ok) {
          const newRecord = await CreateRes.json();
          formContext.setActiveRecord(newRecord);
          formContext.setActiveMode("read");
        } else {
          CreateRes.json().then((err) => {
            console.log(err);
          });
        }
      }
      const nomineelist = NomineeDetail.map((nominee) => ({
        ...nominee.nomineeDetail,
        address: [{ ...nominee.Address }],
      }));
      if (edit) {
        const updated_data = {
          id: formContext.Activerecord.id,
          ...PersonalDetail,
          bank: BankDetail,
          address: [AddressDetail],
          demat: DmatInfoList,
          nominee: nomineelist,
          uccholder: [],
        };
        if (OfficeAddressDetail.id) {
          updated_data["address"].push(OfficeAddressDetail);
        }
        const putRes = await useActions(
          "put",
          Models.Updateclient,
          formContext.Activerecord.id,
          JSON.stringify(updated_data)
        );
        if (putRes.ok) {
          const updated_record = await putRes.json();
          formContext.setActiveRecord(updated_record);
          formContext.setActiveMode("read");
        } else {
          putRes.json().then((err) => {
            console.log(err);
          });
        }
        //   formContext.setActiveMode("read");
        //   formContext.setActiveRecord(Editres);
      }
    } else {
      console.log("form is not valid");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="error-sidebar">{notificationList}</div>
        <div className="client-form-wrapper p-0 m-0">
          <form onSubmit={submitHandler}>
            {/* <CSRFToken/> */}
            <BreadCrum
              title="Client Master"
              to={RoutPath.None}
              FormIsValid={FormIsValid}
            />
            <div className="row w-100">
              <div className="col-md-3 col-sm-12 mb-2">
                <label htmlFor="branch" className="form-label asterisk_input">
                  Branch
                </label>
                <Selection
                  options={UserTypeList}
                  Searchable="true"
                  id="branch"
                  hasError={branchHasError || (TabChange > 1 && !branchIsvalid)}
                  value={branch}
                  onChange={branchonChange}
                  onBlur={branchonBlure}
                  isReadOnly={visibleTab !== 1 || read}
                />
              </div>
              <div className="col-md-3 col-sm-12 mb-2">
                <label
                  htmlFor="superdistributor"
                  className="form-label asterisk_input"
                >
                  Super Distributor
                </label>
                <Selection
                  options={UserTypeList}
                  Searchable="true"
                  id="superdistributor"
                  placeholder="superdistributor"
                  hasError={
                    SuperDistributorHasError ||
                    (TabChange > 1 && !SuperDistributorIsvalid)
                  }
                  value={SuperDistributor}
                  onChange={SuperDistributoronChange}
                  onBlur={SuperDistributoronBlure}
                  isReadOnly={visibleTab !== 1 || read}
                />
              </div>
              <div className="col-md-3 col-sm-12 mb-2">
                <label
                  htmlFor="distributor"
                  className="form-label asterisk_input"
                >
                  Distributor
                </label>
                <Selection
                  options={UserTypeList}
                  Searchable="true"
                  id="distributor"
                  hasError={
                    DistributorHasError ||
                    (TabChange > 1 && !DistributorIsvalid)
                  }
                  value={Distributor}
                  onChange={DistributoronChange}
                  onBlur={DistributoronBlure}
                  isReadOnly={visibleTab !== 1 || read}
                />
              </div>
              <div className="col-md-3 col-sm-12 mb-2">
                <label
                  htmlFor="reference"
                  className="form-label asterisk_input"
                >
                  Reference
                </label>
                <Selection
                  options={UserTypeList}
                  Searchable="true"
                  id="reference"
                  hasError={
                    referenceHasError || (TabChange > 1 && !referenceIsvalid)
                  }
                  value={reference}
                  onChange={referenceonChange}
                  onBlur={referenceonBlure}
                  isReadOnly={visibleTab !== 1 || read}
                />
              </div>
            </div>
            {/* tabs */}
            <div className="card table-card">
              <ul className="nav nav-pills mb-2" id="pills-tab">
                {listTitles}
              </ul>
              <div
                id="tab-1"
                className="tab-content"
                style={visibleTab === 1 ? {} : { display: "none" }}
              >
                <div
                  className="tab-pane fade show active"
                  id="pills-personal-detail"
                  role="tabpanel"
                  aria-labelledby="pills-personal-detail-tab"
                >
                  <div className="row">
                    <div className="col-md-4 col-sm-12 mb-2 py-4 d-flex align-items-center ">
                      <div
                        className="d-flex checkbox-wrapper "
                        // onClick={IsHomeAddressPrimaryChange}
                      >
                        <label className="switch-text p-0 m-0 me-2">
                          <input
                            type="checkbox"
                            id="ckyc"
                            onChange={IsCkycDoneChange}
                            checked={IsCkycDone ? true : false}
                            disabled={read}
                          />
                          Is C-KYC Done?
                        </label>
                      </div>
                    </div>
                    <div
                      className={`col-md-4 col-sm-12 mb-2 ${
                        IsCkycDone ? "" : "d-none"
                      }`}
                    >
                      <label
                        htmlFor="CkycNumber "
                        className="form-label asterisk_input"
                      >
                        C-KYC Number
                      </label>
                      <input
                        type="text"
                        className={`form-control text-uppercase`}
                        id="CkycNumber"
                        value={Ckyc}
                        onChange={CkyconChange}
                        onBlur={CkyconBlure}
                        disabled={read}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 col-sm-12 mb-2">
                      <label
                        htmlFor="PanNumber"
                        className="form-label asterisk_input"
                      >
                        Pan Number
                      </label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className={`form-control text-uppercase ${
                            Pan && PanIsvalid ? "me-2" : ""
                          } ${
                            PanHasError || (TabChange > 1 && !PanIsvalid)
                              ? "invalid"
                              : ""
                          } ${PanData ? "verified" : ""}`}
                          id="PanNumber"
                          ref={PanRef}
                          value={Pan}
                          onChange={PanonChange}
                          onBlur={PanonBlure}
                          disabled={PanData || read}
                        />
                        {Pan && PanIsvalid && !PanData && (
                          <button
                            type="button"
                            className={`custom-btn update-btn px-2 py-1 ms-1 font-12`}
                            onClick={varifyPanClickHandler}
                          >
                            Verify
                          </button>
                        )}
                        {PanData && (
                          <button
                            type="button"
                            className={`custom-btn update-btn px-2 py-1 ms-1 font-12 `}
                            onClick={EditPanClickHandler}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-12 mb-2">
                      <label
                        htmlFor="AadharCardNumber"
                        className="form-label asterisk_input"
                      >
                        Aadhar Card Number
                      </label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className={`form-control ${
                            Aadhar && AadharIsvalid ? "me-2" : ""
                          } ${
                            AadharHasError || (TabChange > 1 && !AadharIsvalid)
                              ? "invalid"
                              : ""
                          } ${Aadhar && AddharIsVarified ? "verified" : ""}`}
                          id="AadharCardNumber"
                          value={Aadhar}
                          onChange={AadharonChange}
                          onBlur={AadharonBlure}
                          disabled={read || AddharIsVarified}
                        />
                        {Aadhar && AadharIsvalid && !AddharIsVarified && (
                          <button
                            type="button"
                            className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12 `}
                            onClick={varifyAadharClickHandler}
                          >
                            Verify
                          </button>
                        )}
                        {Aadhar && AddharIsVarified && (
                          <button
                            type="button"
                            className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12`}
                            onClick={EditAadharClickHandler}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-12 mb-2 ">
                        <label
                          htmlFor="RelationWithInvestor"
                          className="form-label"
                        >
                          {" E-Sign "}
                        </label>
                        <div className="d-flex">
                        <FileInput
                          label="Image of Signature"
                          getValue={EsignValue}
                          accept=".jpg, .jpeg, .png"
                          validateFile={validateEsign}
                          validateValue={EsignValidation}
                          hasError={EsignHasError}
                          isRequer={nomineeIsRequer}
                          disabled={read}
                        />
                        {Esign && EsignValid && (
                          <button
                            type="button"
                            className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12 `}
                            onClick={varifyEsign}
                          >
                            Verify
                          </button>
                        )}
                        </div>
                    </div>
                    {/* <div className="col-md-4 col-sm-12 mb-2 d-flex justify-content-start align-items-end">
                      {Pan && PanIsvalid && !PanData && (
                        <button
                          type="button"
                          className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12`}
                          onClick={varifyPanClickHandler}
                        >
                          Verify
                        </button>
                      )}
                      {PanData && (
                        <button
                          type="button"
                          className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12 `}
                          onClick={EditPanClickHandler}
                        >
                          Edit
                        </button>
                      )}
                    </div> */}
                  </div>
                  <div className="row">
                    {/* <div className="col-md-4 col-sm-12 mb-2">
                      <label
                        htmlFor="AadharCardNumber"
                        className="form-label asterisk_input"
                      >
                        Aadhar Card Number
                      </label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className={`form-control me-2 ${
                            AadharHasError || (TabChange > 1 && !AadharIsvalid)
                              ? "invalid"
                              : ""
                          } ${Aadhar && AddharIsVarified ? "verified" : ""}`}
                          id="AadharCardNumber"
                          value={Aadhar}
                          onChange={AadharonChange}
                          onBlur={AadharonBlure}
                          disabled={read || AddharIsVarified}
                        />
                        {Aadhar && AadharIsvalid && !AddharIsVarified && (
                          <button
                            type="button"
                            className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12 `}
                            onClick={varifyAadharClickHandler}
                          >
                            Verify
                          </button>
                        )}
                        {Aadhar && AddharIsVarified && (
                          <button
                            type="button"
                            className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12`}
                            onClick={EditAadharClickHandler}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div> */}
                    {/* <div className="col-md-4 col-sm-12 mb-2 d-flex justify-content-start align-items-end">
                      {Aadhar && AadharIsvalid && !AddharIsVarified && (
                        <button
                          type="button"
                          className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12 `}
                          onClick={varifyAadharClickHandler}
                        >
                          Verify
                        </button>
                      )}
                      {Aadhar && AddharIsVarified && (
                        <button
                          type="button"
                          className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12`}
                          onClick={EditAadharClickHandler}
                        >
                          Edit
                        </button>
                      )}
                    </div> */}
                  </div>
                  {/* <div className="row">
                    <div className="col-md-4 col-sm-12 mb-2">
                      <label
                        htmlFor="PanNumber"
                        className="form-label asterisk_input"
                      >
                        Holding Type
                      </label>
                      <Selection
                        options={BloodGroupList}
                        Searchable="true"
                        id="BloodGroup"
                        value={BloodGroup}
                        onChange={BloodGrouponChange}
                        onBlur={BloodGrouponBlure}
                        isReadOnly={read}
                      />
                    </div>
                  </div> */}
                  <div className="row">
                    {/* <div className={`col-md-4 col-sm-12 mb-2`}>
                      <label
                        htmlFor="RelationWithInvestor"
                        className="form-label"
                      >
                        {" E-Sign "}
                      </label>
                      <FileInput
                        label="Image of Signature"
                        getValue={EsignValue}
                        accept=".jpg, .jpeg, .png"
                        validateFile={validateEsign}
                        validateValue={EsignValidation}
                        // hasError={NomineeIDProofHasError}
                        isRequer={nomineeIsRequer}
                        disabled={read}
                      />
                    </div> */}
                  </div>
                  <div className="row">
                    <div
                      className={`col-md-4 col-sm-12 mb-2 ${
                        PanData && !PanData.first_name ? "d-none" : ""
                      }`}
                    >
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className={`form-control`}
                        id="firstName"
                        value={firstName}
                        // onChange={firstNameonChange}
                        // onBlur={firstNameonBlure}
                        disabled={true}
                      />
                    </div>
                    <div
                      className={`col-md-4 col-sm-12 mb-2 ${
                        PanData && !PanData.middle_name ? "d-none" : ""
                      }`}
                    >
                      <label htmlFor="MiddleName" className={`form-label`}>
                        Middle Name
                      </label>
                      <input
                        type="text"
                        className={`form-control`}
                        id="MiddleName"
                        value={middleName}
                        // onChange={middleNameonChange}
                        // onBlur={middleNameonBlure}
                        disabled
                      />
                    </div>
                    <div
                      className={`col-md-4 col-sm-12 mb-2 ${
                        PanData && !PanData.first_name ? "d-none" : ""
                      }`}
                    >
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className={`form-control`}
                        id="lastName"
                        value={lastName}
                        // onChange={lastNameonChange}
                        // onBlur={lastNameonBlure}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* <div className="col-md-4 col-sm-12 mb-2">
                      <label htmlFor="PhoneNo" className="form-label">
                        Phone No
                      </label>
                      <input
                        type="text"
                        className={`form-control`}
                        id="PhoneNo"
                        value={phone}
                        onChange={phoneonChange}
                        onBlur={phoneonBlure}
                        disabled={read}
                      />
                    </div> */}
                    <div className="col-md-4 col-sm-12 mb-2">
                      <label
                        htmlFor="MobileNo"
                        className="form-label asterisk_input"
                      >
                        Mobile No.
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          MobileHasError || (TabChange > 1 && !MobileIsvalid)
                            ? "invalid"
                            : ""
                        }`}
                        id="MobileNo"
                        value={Mobile}
                        onChange={MobileonChange}
                        onBlur={MobileonBlure}
                        disabled={read}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 col-sm-12 mb-2">
                      <label
                        htmlFor="Email"
                        className="form-label asterisk_input"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className={`form-control 
                        ${
                          EmailHasError || (TabChange > 1 && !EmailIsvalid)
                            ? "invalid"
                            : ""
                        }`}
                        id="Email"
                        aria-describedby="emailHelp"
                        value={Email}
                        onChange={EmailonChange}
                        onBlur={EmailonBlure}
                        disabled={read}
                        required
                      />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-2">
                      <label
                        htmlFor="DateOfBirth"
                        className="form-label asterisk_input"
                      >
                        Date Of Birth
                      </label>
                      <CustomeDatePicker
                        dateFormat="yyyy-MM-dd"
                        selected={DOB}
                        className={`form-control ${
                          DOBHasError || (TabChange > 1 && !DOBIsvalid)
                            ? "invalid"
                            : ""
                        }`}
                        onChange={DOBonChange}
                        onBlur={DOBonBlure}
                        onCalendarClose={DOBonBlure}
                        disabled={read}
                        key={uuid()}
                      />

                      {/* <input
                        type="date" 
                        className={`form-control ${
                          DOBHasError || (TabChange > 1 && !DOBIsvalid)
                            ? "invalid"
                            : ""
                        }`}
                        id="DateOfBirth"
                        value={DOB}
                        onChange={DOBonChange}
                        onBlur={DOBonBlure}
                        disabled={read}
                      /> */}
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className={`col-md-4 col-sm-12 mb-2 ${
                        !Pan[3] ||
                        (Pan[3] && Pan[3].toUpperCase() !== "P") ||
                        !Pan.length
                          ? "d-none"
                          : "d-block"
                      }`}
                    >
                      <label htmlFor="Gender" className="form-label">
                        Gender
                      </label>
                      <Selection
                        options={GenderList}
                        Searchable="true"
                        id="Gender"
                        // hasError={genderHasError}
                        value={gender}
                        onChange={genderonChange}
                        onBlur={genderonBlure}
                        isReadOnly={true}
                      />
                    </div>
                    <div
                      className={`col-md-4 col-sm-12 mb-2 ${
                        !Pan[3] ||
                        (Pan[3] && Pan[3].toUpperCase() !== "P") ||
                        !Pan.length
                          ? "ps-0 d-none"
                          : "d-block"
                      }`}
                    >
                      <label
                        htmlFor="Status"
                        className="form-label asterisk_input"
                      >
                        Marital Status
                      </label>
                      <Selection
                        options={MaritalStatusLis}
                        Searchable="true"
                        id="Status"
                        hasError={
                          statusHasError || (TabChange > 1 && !statusIsvalid)
                        }
                        value={status}
                        onChange={statusonChange}
                        onBlur={statusonBlure}
                        isReadOnly={read}
                      />
                    </div>
                    {status.value === "M" && (
                      <div className={`col-md-4 col-sm-12 mb-2`}>
                        <label htmlFor="Anniversary" className="form-label">
                          Anniversary
                        </label>
                        {/* <input
                          type="date"
                          className={`form-control`}
                          id="Anniversary"
                          value={Anniversary}
                          onChange={AnniversaryonChange}
                          onBlur={AnniversaryonBlure}
                          disabled={read}
                        /> */}
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={Anniversary}
                          className={`form-control`}
                          onChange={AnniversaryonChange}
                          onBlur={AnniversaryonBlure}
                          onCalendarClose={AnniversaryonBlure}
                          disabled={read}
                        />
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-4 col-sm-12 mb-2">
                      <label htmlFor="BloodGroup" className="form-label">
                        Blood Group
                      </label>
                      <Selection
                        options={BloodGroupList}
                        Searchable="true"
                        id="BloodGroup"
                        value={BloodGroup}
                        onChange={BloodGrouponChange}
                        onBlur={BloodGrouponBlure}
                        isReadOnly={read}
                      />
                    </div>

                    <div className="col-md-4 col-sm-12 mb-2">
                      <label
                        htmlFor="Occupation"
                        className="form-label                  "
                      >
                        Occupation
                      </label>
                      <Selection
                        options={OccupationList}
                        Searchable="true"
                        id="Occupation"
                        value={Occupation}
                        onChange={OccupationonChange}
                        onBlur={OccupationonBlure}
                        isReadOnly={read}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* tab-6 guardian */}
              <div
                id="tab-6"
                className="tab-6"
                style={visibleTab === 6 ? {} : { display: "none" }}
              >
                <div className="row mt-3">
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="GuardianpanNumber"
                      className="form-label asterisk_input"
                    >
                      Guardian Pan Number
                    </label>
                    <input
                      type="text"
                      className={`form-control text-uppercase ${
                        GuardianpanHasError ||
                        (TabChange > 6 && !GuardianpanIsvalid)
                          ? "invalid"
                          : ""
                      } ${GuardianPanData ? "verified" : ""}`}
                      id="GuardianpanNumber"
                      ref={GuardianPanRef}
                      value={Guardianpan}
                      onChange={GuardianpanonChange}
                      onBlur={GuardianpanonBlure}
                      disabled={GuardianPanData || read}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2 d-flex justify-content-start align-items-end">
                    {Guardianpan && GuardianpanIsvalid && !GuardianPanData && (
                      <button
                        type="button"
                        className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12`}
                        onClick={varifyPanClickHandler}
                      >
                        Verify
                      </button>
                    )}
                    {GuardianPanData && (
                      <button
                        type="button"
                        className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12`}
                        onClick={EditPanClickHandler}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div
                    className={`col-md-4 col-sm-12 mb-2 ${
                      GuardianPanData && !GuardianPanData.first_name
                        ? "d-none"
                        : ""
                    }`}
                  >
                    <label htmlFor="GuardianfirstName" className="form-label">
                      Guardian First Name
                    </label>
                    <input
                      type="text"
                      className={`form-control`}
                      id="GuardianfirstName"
                      value={GuardianfirstName}
                      // onChange={GuardianfirstNameonChange}
                      // onBlur={GuardianfirstNameonBlure}
                      disabled={true}
                    />
                  </div>
                  <div
                    className={`col-md-4 col-sm-12 mb-2 ${
                      GuardianPanData && !GuardianPanData.middle_name
                        ? "d-none"
                        : ""
                    }`}
                  >
                    <label
                      htmlFor="GuardianMiddleName"
                      className={`form-label`}
                    >
                      Guardian Middle Name
                    </label>
                    <input
                      type="text"
                      className={`form-control`}
                      id="GuardianMiddleName"
                      value={GuardianMiddleName}
                      // onChange={GuardianMiddleNameonChange}
                      // onBlur={GuardianMiddleNameonBlure}
                      disabled
                    />
                  </div>
                  <div
                    className={`col-md-4 col-sm-12 mb-2 ${
                      GuardianPanData && !GuardianPanData.first_name
                        ? "d-none"
                        : ""
                    }`}
                  >
                    <label htmlFor="GuardianlastName" className="form-label">
                      Guardian Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-control`}
                      id="GuardianlastName"
                      value={GuardianlastName}
                      // onChange={GuardianlastNameonChange}
                      // onBlur={GuardianlastNameonBlure}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="GuardianMobileNo"
                      className="form-label asterisk_input"
                    >
                      Guardian Mobile No.
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        GuardianMobileHasError ||
                        (TabChange > 6 && !GuardianMobileIsvalid)
                          ? "invalid"
                          : ""
                      }`}
                      id="GuardianMobileNo"
                      value={GuardianMobile}
                      onChange={GuardianMobileonChange}
                      onBlur={GuardianMobileonBlure}
                      disabled={read}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="exampleInputGuardianEmail1"
                      className="form-label asterisk_input"
                    >
                      Guardian Email address
                    </label>
                    <input
                      type="Email"
                      className={`form-control ${
                        GuardianEmailHasError ||
                        (TabChange > 6 && !GuardianEmailIsvalid)
                          ? "invalid"
                          : ""
                      }`}
                      id="exampleInputGuardianEmail1"
                      aria-describedby="GuardianEmailHelp"
                      value={GuardianEmail}
                      onChange={GuardianEmailonChange}
                      onBlur={GuardianEmailonBlure}
                      disabled={read}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="DateOfBirth"
                      className="form-label asterisk_input"
                    >
                      Guardian Date Of Birth
                    </label>
                    <CustomeDatePicker
                      dateFormat="yyyy-MM-dd"
                      selected={GuardianDOB}
                      className={`form-control ${
                        GuardianDOBHasError ||
                        (TabChange > 6 && !GuardianDOBIsvalid)
                          ? "invalid"
                          : ""
                      }`}
                      onChange={GuardianDOBonChange}
                      onBlur={GuardianDOBonBlure}
                      onCalendarClose={GuardianDOBonBlure}
                      disabled={read}
                    />
                  </div>
                </div>
                <div className={`row`}>
                  <div className="col-md-3 col-sm-12 mb-2 d-flex align-items-center ">
                    <div className="d-flex checkbox-wrapper ">
                      <label className="switch-text p-0 m-0 me-2">
                        <input
                          type="checkbox"
                          id="Is_Guardian_address_Same_As_My"
                          onChange={IsGuardianAddressSameAsMyChange}
                          checked={IsGuardianAddressSameAsMy ? true : false}
                          disabled={read}
                        />{" "}
                        Address : Same As My address
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className={`row ${IsGuardianAddressSameAsMy ? "d-none" : ""}`}
                >
                  <Address
                    validateAddress={getGuardianAddressValues}
                    title="Guardian Address"
                    required={true}
                    read={read}
                    CountryList={IsMinor && CountryList ? CountryList : false}
                    StateList={
                      IsMinor && GuardianAddressStateList
                        ? GuardianAddressStateList
                        : false
                    }
                    CityList={
                      IsMinor && GuardianAddressCityList
                        ? GuardianAddressCityList
                        : false
                    }
                    DefaultAddress={
                      DefaultGuardianAddress ? DefaultGuardianAddress : false
                    }
                  />
                </div>
                {/* <div className="row">
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="GuardianAadharCardNumber"
                      className="form-label asterisk_input"
                    >
                      Guardian Aadhar Card Number
                    </label>
                    <input
                      type="text"
                      className={`form-control text-uppercase  ${
                        GuardianAadharHasError ||
                        (TabChange > 6 && !GuardianAadharIsvalid) ||
                        (GuardianAadharIsvalid && GuardianAadhar === Aadhar)
                          ? "invalid"
                          : ""
                      } ${
                        GuardianAadhar && GuardianAddharIsVarified
                          ? "verified"
                          : ""
                      }`}
                      id="GuardianAadharCardNumber"
                      value={GuardianAadhar}
                      onChange={GuardianAadharonChange}
                      onBlur={GuardianAadharonBlure}
                      disabled={read || GuardianAddharIsVarified}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2 d-flex justify-content-start align-items-end">
                    {GuardianAadhar &&
                      GuardianAadharIsvalid &&
                      !GuardianAddharIsVarified && (
                        <button
                          type="button"
                          className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12`}
                          onClick={varifyAadharClickHandler}
                        >
                          Verify
                        </button>
                      )}
                    {GuardianAadhar && GuardianAddharIsVarified && (
                      <button
                        type="button"
                        className={`custom-btn update-btn px-2 py-1 ms-1 me-2 font-12`}
                        onClick={EditAadharClickHandler}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div> */}
              </div>
              {/* tab-5 end guardian */}
              {/* tab-2 address */}
              <div
                id="tab-2"
                className="tab-2"
                style={visibleTab === 2 ? {} : { display: "none" }}
              >
                <div className="row">
                  <div className="col-md-6 col-sm-12 p-3">
                    <Address
                      validateAddress={validateAddress}
                      title="Residencial Address"
                      required={true}
                      read={read}
                      validity={TabChange > 2}
                      CountryList={CountryList}
                      StateList={StateList}
                      CityList={CityList}
                      DefaultAddress={DefaultAddress ? DefaultAddress : false}
                    />
                    <div className="row">
                      <div className="col-md-4 col-sm-12 mb-2 d-flex align-items-center ">
                        <div
                          className="d-flex checkbox-wrapper "
                          // onClick={IsHomeAddressPrimaryChange}
                        >
                          <label className="switch-text p-0 m-0 me-2">
                            <input
                              type="checkbox"
                              id="IsHomeAddressPrimary"
                              onChange={IsHomeAddressPrimaryChange}
                              checked={IsHomeAddressPrimary ? true : false}
                              disabled={read}
                            />
                            Is Primary Address{" "}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 p-3">
                    <Address
                      validateAddress={getOfficeAddressValues}
                      title="Office Address"
                      required={OfficeAddressIsRequer ? true : false}
                      read={read}
                      validity={TabChange > 2}
                      CountryList={CountryList}
                      StateList={OfficeAddressStateList}
                      CityList={OfficeAddressCityList}
                      DefaultAddress={OfficeDefaultAddress}
                    />
                    <div className="row">
                      <div className="col-md-4 col-sm-12 mb-2 d-flex align-items-center ">
                        <div
                          className="d-flex checkbox-wrapper "
                          // onClick={IsofficeAddressPrimaryChange}
                        >
                          {/* <p className="switch-text p-0 m-0 me-2">
                              Is Primary Address{" "}
                              <input
                                type="checkbox"
                                id="IsBankAcPrimary"
                                defaultChecked={IsofficeAddressPrimaryChange}
                                checked={IsofficeAddressPrimary ? true : false}
                              />
                            </p> */}
                          <label className="switch-text p-0 m-0 me-2">
                            <input
                              type="checkbox"
                              checked={IsofficeAddressPrimary}
                              onChange={IsofficeAddressPrimaryChange}
                              disabled={read}
                            />
                            Is Primary Address
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* tab-3 */}
              <div
                id="tab-3"
                className={`tab-3 `}
                style={visibleTab === 3 ? {} : { display: "none" }}
              >
                <div className={`row mt-3`}>
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label htmlFor="DPDetails" className="form-label">
                      DP Details
                    </label>
                    <input
                      type="text"
                      className={`form-control`}
                      id="DPDetails"
                      value={DpDetail}
                      onChange={DpDetailonChange}
                      onBlur={DpDetailonBlure}
                      disabled={read}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label htmlFor="DPName" className="form-label">
                      DP Name
                    </label>
                    <input
                      type="text"
                      className={`form-control`}
                      id="DPName"
                      value={DpName}
                      onChange={DpNameonChange}
                      onBlur={DpNameonBlure}
                      disabled={read}
                    />
                  </div>
                </div>

                <div className={`row`}>
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="DPID"
                      className={`form-label ${
                        dmateIsRequer ? "asterisk_input" : ""
                      }`}
                    >
                      DP ID
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        DpIdHasError || (TabChange > 3 && !DpIdIsvalid)
                          ? "invalid"
                          : ""
                      }`}
                      id="DPID"
                      value={DpId}
                      onChange={DpIdonChange}
                      onBlur={DpIdonBlure}
                      disabled={read}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="BeneficiaryA/CNo"
                      className={`form-label ${
                        dmateIsRequer ? "asterisk_input" : ""
                      }`}
                    >
                      Beneficiary A/C No.
                    </label>
                    <input
                      type="string"
                      className={`form-control ${
                        BeneficiaryAcNoHasError ||
                        (TabChange > 3 && !BeneficiaryAcNoIsvalid)
                          ? "invalid"
                          : ""
                      }`}
                      id="BeneficiaryA/CNo"
                      value={BeneficiaryAcNo}
                      onChange={BeneficiaryAcNoonChange}
                      onBlur={BeneficiaryAcNoonBlure}
                      disabled={read}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-sm-12 mb-2 mb-xs-1">
                    <label htmlFor="PMS" className="form-label ">
                      Select PMS
                    </label>
                    <select
                      className="form-select form-control-custom"
                      aria-label="Default select example"
                    >
                      <option defaultValue={"1"}>Yes</option>
                      <option value="2">No</option>
                    </select>
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2 mb-xs-1">
                    <label htmlFor="CMBPID" className="form-label ">
                      CMBP ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="CMBPID"
                      id="CMBPID"
                      placeholder="0143876589104321 "
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-sm-12 d-flex justify-content-end align-items-end"></div>
                  <div className="col-md-4 col-sm-12 d-flex justify-content-end align-items-end">
                    <div className="btn-wrapper mt-3">
                      {DmatInEditMode.length === 0 && (
                        <button
                          type="button"
                          className={`multiple-bank-btn ${
                            BankInfoList.length === 3 ? "d-none" : ""
                          }`}
                          onClick={onAddDmatHandler}
                          disabled={!dmateIsRequer || !tab3IsValid || read}
                          // disabled={!tab3IsValid || read}
                          // style={tab4IsValid || !read ? {color : "white"} : {}}
                        >
                          + Add Dmat Account
                        </button>
                      )}
                      {DmatInEditMode.length !== 0 && (
                        <button
                          type="button"
                          className="multiple-bank-btn"
                          onClick={DmatDetailUpdateClick}
                          disabled={!tab3IsValid || read}
                        >
                          Update
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row bg-light p-3">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">DP Details</th>
                          <th scope="col">DP Name</th>
                          <th scope="col">DP Id</th>
                          <th scope="col">Beneficiary A/C No.</th>
                        </tr>
                      </thead>
                      <tbody>{dmatlist}</tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* tab-4 */}
              <div
                id="tab-4"
                className="tab-4"
                style={visibleTab === 4 ? {} : { display: "none" }}
              >
                <div className="row mt-3">
                  <div className="col-md-3 col-sm-12 mb-2">
                    <label htmlFor="IFSC" className="form-label asterisk_input">
                      IFSC
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        IFSCHasError ||
                        (TabChange > 4 &&
                          !IFSCIsvalid &&
                          BankInfoList.length === 0)
                          ? "invalid"
                          : ""
                      }`}
                      id="IFSC"
                      value={IFSC}
                      onChange={IFSConChange}
                      onBlur={IFSConBlure}
                      disabled={read}
                    />
                  </div>
                </div>
                <div
                  className={`row ${
                    BankInfoList.length === 3
                      ? BankInEditMode.length === 0
                        ? "d-none"
                        : ""
                      : ""
                  }`}
                >
                  <div className="col-md-3 col-sm-12 mb-2">
                    <label
                      htmlFor="AccountNumber"
                      className="form-label asterisk_input"
                    >
                      Account Number
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        AccountNumberHasError ||
                        (TabChange > 4 &&
                          !AccountNumberIsvalid &&
                          BankInfoList.length === 0)
                          ? "invalid"
                          : ""
                      }`}
                      id="AccountNumber"
                      value={AccountNumber}
                      onChange={AccountNumberonChange}
                      onBlur={AccountNumberonBlure}
                      disabled={read}
                      ref={BankRef}
                    />
                  </div>
                  <div
                    className={`col-md-3 col-sm-12 mb-2 ${
                      // AccountNumberIsvalid ? "d-none" : (BankInEditMode.length === 0 && !EditBankAcNo ) ? "d-none" : ""
                      AccountNumberIsvalid
                        ? (BankInEditMode.length !== 0 && EditBankAcNo) ||
                          BankInEditMode.length === 0
                          ? ""
                          : "d-none"
                        : "d-none"
                    }`}
                  >
                    <label
                      htmlFor="confirm_AccountNumber"
                      className="form-label asterisk_input"
                    >
                      Confirm Account Number
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        ConfimAccountNumberHasError ||
                        (TabChange > 4 &&
                          !ConfimAccountNumberIsvalid &&
                          BankInfoList.length === 0)
                          ? "invalid"
                          : ""
                      }`}
                      id="confirm_AccountNumber"
                      value={ConfimAccountNumber}
                      onChange={ConfimAccountNumberonChange}
                      onBlur={ConfimAccountNumberonBlure}
                      disabled={read}
                    />
                  </div>
                  <div
                    className={`col-md-4 col-sm-12 mb-2 d-flex justify-content-start align-items-end ${
                      BankInEditMode.length !== 0 && !EditBankAcNo
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <button
                      type="button"
                      className={`btn verify-btn`}
                      onClick={EditBankAcNumberClickHandler}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div
                  className={`row ${
                    BankInfoList.length === 3
                      ? BankInEditMode.length === 0
                        ? "d-none"
                        : ""
                      : ""
                  }`}
                >
                  <div className="col-md-3 col-sm-12 mb-2">
                    <label
                      htmlFor="AccountType"
                      className="form-label asterisk_input"
                    >
                      Account Type
                    </label>
                    <Selection
                      options={AccountTypeList}
                      Searchable="true"
                      id="AccountType"
                      hasError={
                        AccountTypeHasError ||
                        (TabChange > 4 &&
                          !AccountTypeIsvalid &&
                          BankInfoList.length === 0)
                      }
                      value={AccountType}
                      onChange={AccountTypeonChange}
                      onBlur={AccountTypeonBlure}
                      isReadOnly={read}
                    />
                  </div>
                  <div className="col-md-3 col-sm-12 mb-2">
                    <label htmlFor="MICR" className="form-label">
                      MICR
                    </label>
                    <input
                      type="text"
                      className={`form-control`}
                      id="MICR"
                      value={MICR}
                      onChange={MICRonChange}
                      onBlur={MICRonBlure}
                      disabled={true}
                    />
                  </div>
                </div>
                <div
                  className={`row ${
                    BankInfoList.length === 3
                      ? BankInEditMode.length === 0
                        ? "d-none"
                        : ""
                      : ""
                  }`}
                >
                  <div className="col-md-3 col-sm-12 mb-2">
                    <label htmlFor="BankName" className="form-label">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      className={`form-control`}
                      id="BankName"
                      value={BankName}
                      onChange={BankNameonChange}
                      onBlur={BankNameonBlure}
                      disabled={true}
                    />
                  </div>
                  <div className="col-md-3 col-sm-12 mb-2">
                    <label htmlFor="BankCity" className="form-label">
                      Bank City
                    </label>
                    <input
                      type="text"
                      className={"form-control"}
                      id="BankCity"
                      value={BankCity}
                      onChange={BankCityonChange}
                      onBlur={BankCityonBlure}
                      disabled={true}
                    />
                  </div>
                </div>

                <div
                  className={`row  pb-2 ${
                    BankInfoList.length === 3
                      ? BankInEditMode.length === 0
                        ? "d-none"
                        : ""
                      : ""
                  }`}
                >
                  <div className="col-md-3 col-sm-12 mb-2 d-flex justify-content-center pt-md-4"></div>
                  <div className="col-md-3 col-sm-12 mb-2 d-flex justify-content-end align-items-center ">
                    <div
                      className="d-flex checkbox-wrapper"
                      onClick={IsBankAcPrimaryChange}
                    >
                      <p className="switch-text p-0 m-0 me-2">
                        Is Primary Bank{" "}
                      </p>
                      <input
                        type="checkbox"
                        id="IsBankAcPrimary"
                        checked={IsBankAcPrimary ? true : false}
                        disabled={read}
                        onChange={IsBankAcPrimaryChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-3 col-sm-12 d-flex justify-content-end align-items-end">
                    <div className="btn-wrapper">
                      {BankInEditMode.length === 0 && (
                        <button
                          type="button"
                          className={`multiple-bank-btn ${
                            BankInfoList.length === 3 ? "d-none" : ""
                          }`}
                          onClick={onAddBankHandler}
                          disabled={!tab4IsValid || read}
                          // style={tab4IsValid || !read ? {color : "white"} : {}}
                        >
                          + Add Bank Accounts{" "}
                        </button>
                      )}
                      {BankInEditMode.length !== 0 && (
                        <button
                          type="button"
                          className="multiple-bank-btn"
                          onClick={BankDetailUpdateClick}
                          disabled={!tab4IsValid || read}
                        >
                          Update{" "}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row bg-light p-3">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Bank name</th>
                          <th scope="col">Account Number</th>
                          <th scope="col">Account Type</th>
                          <th scope="col">Bank City</th>
                          <th scope="col">MICR</th>
                          <th scope="col">IFSC</th>
                          <th scope="col">Is Primary</th>
                        </tr>
                      </thead>
                      <tbody>{bankList}</tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* tab-5 */}
              <div
                id="tab-5"
                className="tab-5"
                style={visibleTab === 5 ? {} : { display: "none" }}
              >
                <div
                  className={`row mt-3 ${
                    NomineeList.length === 3
                      ? !isNomineeUPdateMode
                        ? "d-none"
                        : ""
                      : ""
                  }`}
                >
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="NomineeName"
                      className={`form-label ${
                        nomineeIsRequer ? "asterisk_input" : ""
                      }`}
                    >
                      Nominee First Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        NomineeFirstNameHasError ||
                        (TabChange > 5 &&
                          !NomineeFirstNameIsvalid &&
                          NomineeList.length === 0)
                          ? "invalid"
                          : ""
                      }`}
                      id="NomineeFisrtName"
                      value={NomineeFirstName}
                      onChange={NomineeFirstNameonChange}
                      onBlur={NomineeFirstNameonBlure}
                      disabled={read}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label htmlFor="NomineeName" className={`form-label`}>
                      Nominee Middle Name
                    </label>
                    <input
                      type="text"
                      className={`form-control`}
                      id="NomineeMiddleName"
                      value={NomineeMiddleName}
                      onChange={NomineeMiddleNameonChange}
                      onBlur={NomineeMiddleNameonBlure}
                      disabled={read}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="NomineeName"
                      className={`form-label ${
                        nomineeIsRequer ? "asterisk_input" : ""
                      }`}
                    >
                      Nominee Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        NomineeLastNameHasError ||
                        (TabChange > 5 &&
                          !NomineeFirstNameIsvalid &&
                          NomineeList.length === 0)
                          ? "invalid"
                          : ""
                      }`}
                      id="NomineeLastName"
                      value={NomineeLastName}
                      onChange={NomineeLastNameonChange}
                      onBlur={NomineeLastNameonBlure}
                      disabled={read}
                    />
                  </div>
                </div>

                <div
                  className={`row ${
                    NomineeList.length === 3
                      ? !isNomineeUPdateMode
                        ? "d-none"
                        : ""
                      : ""
                  }`}
                >
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="DateOfBirth"
                      className={`form-label ${
                        nomineeIsRequer ? "asterisk_input" : ""
                      }`}
                    >
                      Nominee Date Of Birth
                    </label>
                    {/* <input
                      type="date"
                      className={`form-control ${
                        NomineeDOBHasError ||
                        (TabChange > 5 &&
                          !NomineeDOBIsvalid &&
                          NomineeList.length === 0)
                          ? "invalid"
                          : ""
                      }`}
                      id="DateOfBirth"
                      value={NomineeDOB}
                      onChange={NomineeDOBonChange}
                      onBlur={NomineeDOBonBlure}
                      disabled={read}
                    /> */}
                    <CustomeDatePicker
                      dateFormat="yyyy-MM-dd"
                      selected={NomineeDOB}
                      className={`form-control ${
                        NomineeDOBHasError ||
                        (TabChange > 5 &&
                          !NomineeDOBIsvalid &&
                          NomineeList.length === 0)
                          ? "invalid"
                          : ""
                      }`}
                      onChange={NomineeDOBonChange}
                      onBlur={NomineeDOBonBlure}
                      onCalendarClose={NomineeDOBonBlure}
                      disabled={read}
                      key={uuid()}
                    />

                    {/* <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={NomineeDOB}
                      className={`form-control ${
                        NomineeDOBHasError ||
                        (TabChange > 5 &&
                          !NomineeDOBIsvalid &&
                          NomineeList.length === 0)
                          ? "invalid"
                          : ""
                      }`}
                      onChange={NomineeDOBonChange}
                      onBlur={NomineeDOBonBlure}
                      onCalendarClose={NomineeDOBonBlure}
                      disabled={read}
                    /> */}
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="NomineeEmail"
                      className={`form-label ${
                        nomineeIsRequer ? "asterisk_input" : ""
                      }`}
                    >
                      Nominee Email address
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        NomineeEmailHasError ||
                        (TabChange > 5 &&
                          !NomineeEmailIsvalid &&
                          NomineeList.length === 0)
                          ? "invalid"
                          : ""
                      }`}
                      id="NomineeEmail"
                      aria-describedby="emailHelp"
                      value={NomineeEmail}
                      onChange={NomineeEmailonChange}
                      onBlur={NomineeEmailonBlure}
                      disabled={read}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="MobileNo"
                      className={`form-label ${
                        nomineeIsRequer ? "asterisk_input" : ""
                      }`}
                    >
                      Nominee Mobile No.
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        NomineeMobileHasError ||
                        (TabChange > 5 &&
                          !NomineeMobileIsvalid &&
                          NomineeList.length === 0)
                          ? "invalid"
                          : ""
                      }`}
                      id="Nominee_MobileNo"
                      value={NomineeMobile}
                      onChange={NomineeMobileonChange}
                      onBlur={NomineeMobileonBlure}
                      disabled={read}
                    />
                  </div>
                </div>
                <div
                  className={`row ${
                    NomineeList.length === 3
                      ? !isNomineeUPdateMode
                        ? "d-none"
                        : ""
                      : ""
                  }`}
                >
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="NomineeName"
                      className={`form-label ${
                        nomineeIsRequer ? "asterisk_input" : ""
                      }`}
                    >
                      Percentage of share
                    </label>
                    <input
                      type="number"
                      className={`form-control ${
                        PercentageofShareHasError ||
                        (TabChange > 5 &&
                          !PercentageofShareIsvalid &&
                          NomineeList.length === 0)
                          ? "invalid"
                          : ""
                      }`}
                      id="Percentage_of_share"
                      value={PercentageofShare}
                      onChange={PercentageofShareonChange}
                      onBlur={PercentageofShareonBlure}
                      disabled={read}
                    />
                  </div>
                  <div className="col-md-4 col-sm-12 mb-2">
                    <label
                      htmlFor="RelationWithInvestor"
                      className={`form-label ${
                        nomineeIsRequer ? "asterisk_input" : ""
                      }`}
                    >
                      Nominee is my
                    </label>
                    <Selection
                      options={ClientNomineeRelationList}
                      Searchable="true"
                      id="RelationWithInvestor"
                      hasError={
                        NomineeIsMyHasError ||
                        (TabChange > 5 &&
                          !NomineeIsMyIsvalid &&
                          NomineeList.length === 0)
                      }
                      value={NomineeIsMy}
                      onChange={NomineeIsMyonChange}
                      onBlur={NomineeIsMyonBlure}
                      isReadOnly={read}
                    />
                  </div>
                  <div className="col-md-3 col-sm-12 mb-2">
                    {/* <label
                        htmlFor="RelationWithInvestor"
                        className="form-label"
                      >
                        {" Aadhar Number "}
                      </label> */}
                    {/* <FileInput
                        label="Nominee's Proof of Identity"
                        getValue={EsignValue}
                        accept=".jpg, .jpeg, .png"
                        validateFile={validateEsign}
                        validateValue={EsignValidation}
                        hasError={NomineeIDProofHasError}
                        isRequer={nomineeIsRequer}
                        disabled={read}
                      /> */}
                    {/* <label
                      htmlFor="AadharCardNumber"
                      className="form-label asterisk_input"
                    >
                      Nominee Aadhar Card Number
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        NomineeAadharHasError ||
                        (NomineeAadharIsvalid && NomineeAadhar === Aadhar) ||
                        (TabChange > 5 &&
                          !NomineeAadharIsvalid &&
                          NomineeList.length === 0)
                          ? "invalid"
                          : ""
                      }`}
                      id="AadharCardNumber"
                      value={NomineeAadhar}
                      onChange={NomineeAadharonChange}
                      onBlur={NomineeAadharonBlure}
                      disabled={read}
                    /> */}
                  </div>
                </div>
                <div
                  className={`row ${
                    NomineeList.length === 3
                      ? !isNomineeUPdateMode
                        ? "d-none"
                        : ""
                      : ""
                  }`}
                >
                  <div className="col-md-3 col-sm-12 mb-2 d-flex align-items-center ">
                    <div className="d-flex checkbox-wrapper ">
                      <label className="switch-text p-0 m-0 me-2">
                        <input
                          type="checkbox"
                          id="Is_Nominee_address_Same_As_My"
                          onChange={IsNomineeAddressSameAsMyChange}
                          checked={IsNomineeAddressSameAsMy ? true : false}
                          disabled={read}
                        />{" "}
                        Address : Same As My address
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className={`row ${IsNomineeAddressSameAsMy ? "d-none" : ""} ${
                    NomineeList.length === 3
                      ? !isNomineeUPdateMode
                        ? "d-none"
                        : ""
                      : ""
                  }`}
                >
                  <Address
                    validateAddress={validateNomineeAddress}
                    title="Nominee Address"
                    required={
                      NomineeFirstName.length ||
                      NomineeMiddleName.length ||
                      NomineeLastName.length
                    }
                    read={read}
                  />
                </div>
                <div className={`row pb-2`}>
                  <div className="col-md-4 col-sm-12 d-flex"></div>
                  <div className="col-md-4 col-sm-12 d-flex justify-content-end">
                    <div className="btn-wrapper">
                      {!isNomineeUPdateMode && (
                        <button
                          type="button"
                          className={`multiple-bank-btn ${
                            NomineeList.length === 3 ? "d-none" : ""
                          }`}
                          onClick={onAddNomineeHandler}
                          disabled={!tab5IsValid || read}
                        >
                          + Add Nominee{" "}
                        </button>
                      )}
                      {isNomineeUPdateMode && (
                        <button
                          type="button"
                          className="multiple-bank-btn"
                          onClick={NomineeDetailUpdateClick}
                          disabled={!tab5IsValid || read}
                        >
                          Update{" "}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row bg-light p-3">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Birthdate</th>
                          <th scope="col">Email</th>
                          <th scope="col">Mobile</th>
                          <th scope="col">Share</th>
                          <th scope="col">Relation</th>
                          <th scope="col">Address1</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>{Nomineelist}</tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* <TabNavigator
                min={1}
                max={IsMinor ? 6 : 5}
                activeTab={visibleTab}
                onChange={ActiveTabHandler}
                FormIsValid={FormIsValid}
              /> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Client;
