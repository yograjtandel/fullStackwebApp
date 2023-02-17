import React from "react";
import Select, { components, NonceProvider } from "react-select";

const Selection = (props1) => {
  //   const { ValueContainer, Placeholder } = components;

  //   const CustomValueContainer = ({ children, ...props }) => {
  //     return (
  //       <ValueContainer {...props}>
  //         <Placeholder {...props} isFocused={props.isFocused}>
  //           {props1.isTable && !props.hasValue && props.selectProps.placeholder}
  //           {!props1.isTable && props.selectProps.placeholder}
  //         </Placeholder>
  //         {React.Children.map(children, (child) =>
  //           child && child.type !== Placeholder ? child : null
  //         )}
  //       </ValueContainer>
  //     );
  //   };

  //   const control = props1.isTable
  //     ? (provided, state) => ({
  //         borderBottom: "1px solid #aaaaaa",
  //         borderTop: 0,
  //         borderLeft: 0,
  //         borderRight: 0,
  //         display: "flex",
  //       })
  //     : (provided, state) => ({ ...provided });

  //   const TheamColor = !props1.isReadOnly
  //     ? {
  //         primary50: "#86b7fe",
  //         primary25: "#86b7fe",
  //         primary: "#86b7fe",
  //       }
  //     : {};
  const ReadonlyBackgroundColor = props1.isReadOnly
    ? {
        background: "#e9ecef",
        opacity: 1,
        border: "1px solid #ced4da",
        color: "#212529",
      }
    : {};

  const controlFocus = props1.hasError
    ? {
        boxShadow: "0 0 0 0.18rem rgba(244, 67, 54, 0.30)",
        borderColor: "rgba(244, 67, 54, 0.30)",
      }
    : {
        "&:focus-within,&:focus": {
          boxShadow: "0 0 0 0.18rem rgb(13 110 253 / 25%)",
        },
      };
  //   const labelBackground = !props1.isReadOnly
  //     ? {
  //         background:
  //           "linear-gradient(0deg, white 0%, white 50%, white 50%, white 100%)",
  //       }
  //     : {
  //         background:
  //           "linear-gradient(0deg, #e9ecef 0%, #e9ecef 50%, #ffffff 50%, #ffffff 100%)",
  //         opacity: 1,
  //       };

  //   const SmlabelBackground = !props1.isReadOnly
  //     ? {
  //         background:
  //           "linear-gradient(0deg, white 0%, white 50%, transparent 50%, transparent 100%)",
  //       }
  //     : {
  //         background:
  //           "linear-gradient(0deg, #e9ecef 0%, #e9ecef 50%, transparent 50%, transparent 100%)",
  //         opacity: 1,
  //       };
  const readOnlyInputColor = props1.isReadOnly ? { color: "#212529" } : {};

  const Indicator = props1.isReadOnly ? { display: "none" } : {};
  const spacing = {
    controlHeight: 31,
    baseUnit: 0,
  };

  return (
    <Select
      className={`basic-single ${props1.className}`}
      classNamePrefix="select"
      //   components={{
      //     ValueContainer: CustomValueContainer,
      //   }}
      defaultValue={props1.defaultValue ? props1.defaultValue : undefined}
      value={props1.value !== "0" ? props1.value : null}
      isClearable={props1.Clearable ? props1.Clearable : false}
      isRtl={props1.isRtl ? props1.isRtl : false}
      isSearchable={props1.Searchable ? props1.Searchable : false}
      name={props1.name}
      id={props1.id}
      options={props1.options}
      onChange={props1.onChange}
      onBlur={props1.onBlur}
      menuPlacement="auto"
      menuPosition="fixed"
      isDisabled={props1.isReadOnly}
      placeholder={props1.placeholder}
      theme={(theme) => ({
        ...theme,
        borderRadius: "0.25rem",
        border: "1px solid",
        // colors: { ...theme.colors, ...TheamColor },
        spacing: {
          ...theme.spacing,
          ...spacing,
        },
      })}
      styles={{
        control: (provided, state) => ({
          ...provided,
          fontSize: "1rem",
          padding: "0.125rem 0.625rem",
          ...controlFocus,
          ...ReadonlyBackgroundColor,
        }),
        menuPortal: (provided, state ) => ({
            ...provided,
            zIndex: 999,
        }),
        container: (provided, state) => ({
          ...provided,
          //   marginTop: 7,
          paddingLeft: 0,
          paddingRight: 0,
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          overflow: "visible",
        }),
        singleValue: (provided, state) => ({
          ...provided,
          ...readOnlyInputColor,
        }),
        indicatorsContainer: (provided, state) => ({
          ...provided,
          ...Indicator,
        }),
        // placeholder: (provided, state) => ({
        //   ...provided,
        //   ...labelBackground,
        //   "@media only screen and (max-width: 767px)": {
        //     ...provided["@media only screen and (max-width: 767px)"],
        //     ...SmlabelBackground,
        //     top: "-16px",
        //   },
        //   position: "absolute",
        //   //   left: "1px",
        //   // fontSize: "0.8em",

        //   top: "-15px",
        //   fontSize: "0.75rem",
        //   color: "#58677d",
        //   fontWeight: 500,
        //   fontFamily: "'Inter', sans-serif",
        // }),
      }}
    />
  );
};

export default Selection;
