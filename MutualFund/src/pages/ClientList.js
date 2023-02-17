import React, { useState, useContext, useEffect } from "react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

import BreadCrum from "../components/UI/BreadCrum";
import ActionConreoller from "../components/ActrionController/ActionController";
import useActions from "../hooks/use-actions";
import ActiveModelContext from "../store/ActiveModelContext";
import Tr from "../components/Table/Tr";
import NoRecordFound from "../components/UI/NoRecordFound";

import FormContext from "../store/FormContext";

import { RoutPath } from "../data/Paths";
import { Models } from "../data/Models";

const ClientList = () => {
  const [UserList, setUserList] = useState([]);
  const [Pagination, setPagination] = useState({});
  const [FirstNameSort, setFirstNameSort] = useState(false);
  const [sortDate, setsortDate] = useState(false);
  const [sortId, setsortId] = useState(false);
  const [checkedAllRecord, setcheckedAllRecord] = useState(false);
  const [NoData, setNoData] = useState(false);

  const modelctx = useContext(ActiveModelContext);
  const FormCtx = useContext(FormContext);
  let navigate = useNavigate();

  const fetchUserList = async (queryParams = false) => {
    if (modelctx.model) {
      //   const EmployeemasterList_body = await useActions(
      //     "get",
      //     "user/list",
      //     false,
      //     false,
      //     queryParams
      //   );
      let list = [];

      const investor = await useActions("post", "user/create_invester", false, {
        perm_addr_is_corres_addr: 1,
        skip_nomination: 1,
        bank_accounts: [
          {
            number: "1231312312321",
            primary_account: true,
            type: "SAVINGs",
            ifsc_code: "ICIC0000611",
          },
        ],
        fatca_detail: {
          source_of_wealth: "business",
          gross_annual_income: 100000,
        },
        nomination: [
          {
            name: "nandam",
            date_of_birth: "1990-10-10",
            relationship: "spouse",
            allocation_percentage: 100,
          },
        ],
        kyc_identity_detail: {
          name: "tony Soprano ms",
          pan_number: "AFZPN3001P",
          date_of_birth: "1980-10-10",
          gender: "female",
          marital_status: "single",
          residential_status: "RESIDENT_INDIVIDUAL",
          occupation: "BUSINESS",
          pep_exposed: false,
          pep_related: false,
        },
        correspondence_address: {
          line1: "1082 harlur road",
          city: "Vadodara",
          state: "Gujarat",
          pincode: "560102",
        },
      });
      debugger;
      //   if (EmployeemasterList_body.count > 0) {
      //     setPagination((prev) => {
      //       return {
      //         ...prev,
      //         count: EmployeemasterList_body.count,
      //         next: EmployeemasterList_body.next,
      //         previous: EmployeemasterList_body.previous,
      //         page_size: EmployeemasterList_body.page_size,
      //       };
      //     });

      //     list = EmployeemasterList_body.results;
      //   } else {
      //     if (EmployeemasterList_body.count === 0) {
      //       setNoData(true);
      //     }

      //     if (!EmployeemasterList_body.ok) {
      //       navigate("../" + RoutPath.NotFound);
      //     }
      //   }
      setUserList([...list]);
    }
  };
  useEffect(() => {
    FormCtx.setActiveRecord(false);
    FormCtx.setActiveview("list");
    FormCtx.setActiveMode(false);
    modelctx.setActiveModel({
      model: Models.client,
      route: RoutPath.ClientForm,
    });
    const event = document.body.addEventListener("click", () => {
      const elements = document.querySelectorAll(".dropdown-menu.d-block");
      if (elements.length) {
        elements.forEach((element) => {
          element.classList.remove("d-block");
        });
      }
    });
    fetchUserList();
    return () => document.body.removeEventListener("click", event);
  }, [modelctx.model]);

  const trList = UserList.map((item) => {
    return (
      <Tr
        data={item}
        key={uuid()}
        col={[
          "first_name",
          "middle_name",
          "last_name",
          "date_of_birth",
          "email",
        ]}
      />
    );
  });
  return (
    <div className="container-fluid">
      {/* <span
        className="btn btn-primary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#successModal`}
      >
        Success
      </span>
      <span
        className="btn btn-primary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#SuccessMsgModal`}
      >
        SuccessMsg
      </span>
      <span
        className="btn btn-primary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#ErrorModal`}
      >
        Error
      </span>
      <span
        className="btn btn-primary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#WarningModal`}
      >
        Warning
      </span>
      <span
        className="btn btn-primary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#msg`}
      >
        msg
      </span>
      <Success id={`successModal`} />
      <SuccessMsg id={`SuccessMsgModal`} />
      <Error id={`ErrorModal`} />
      <Warning id={`WarningModal`} />
      <PopUp
        btnclassName=""
        centerFooter={true}
        button={[{ label: "Ok", class: "btn-sm btn-primary px-4" }]}
        id="msg"
        type="okmodal"
      >
        <p className="text-center p-0 mb-0">
          Anyone with access can view your invited visitors.
        </p>
      </PopUp> */}
      <BreadCrum title="Client List" to={RoutPath.ClientForm} />
      <div className="card table-card">
        <div className="w-100">
          <div className="table-responsive">
            <ActionConreoller
              Action={false}
              Filter={true}
              Pagination={{
                Pagination: Pagination,
                fetchUserList: fetchUserList,
              }}
              dataList={[...UserList]}
              GroupBy={[
                {
                  item: "Designation",
                  onClick: () => {
                    // setUserList(
                    //   useFilter(
                    //     "groupby",
                    //     "designation",
                    //     [...UserList],
                    //     true
                    //   )
                    // );
                  },
                },
              ]}
            />
            {!NoData && (
              <table className="table table-hover box-shadow p-3 bg-white border rounded">
                <thead className="bg-light">
                  <tr>
                    <th scope="col">first name</th>
                    <th scope="col">middle name</th>
                    <th scope="col">lastname</th>
                    <th scope="col">DOB</th>
                    <th scope="col">email</th>
                  </tr>
                </thead>
                <tbody>
                  {trList.length > 0 ? trList : <h1>Loading.......</h1>}
                </tbody>
              </table>
            )}
            {NoData && <NoRecordFound msg="Create New Client!" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
