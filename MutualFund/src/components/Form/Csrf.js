import React from "react";

import getCookie from "../../hooks/Use-CSRF";

const CSRFToken = () => {
  const csrftoken = getCookie("csrftoken");
  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};
export default CSRFToken;
