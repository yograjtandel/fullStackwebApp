const useAadharVarify = async (aadhaar) => {
  const data = {
    "base64": "/1f312f1a6550432896d46aff6bb99fdbkloqpn782loa9j101911mnkhjaosfqw921en98310dhw9jd219/adfevac",
    "share_code": "1234",
    "consent": "Y"
  };
//   curl --request POST \
//   --url https://stoplight.io/mocks/gridlines/gridlines-api-docs/16667060/aadhaar-api/extract-data \
//   --header 'Content-Type: application/json' \
//   --header 'X-API-Key: ' \
//   --header 'X-Auth-Type: 16667108' \
//   --data '{
//   "base64": "/1f312f1a6550432896d46aff6bb99fdbkloqpn782loa9j101911mnkhjaosfqw921en98310dhw9jd219/adfevac",
//   "share_code": "1234",
//   "consent": "Y"
// }'
  try {
    const res = await fetch(
      "https://stoplight.io/mocks/gridlines/gridlines-api-docs/16667060/aadhaar-api/extract-data",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": '123',
          "X-Auth-Type": 16667108,
        },
      }
    );
    if (res.ok) {
      return await res.json();
    } else {
      alert("Aadhar number is not valid");
    }
  } catch (err) {
    return alert("there is some error");
  }
};

export default useAadharVarify;
