import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { NavLink } from "react-router-dom";

import TrWrapper from "./TrWrapper";

import { RoutPath } from "../../data/Paths";

import FormContext from "../../store/FormContext";

const FundListTr = (props) => {
  const navigate = useNavigate();
  const Formctx = useContext(FormContext)
  const SwitchFund = (event) => {
    event.stopPropagation();
    Formctx.setActiveMode('save');
    navigate(RoutPath.SwitchFundForm);
  };
  return (
    <TrWrapper data={props.data} to={props.to}>
      <td>
        <div className="text-start">
          <figure className="m-0 p-0">
            <img
              src="assets/web-asset/images/shield-investment.png"
              className="mf-table-img"
              alt=""
            />
          </figure>
        </div>
      </td>
      <td>
        <div>
          <h5 className="text-start">ICICI Prudential Business Cycle Fund</h5>
          <div className="text-start">
            <span className="font-12 me-2">Growth</span>{" "}
            <span className="font-12 me-2">Equity</span>
            <span className="font-12 ">Sectoral/Thematic</span>
          </div>
        </div>
      </td>
      <td>
        <span className="badge custom-badge">Active</span>
      </td>
      <td>10th Oct 2022</td>
      <td>Monthly</td>
      <td>₹ 500/-</td>
      <td>
        <button className="border-0 bg-white text-primary" onClick={SwitchFund}>
          Switch
        </button>
      </td>
    </TrWrapper>
  );
};

export default FundListTr;
