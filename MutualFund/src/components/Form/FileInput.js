import React, { useState, useEffect } from "react";
// import upload from "../../assets/icons/upload.png";
import SvgUpload from "../../assets/iconComponents/Upload";
import { read, utils, writeFile } from "xlsx";

const FileInput = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [IsTouched, setIsTouched] = useState(false);
  const valueIsValid = props.validateValue
    ? props.validateValue(inputValue)
    : true;
  const hasError = !valueIsValid && IsTouched;

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const changeHandler = async (event) => {
    if (event.target.files.length) {
      event.target.nextElementSibling.innerHTML = event.target.files[0].name;
      try {
        let result;
        if (props.accept === ".jpg, .jpeg, .png") {
          const file = event.target.files[0];
          result = await toBase64(file);
        }
        if (props.accept === ".xlsx") {
          const file = event.target.files[0];
          var name = file.name;
          const reader = new FileReader();
          reader.onload = (evt) => {
            // evt = on_file_select event
            /* Parse data */
            const bstr = evt.target.result;
            const wb = read(bstr, { type: "binary" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = utils.sheet_to_csv(ws, { header: 1 });
            /* Update state */
            result = data;
          };
          reader.readAsBinaryString(file);
        }
        setInputValue(result);
        props.getValue(result);
        // setInputValue(event.target.files);
        // props.getValue(event.target.files);
      } catch (error) {
        console.error(error);
        return;
      }
    }
    // else
    //   event.target.nextElementSibling.innerHTML =
    //     event.target.nextElementSibling.innerHTML;
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  useEffect(() => {
    props.validateFile({ isvalid: valueIsValid, hasError });
  }, [IsTouched, inputValue]);

  return (
    <div className="fileuploadwrapper form-control">
      <input
        type="file"
        name="file"
        id="file"
        accept={props.accept}
        className={`inputfile ${props.hasError ? "invalid" : ""}`}
        onChange={changeHandler}
        onBlur={inputBlurHandler}
      />
      <label
        htmlFor="file"
        className="d-flex justify-content-center align-items-center p-0 file-label"
      >
        <SvgUpload
          className="m-0  p-0 text-start me-2"
          width="20px"
          height="20px"
          vertical-align="middle"
        />
        {/* <img
          src={upload}
          alt="upload"
          className="me-2"
          style={{ marginTop: "-4px" }}
        /> */}
        <span className={`m-0 ${props.isRequer ? "asterisk_input" : ""} `}>
          {props.label}
        </span>
      </label>
    </div>
  );
};

export default FileInput;
