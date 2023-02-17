import { EndPoint } from "../data/EndPoint";

import getCookie from "./Use-CSRF";

const useActions = async (action, model, ids, data, queryParams) => {
  // const AuthCtx = useContext(AuthContext);
  // const useActions = async (args) => {
  const keys = ids ? "/" + ids : "";
  const parems = queryParams ? queryParams : "";
  const Token = localStorage.getItem("token");
  let Authorization = Token ? "Bearer " + JSON.parse(Token)["token"] : false;
  //   let CSRF = getCookie("csrftoken");

  let url = EndPoint + model;

  if (keys) {
    url = url + keys;
  }

  if (parems) {
    url = url + "/" + parems;
  }

  if (!keys && !parems) {
    url = url + "/";
  }
  switch (action) {
    case "get":
      const responce = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "Application/Json",
          //   "Authorization": "Bearer " + AuthCtx.access
          Authorization: Authorization,
        },
      });
      if (responce.ok) {
        return await responce.json();
      } else {
        responce.json().then((err) => {
          console.log(err);
        });
        return { ok: responce.ok };
      }
      break;
    case "post":
      try {
debugger

        const createres = await fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "Application/Json",
            Authorization: Authorization,
            //   'X-CSRFToken': CSRF
          },
        });
debugger

        return createres;
      } catch (err) {
        console.log(err);
      }

      break;
    case "delete":
      let ids = "";
      const SelectedRecord = document.querySelectorAll(
        'input[id][type="checkbox"]'
      );
      SelectedRecord.forEach((element) => {
        if (element.checked) {
          ids = ids ? ids + "," + element.id : element.id;
        }
      });
      const deleteRes = await fetch(url + "/" + ids, {
        method: "delete",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "Application/Json",
          Authorization: Authorization,
        },
      });

      if (deleteRes.ok) {
        return await deleteRes.json();
      } else {
        deleteRes.json().then((err) => {
          console.log(err);
        });
      }
      break;
    case "put":
      const PutResponce = await fetch(url, {
        method: "put",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "Application/Json",
          Authorization: Authorization,
        },
      });
      return PutResponce;
      //   if (PutResponce.ok) {
      //     return await PutResponce.json();
      //   } else {
      //     PutResponce.json().then((err) => {
      //       console.log(err);
      //     });
      //   }
      break;
    default:
      responce = false;
  }
};

export default useActions;
