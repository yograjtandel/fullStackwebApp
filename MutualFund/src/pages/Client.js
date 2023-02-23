import React, { useState, useRef, useEffect, useContext } from "react";
import uuid from "react-uuid";
import Selection from "../components/Form/Selection";
import BreadCrum from "../components/UI/BreadCrum";

import useInput from "../hooks/use-Input";
import usePanVarify from "../hooks/use-pan-varify";
import UseNotificationManager from "../hooks/use-notification-manager";
import useActions from "../hooks/use-actions";

import {
  AccountTypeList,
  GenderList,
  MaritalStatusLis,
  OccupationList,
  ClientNomineeRelationList,
  SourceofWealthList,
} from "../data/DropDownList";

import { stateList } from "../data/StateList";
import { DropdownCityList } from "../data/CityList";

import {
  requerFieldValidation,
  requerSelectionValidation,
  DigitOnlyValidation,
  IsPastDate,
  LenValidation,
  LessThenLenValidation,
  GreaterThenLenValidation,
  LessThenEqaltoLenValidation,
  GreaterThenEqaltoLenValidation,
  GreaterThenValidation,
  LessThenValidation,
  LessThenEqualtoValidation,
} from "../components/Form/validations/validations";

import FormContext from "../store/FormContext";
import { RoutPath } from "../data/Paths";

const Client = () => {
  const [FocusPan, setFocusPan] = useState(false);
  const [PanData, setPanData] = useState(false);

  const [StateList, setStateList] = useState(stateList);
  const [CityList, setCityList] = useState([]);

  const [FocusBank, setFocusBank] = useState(false);
  const [EditBankAcNo, setEditBankAcNo] = useState(false);

  const [IsBankAcPrimary, setIsBankAcPrimary] = useState(true);
  const [BankInEditMode, setBankInEditMode] = useState("");
  const [BankInfoList, setBankInfoList] = useState([]);
  const [ontificationList, setontificationList] = useState([]);

  const [NomineeList, setNomineeList] = useState([]);
  const [isNomineeUPdateMode, setisNomineeUPdateMode] = useState(false);
  const [NomineeTotalShare, setNomineeTotalShare] = useState();
  const [NomineeInEditMode, setNomineeInEditMode] = useState();
  const PanRef = useRef();
  const BankRef = useRef();
  const PermAddrisCorresAddrRef = useRef();
  const PepRelatedRef = useRef();
  const PepvExposedRef = useRef();

  const formContext = useContext(FormContext);
  const notificationList = UseNotificationManager(
    ontificationList,
    "error-alert"
  );

  const create = formContext.mode === "save";
  const edit = formContext.mode === "edit";
  const read = formContext.mode === "read";

  useEffect(() => {
    formContext.setActiveview("form");
    // formContext.setActiveMode("save");
    if (FocusPan) {
      PanRef.current.focus();
    }
    if (FocusBank) {
      BankRef.current.focus();
    }

    // if (read || edit) {
    //   const record = formContext.Activerecord;
    //   const HomeAddress = record.address[0];
    //   const OfficeAddress = record.address[1];
    //   const guardianAddress =
    //     record.uccholder.length > 0 ? record.uccholder[0].address[0] : false;

    //   set_state(
    //     HomeAddress.country,
    //     HomeAddress.state,
    //     OfficeAddress ? OfficeAddress.country : false,
    //     OfficeAddress ? OfficeAddress.state : false,
    //     guardianAddress ? guardianAddress.country : false,
    //     guardianAddress ? guardianAddress.state : false
    //   );
    //   set_city(
    //     HomeAddress.state,
    //     HomeAddress.city,
    //     OfficeAddress ? OfficeAddress.state : false,
    //     OfficeAddress ? OfficeAddress.city : false,
    //     guardianAddress ? guardianAddress.state : false,
    //     guardianAddress ? guardianAddress.city : false
    //   );
    //   setDefaultAddress((prev) => {
    //     return {
    //       ...prev,
    //       id: HomeAddress.id,
    //       Address1: HomeAddress.address1,
    //       Address2: HomeAddress.address2,
    //       Address3: HomeAddress.address3,
    //       Pincode: HomeAddress.pincode,
    //       Phone: HomeAddress.phone,
    //     };
    //   });

    //   setBankInfoList([...record.bank]);
    //   setDmatInfoList(record.demat);
    //   setNomineeList(record.nominee);
    //   setClientCode(record.client_code);
    //   SetfirstName(record.first_name);
    //   Setgender(record.gender);
    //   SetDOB(record.date_of_birth, "date");
    //   SetOccupation(
    //     OccupationList.filter((item) => item.value === record.occupation_code)
    //   );
    //   SetPan(record.pan_number);
    //   Setstatus(record.marital_status);
    // }
    return () => {
      setFocusPan(false);
      setFocusBank(false);
      //   setDefaultAddress(false);
    };
  }, [FocusPan, FocusBank, formContext.mode, formContext.Activerecord]);

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

  const {
    inputValue: firstName,
    isvalid: firstNameIsvalid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameonChange,
    inputBlurHandler: firstNameonBlure,
    SetInputValue: SetfirstName,
  } = useInput({
    name: "firstname",
    defaultValue: "",
    validateValue: (value) => requerFieldValidation(value),
  });

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
      return requerFieldValidation(value) && IsPastDate(new Date(value));
    },
    DisplayErrorMsg: (value) => {
      if (requerFieldValidation(value) && !IsPastDate(new Date(value))) {
        setontificationList((prev) => [
          ...prev,
          { msg: "Birthdate should not not be futuristic!" },
        ]);
      }
    },
  });

  const {
    inputValue: gender,
    isvalid: genderIsvalid,
    hasError: genderHasError,
    valueChangeHandler: genderonChange,
    inputBlurHandler: genderonBlure,
    SetInputValue: Setgender,
  } = useInput({
    defaultValue: { value: "0" , label: "Gender"},
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
    defaultValue: { value: "0", label: "Status" },
    validateValue: (value) => requerSelectionValidation(value),
  });

  const {
    inputValue: ResidentialStatus,
    isvalid: ResidentialStatusIsvalid,
    hasError: ResidentialStatusHasError,
    valueChangeHandler: ResidentialStatusonChange,
    inputBlurHandler: ResidentialStatusonBlure,
    SetInputValue: SetResidentialStatus,
  } = useInput({
    defaultValue: { value: "0", label: "ResidentialStatus" },
    validateValue: (value) => requerSelectionValidation(value),
  });

  const {
    inputValue: Occupation,
    isvalid: OccupationIsvalid,
    hasError: OccupationHasError,
    valueChangeHandler: OccupationonChange,
    inputBlurHandler: OccupationonBlure,
    SetInputValue: SetOccupation,
  } = useInput({
    defaultValue: { value: "0", label: "Occupation" },
    validateValue: (value) => requerSelectionValidation(value),
  });

  const {
    inputValue: SourceofWealth,
    isvalid: SourceofWealthIsvalid,
    hasError: SourceofWealthHasError,
    valueChangeHandler: SourceofWealthonChange,
    inputBlurHandler: SourceofWealthonBlure,
    SetInputValue: SetSourceofWealth,
  } = useInput({
    defaultValue: { value: "0" , label: "Source of Wealth"},
    validateValue: (value) => requerSelectionValidation(value),
  });

  const {
    inputValue: GrossAnnualIncome,
    isvalid: GrossAnnualIncomeIsvalid,
    hasError: GrossAnnualIncomeHasError,
    valueChangeHandler: GrossAnnualIncomeonChange,
    inputBlurHandler: GrossAnnualIncomeonBlure,
    SetInputValue: SetGrossAnnualIncome,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => requerSelectionValidation(value),
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
    defaultValue: { value: "0", label: "City" },
    validateValue: (value) => requerSelectionValidation(value),
  });

  const cityList = (stateID) => {
    setCityList(
      DropdownCityList.filter((city) => +city.state === +stateID).map(
        (city) => ({
          value: city.id,
          label: city.name,
        })
      )
    );
  };

  const {
    inputValue: State,
    isvalid: StateIsvalid,
    hasError: StateHasError,
    valueChangeHandler: StateonChange,
    inputBlurHandler: StateonBlure,
    SetInputValue: SetState,
    reset: reSetState,
  } = useInput({
    defaultValue: { value: "0", label: "State" },
    validateValue: (value) => requerSelectionValidation(value),
    fetch: cityList,
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
    validateValue: (value) =>
      requerFieldValidation(value) && LenValidation(value, 6),
    digitOnly: true,
    maxLen: 6,
  });

  const {
    inputValue: Line1,
    isvalid: Line1Isvalid,
    hasError: Line1HasError,
    valueChangeHandler: Line1onChange,
    inputBlurHandler: Line1onBlure,
    SetInputValue: SetLine1,
    reset: reSetLine1,
  } = useInput({
    defaultValue: "",
    validateValue: (value) => requerFieldValidation(value),
  });

  const varifyPanClickHandler = async () => {
    const pan = Pan;
    const ValidPan = PanIsvalid;
    const res = await usePanVarify(pan);

    // remove this section after provide valid api
    setPanData(true);
    // remove this section after provide valid api
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

    const res_data = res["data"]["pan_data"];
  };

  const EditPanClickHandler = () => {
      setFocusPan(true);
  };
  //   bank tab validation

  const IsBankAcPrimaryChange = () => {
    setIsBankAcPrimary((prev) => !prev);
  };

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
    inputValue: AccountType,
    isvalid: AccountTypeIsvalid,
    hasError: AccountTypeHasError,
    valueChangeHandler: AccountTypeonChange,
    inputBlurHandler: AccountTypeonBlure,
    SetInputValue: setAccountType,
    reset: resetAccountType,
  } = useInput({
    defaultValue: { value: "0", label: "Account Type" },
    validateValue: requerSelectionValidation,
  });

//   const {
//     inputValue: NomineeIsMy,
//     isvalid: NomineeIsMyIsvalid,
//     hasError: NomineeIsMyHasError,
//     valueChangeHandler: NomineeIsMyonChange,
//     inputBlurHandler: NomineeIsMyonBlure,
//     SetInputValue: setNomineeIsMy,
//     reset: resetNomineeIsMy,
//   } = useInput({
//     defaultValue: { value: "0", label: "Relationship" },
//     validateValue: requerSelectionValidation,
//   });

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

  const fetchBankDetail = async (value) => {
    const res = await fetch("https://ifsc.razorpay.com/" + value);
    const data = await res.json();
  };

  const EditBankAcNumberClickHandler = () => {
    setEditBankAcNo(true);
  };
  const resetBankForm = () => {
    resetIFSC();
    resetAccountNumber();
    resetAccountType({ value: "SAVINGS", label: "Savings" });
    setIsBankAcPrimary(false);
    setBankInEditMode("");
  };

  const calcBankIsACtive = (bankISPrimary = false) => {
    const List = [...BankInfoList];
    if (List.length) {
      if (BankInEditMode !== "") {
        const curPrimaryBankIndex = List.findIndex(
          (bank) => bank.isPrimary === true
        );
        if (
          curPrimaryBankIndex !== BankInEditMode &&
          List[BankInEditMode].isPrimary
        ) {
          List[curPrimaryBankIndex].isPrimary = false;
        }
        // if (bankISPrimary) {
        //   const curPrimaryBankIndex = List.findIndex(
        //     (bank) => bank.isPrimary === true
        //   );
        //   if(BankInEditMode !== curPrimaryBankIndex) {
        //     List[curPrimaryBankIndex].isPrimary = false;
        //   }
        // }
        return [List];
      } else {
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
    }
    return [List];
  };
  const checkBankAxist = () => {
    // const List = [ ...BankInfoList ];
    const index = BankInfoList.findIndex(
      (bank) => bank.number === AccountNumber
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
      {
        type: AccountType,
        number: AccountNumber,
        ifsc_code: IFSC,
        primary_account: IsBankAcPrimary ? 1 : 0,
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
      List[BankInEditMode].number = AccountNumber;
      List[BankInEditMode].type = AccountType;
    }
    setBankInfoList(List);
    resetBankForm();
    setBankInEditMode("");
    setEditBankAcNo(false);
  };
  const bankList = BankInfoList.map((bank, index) => {
    return (
      <div className="box" key={uuid()} id={index} onClick={BankDetailClick}>
        <p>{bank.number}</p>
        <p>{bank.type.label}</p>
        <p>{bank.ifsc_code}</p>
        <p>
          Primary -{" "}
          <input
            type={"checkbox"}
            defaultChecked={bank.primary_account}
            readOnly
            style={{ pointerEvents: "none" }}
          />
        </p>
      </div>
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
      return requerFieldValidation(value) && IsPastDate(new Date(value));
      //   && age >= 18;
    },
    DisplayErrorMsg: (value) => {
      if (value && !IsPastDate(new Date(value))) {
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
    defaultValue: { value: "0", label: "Relationship" },
    validateValue: requerSelectionValidation,
  });

  const resetNomineeForm = () => {
    resetNomineeFirstName();

    resetNomineeDOB();
    resetPercentageofShare();
    resetNomineeIsMy({ value: "0" });
    // setNomineeIDProof();
  };

  const onAddNomineeHandler = () => {
    // if (!tab5IsValid) {
    //   setontificationList((prev) => [
    //     ...prev,
    //     { msg: "If You want To Add Nominee Fill all Requer Field!" },
    //   ]);
    //   return;
    // }
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
        name: NomineeFirstName,
        date_of_birth: NomineeDOB,
        relationship: NomineeIsMy.label,
        allocation_percentage: PercentageofShare,
      },
    ];
    setNomineeList(List);
    resetNomineeForm();
  };

  const NomineeDetailClick = async (event) => {
    setisNomineeUPdateMode(true);
    setNomineeInEditMode(parseInt(event.currentTarget.id));
    const record = NomineeList[event.currentTarget.id];
    setNomineeFirstName(record["name"]);
    setNomineeDOB(record["date_of_birth"], "date");
    setNomineeIsMy(
      ClientNomineeRelationList.filter(
        (item) => item.label === record["relationship"]
      )[0]
    );
    setPercentageofShare(record["allocation_percentage"]);
  };

  const NomineeDetailUpdateClick = () => {
    const List = [...NomineeList];
    List[NomineeInEditMode].name = NomineeFirstName;
    List[NomineeInEditMode].date_of_birth = NomineeDOB.toISOString().substr(
      0,
      10
    );
    List[NomineeInEditMode].relationship = NomineeIsMy.label;
    List[NomineeInEditMode].allocation_percentage = PercentageofShare;

    setNomineeList(List);
    resetNomineeForm();
    setisNomineeUPdateMode(false);
  };

  const Nomineelist = NomineeList.map((nominee, index) => {
    return (
      <div className="box" key={uuid()} id={index} onClick={NomineeDetailClick}>
        <p>{nominee.name}</p>
        <p>{nominee.date_of_birth}</p>
        <p>{nominee.relationship}</p>
        <p>Share - {nominee.allocation_percentage}</p>
      </div>
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

  //   const tab2IsValid = !read
  //     ? AddressValidation.Address1 &&
  //       AddressValidation.Address2 &&
  //       AddressValidation.Pincode &&
  //       AddressValidation.Country &&
  //       AddressValidation.State &&
  //       AddressValidation.City &&
  //     : true;

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

  //   const tab5IsValid = !read
  //     ? NomineeFirstNameIsvalid && NomineeDOBIsvalid && NomineeIsMyIsvalid
  //     : // NomineeIDProofValid &&
  //       // NomineeAadharIsvalid &&
  //       // NomineeAadhar !== Aadhar &&
  //       true;

  const tab1IsValid = true;
  const tab2IsValid = true;
  const tab3IsValid = true;

  const FormIsValid =
    tab1IsValid &&
    tab2IsValid &&
    tab3IsValid &&
    BankInfoList.length !== 0 &&
    NomineeList.length !== 0;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (FormIsValid) {
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

      //   const NomineeDetail = nomineeList.map((nominee) => {
      //     const Nominee = {
      //       nomineeDetail: {
      //         first_name: nominee.name,
      //         date_of_birth: nominee.date_of_birth,
      //         client_nominee_relation: nominee.relationship.label,
      //         share_appicable: nominee.allocation_percentage,
      //       },
      //     };
      //     if (edit) {
      //       Nominee.nomineeDetail["id"] = nominee.id;
      //     }
      //     return Nominee;
      //   });

      // if (edit) {
      //   PersonalDetail["client_code"] = ClientCode;
      // }
      const temp = BankInfoList.map((item) => {
        return { ...item };
      });
      const BankDetail = temp.map((item) => {
        item["type"] = item["type"].value;
        return item;
      });

      const FormData = {
        perm_addr_is_corres_addr: 1,
        skip_nomination: 0,
        kyc_identity_detail: {
          name: firstName,
          pan_number: Pan,
          date_of_birth: DOB,
          gender: gender.value,
          marital_status: status.value,
          residential_status: ResidentialStatus.value,
          occupation: Occupation.value,
          pep_exposed: false,
          pep_related: false,
        },
        fatca_detail: {
          source_of_wealth: SourceofWealth.value,
          gross_annual_income: GrossAnnualIncome,
        },
        correspondence_address: {
          line1: Line1,
          city: City.label,
          state: State.label,
          pincode: Pincode,
        },
        bank_accounts: BankDetail,
        nomination: nomineeList,
      };
      if (create) {
        const CreateRes = await useActions(
          "post",
          "user/create_invester",
          false,
          FormData
        );
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
      //   const nomineelist = NomineeDetail.map((nominee) => ({
      //     ...nominee.nomineeDetail,
      //   }));
      //   if (edit) {
      //     const updated_data = {
      //       id: formContext.Activerecord.id,
      //       ...PersonalDetail,
      //       demat: DmatInfoList,
      //       nominee: nomineelist,
      //       uccholder: [],
      //     };
      //     const putRes = await useActions(
      //       "put",
      //       Models.Updateclient,
      //       formContext.Activerecord.id,
      //       JSON.stringify(updated_data)
      //     );
      //     if (putRes.ok) {
      //       const updated_record = await putRes.json();
      //       formContext.setActiveRecord(updated_record);
      //       formContext.setActiveMode("read");
      //     } else {
      //       putRes.json().then((err) => {
      //         console.log(err);
      //       });
      //     }
      //     //   formContext.setActiveMode("read");
      //     //   formContext.setActiveRecord(Editres);
      //   }
    } else {
      console.log("form is not valid");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="error-sidebar">{notificationList}</div>
        <div className="client-form-wrapper p-0 m-0">
          <form
            className="row g-3 needs-validation style1"
            onSubmit={submitHandler}
          >
            {/* <CSRFToken/> */}
            <BreadCrum
              title="Client Master"
              to={RoutPath.None}
              FormIsValid={FormIsValid}
            />
            {/* tabs */}
            <div className="card table-card">
              {/* <form  novalidate> */}
              <div className="accordion" id="accordionExample">
                {/* <!-- first accordiaon --> */}

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="true"
                      aria-controls="collapseFour"
                    >
                      KYC Detail
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body pt-5">
                      <div className="row">
                        <div className="col-md-4 d-flex">
                          <div className="group">
                            <input
                              name="firstName"
                              type="text"
                              className={`${
                                firstNameHasError || !firstNameIsvalid
                                  ? "invalid"
                                  : ""
                              }`}
                              value={firstName}
                              onChange={firstNameonChange}
                              onBlur={firstNameonBlure}
                              disabled={read}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Name</label>
                          </div>
                        </div>
                        <div className="col-md-4 d-flex">
                          <div className="group">
                            <input
                              name="Pan"
                              type="text"
                              className={`text-uppercase ${
                                Pan && PanIsvalid ? "me-2" : ""
                              } ${
                                PanHasError || !PanIsvalid ? "invalid" : ""
                              } ${PanData ? "verified" : ""}`}
                              value={Pan}
                              onChange={PanonChange}
                              onBlur={PanonBlure}
                              disabled={read}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Pan Number</label>
                          </div>
                          {Pan && PanIsvalid && !PanData && (
                            <button
                              type="button"
                              className={`custom-btn update-btn px-2 py-1 ms-1 font-12 mb-4`}
                              onClick={varifyPanClickHandler}
                            >
                              Verify
                            </button>
                          )}
                          {PanData && (
                            <button
                              type="button"
                              className={`custom-btn update-btn px-2 py-1 ms-1 font-12 mb-4`}
                              onClick={EditPanClickHandler}
                            >
                              Edit
                            </button>
                          )}
                        </div>
                        <div className="col-md-4">
                          <div className="group">
                            <input
                              name="dob"
                              type="Date"
                              placeholder="none"
                              className={`${
                                DOBHasError || !DOBIsvalid ? "invalid" : ""
                              }`}
                              onChange={DOBonChange}
                              onBlur={DOBonBlure}
                              //   onCalendarClose={DOBonBlure}
                              disabled={read}
                            />

                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Date of Birth</label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="group">
                            <Selection
                              options={GenderList}
                              Searchable="true"
                              id="Gender"
                              value={gender}
                              onChange={genderonChange}
                              onBlur={genderonBlure}
                              isReadOnly={read}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="group">
                            <Selection
                              options={MaritalStatusLis}
                              Searchable="true"
                              id="Status"
                              hasError={statusHasError || !statusIsvalid}
                              value={status}
                              onChange={statusonChange}
                              onBlur={statusonBlure}
                              isReadOnly={read}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="group">
                            <Selection
                              options={[
                                {
                                  value: "RESIDENT_INDIVIDUAL",
                                  label: "RESIDENT INDIVIDUAL",
                                },
                                {
                                  value: "NON_RESIDENT_INDIVIDUAL",
                                  label: "NON RESIDENT INDIVIDUAL",
                                },
                              ]}
                              Searchable="true"
                              id="ResidentialStatus"
                              hasError={
                                ResidentialStatusHasError ||
                                !ResidentialStatusIsvalid
                              }
                              value={ResidentialStatus}
                              onChange={ResidentialStatusonChange}
                              onBlur={ResidentialStatusonBlure}
                              isReadOnly={read}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="group">
                            <Selection
                              options={OccupationList}
                              Searchable="true"
                              id="Occupation"
                              value={Occupation}
                              onChange={OccupationonChange}
                              onBlur={OccupationonBlure}
                              isReadOnly={read}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                          </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center justify-content-start">
                          <div className="form-check">
                            <input
                              name="Pepv_Exposed"
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="Pepv_Exposed"
                              ref={PepvExposedRef}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="Pepv_Exposed"
                            >
                              Pepv Exposed
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center justify-content-start">
                          <div className="form-check">
                            <input
                              name="Pep_Related"
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="Pep_Related"
                              ref={PepRelatedRef}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="Pep_Related"
                            >
                              Pep Related
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center justify-content-start">
                          <div className="form-check">
                            <input
                              name="Perm_Addr_is_Corres_Addr"
                              className="form-check-input"
                              type="checkbox"
                              id="PermAddrisCorresAddr"
                              ref={PermAddrisCorresAddrRef}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              Perm Addr is Corres Addr
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* second acordian */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Fatca Detail
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body pt-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="group">
                            <Selection
                              options={SourceofWealthList}
                              Searchable="true"
                              id="Occupation"
                              className={`${
                                SourceofWealthHasError || !SourceofWealthIsvalid
                                  ? "invalid"
                                  : ""
                              }`}
                              value={SourceofWealth}
                              onChange={SourceofWealthonChange}
                              onBlur={SourceofWealthonBlure}
                              isReadOnly={read}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            {/* <!-- <label></label> --> */}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="group">
                            <input
                              name="GrossAnnualIncome"
                              type="text"
                              className={`${
                                GrossAnnualIncomeHasError ||
                                !GrossAnnualIncomeIsvalid
                                  ? "invalid"
                                  : ""
                              }`}
                              value={GrossAnnualIncome}
                              onChange={GrossAnnualIncomeonChange}
                              onBlur={GrossAnnualIncomeonBlure}
                              disabled={read}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Gross Annual Income</label>
                          </div>
                        </div>
                        {/* <div className="col-md-4 d-flex align-items-center justify-content-start">
                          <div className="form-check">
                            <input
                            name="No_Other_Tax_Residences"
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              ref={NoOtherTaxResidences}
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              No Other Tax Residences
                            </label>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* third acordian */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Address
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body pt-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="group">
                            <input
                              name="Line1"
                              type="text"
                              value={Line1}
                              className={`${
                                Line1HasError || !Line1Isvalid ? "invalid" : ""
                              }`}
                              onChange={Line1onChange}
                              onBlur={Line1onBlure}
                              disabled={read}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Line 1</label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="group">
                            <Selection
                              options={StateList}
                              Searchable="true"
                              placeholder="State"
                              hasError={StateHasError || !StateIsvalid}
                              value={State}
                              onChange={StateonChange}
                              onBlur={StateonBlure}
                              isReadOnly={read ? true : false}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="group">
                            <Selection
                              options={CityList}
                              Searchable="true"
                              hasError={CityHasError || !CityIsvalid}
                              value={City}
                              onChange={CityonChange}
                              onBlur={CityonBlure}
                              isReadOnly={
                                State.value === "0" || read ? true : false
                              }
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="group">
                            <input
                              name="Pincode"
                              type="text"
                              value={Pincode}
                              className={`${
                                PincodeHasError || !PincodeIsvalid
                                  ? "invalid"
                                  : ""
                              }`}
                              onChange={PincodeonChange}
                              onBlur={PincodeonBlure}
                              disabled={read}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Pincode</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* fourth acordian */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Bank
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body pt-5 pb-5">
                      <div className="row">
                        <div className="col-md-7">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="group">
                                <input
                                  name="AccountNumber"
                                  type="text"
                                  value={AccountNumber}
                                  id="account_number"
                                  className={
                                    AccountNumberHasError ||
                                    !AccountNumberIsvalid
                                      ? "invalid"
                                      : ""
                                  }
                                  onChange={AccountNumberonChange}
                                  onBlur={AccountNumberonBlure}
                                  disabled={read}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Account Number</label>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="group">
                                <Selection
                                  options={AccountTypeList}
                                  Searchable="true"
                                  id="AccountType"
                                  hasError={
                                    AccountTypeHasError ||
                                    (!AccountTypeIsvalid &&
                                      BankInfoList.length === 0)
                                  }
                                  value={AccountType}
                                  onChange={AccountTypeonChange}
                                  onBlur={AccountTypeonBlure}
                                  isReadOnly={read}
                                />

                                <span className="highlight"></span>
                                <span className="bar"></span>
                                {/* <!-- <label></label> --> */}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="group">
                                <input
                                  name="IFSC"
                                  type="text"
                                  className={`${
                                    IFSCHasError ||
                                    (!IFSCIsvalid && BankInfoList.length === 0)
                                      ? "invalid"
                                      : ""
                                  }`}
                                  id="IFSC"
                                  value={IFSC}
                                  onChange={IFSConChange}
                                  onBlur={IFSConBlure}
                                  disabled={read}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>ifsc_code</label>
                              </div>
                            </div>
                            <div className="col-md-4"></div>
                            <div className="col-md-4"></div>
                            <div className="col-md-4 d-flex flex-column">
                              <div
                                className="form-check px-2 d-flex align-items-center"
                                onClick={IsBankAcPrimaryChange}
                              >
                                <input
                                  name="Primary_Account"
                                  type="checkbox"
                                  id="IsBankAcPrimary"
                                  checked={IsBankAcPrimary ? true : false}
                                  disabled={read}
                                  onChange={IsBankAcPrimaryChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault"
                                >
                                  Primary Account
                                </label>
                              </div>
                              <div className="mb-0 px-2 ">
                                {BankInEditMode.length === 0 && (
                                  <button
                                    type="button"
                                    className=" custom-btn pspl-btn d-block w-100"
                                    onClick={onAddBankHandler}
                                    disabled={read}
                                  >
                                    Add
                                  </button>
                                )}

                                {BankInEditMode.length !== 0 && (
                                  <button
                                    type="button"
                                    className=" custom-btn pspl-btn d-block w-100"
                                    onClick={BankDetailUpdateClick}
                                    disabled={read}
                                  >
                                    Update{" "}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="d-flex justify-content-between bank-list">
                            {bankList}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- fifth accordian --> */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="true"
                      aria-controls="collapseFive"
                    >
                      Nominee
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body pt-5">
                      <div className="row">
                        <div className="col-md-7">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="group">
                                <input
                                  type="text"
                                  className={`${
                                    NomineeFirstNameHasError ||
                                    (!NomineeFirstNameIsvalid &&
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
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Name</label>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="group">
                                <input
                                  name="NomineeDOB"
                                  type="date"
                                  value={NomineeDOB}
                                  className={` ${
                                    NomineeDOBHasError ||
                                    (!NomineeDOBIsvalid &&
                                      NomineeList.length === 0)
                                      ? "invalid"
                                      : ""
                                  }`}
                                  onChange={NomineeDOBonChange}
                                  onBlur={NomineeDOBonBlure}
                                  //   onCalendarClose={NomineeDOBonBlure}
                                  disabled={read}
                                />

                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Date Of Birth</label>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="group">
                                <Selection
                                  options={ClientNomineeRelationList}
                                  Searchable="true"
                                  id="RelationWithInvestor"
                                  hasError={
                                    NomineeIsMyHasError ||
                                    (!NomineeIsMyIsvalid &&
                                      NomineeList.length === 0)
                                  }
                                  value={NomineeIsMy}
                                  onChange={NomineeIsMyonChange}
                                  onBlur={NomineeIsMyonBlure}
                                  isReadOnly={read}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="group">
                                <input
                                  type="text"
                                  name="PercentageofShare"
                                  className={` ${
                                    PercentageofShareHasError ||
                                    (!PercentageofShareIsvalid &&
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
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Allocation Percentage</label>
                              </div>
                            </div>
                            <div className="col-md-4"></div>
                            <div className="col-md-4 d-flex flex-column">
                              <div className="mb-0 px-2 ">
                                {!isNomineeUPdateMode && (
                                  <button
                                    type="button"
                                    className=" custom-btn pspl-btn d-block w-100"
                                    onClick={onAddNomineeHandler}
                                    disabled={read}
                                  >
                                    Add
                                  </button>
                                )}

                                {isNomineeUPdateMode && (
                                  <button
                                    type="button"
                                    className=" custom-btn pspl-btn d-block w-100"
                                    onClick={NomineeDetailUpdateClick}
                                    disabled={read}
                                  >
                                    Update{" "}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-5">
                          <div className="d-flex justify-content-between bank-list">
                            {Nomineelist}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Client;
