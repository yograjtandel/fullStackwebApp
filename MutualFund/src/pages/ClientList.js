import React, { useState, useContext, useEffect } from "react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

import BreadCrum from "../components/UI/BreadCrum";
import useActions from "../hooks/use-actions";
import Tr from "../components/Table/Tr";
import NoRecordFound from "../components/UI/NoRecordFound";

import FormContext from "../store/FormContext";

import { RoutPath } from "../data/Paths";

const ClientList = () => {
  const [UserList, setUserList] = useState([]);
  const [Pagination, setPagination] = useState({});
  const [FirstNameSort, setFirstNameSort] = useState(false);
  const [sortDate, setsortDate] = useState(false);
  const [sortId, setsortId] = useState(false);
  const [checkedAllRecord, setcheckedAllRecord] = useState(false);
  const [NoData, setNoData] = useState(false);

  const FormCtx = useContext(FormContext);
  let navigate = useNavigate();

  const fetchUserList = async (queryParams = false) => {
    const EmployeemasterList_body = await useActions(
      "get",
      "user/list",
      false,
      false,
      queryParams
    );
    let list = [];

    if (EmployeemasterList_body.users.length > 0) {
      //   setPagination((prev) => {
      //     return {
      //       ...prev,
      //       count: EmployeemasterList_body.count,
      //       next: EmployeemasterList_body.next,
      //       previous: EmployeemasterList_body.previous,
      //       page_size: EmployeemasterList_body.page_size,
      //     };
      //   });

      list = EmployeemasterList_body.users;
    } else {
      if (EmployeemasterList_body.users.length === 0) {
        setNoData(true);
      }
    }
    setUserList([...list]);
  };

  useEffect(() => {
    FormCtx.setActiveRecord(false);
    FormCtx.setActiveview("list");
    FormCtx.setActiveMode(false);

    fetchUserList();
  }, []);

  const trList = UserList.map((item) => {
    return (
      <Tr
        data={item}
        key={uuid()}
        col={["email", "mobile"]}
      />
    );
  });
  return (
    <div className="container-fluid">
      <BreadCrum title="Client List" to={RoutPath.ClientForm} />
      <div className="card table-card">
        <div className="w-100">
          <div className="table-responsive">
            {/* <ActionConreoller
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
            /> */}
            {!NoData && (
              <table className="table table-hover box-shadow p-3 bg-white border rounded">
                <thead className="bg-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">DOB</th>
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
