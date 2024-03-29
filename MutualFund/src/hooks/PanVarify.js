function PanVarify(pan) {
  const getPanData = async () => {
    const data = {
      pan_number: pan,
      consent: "Y",
    };
    try {
      const res = await fetch(
        "https://stoplight.io/mocks/gridlines/gridlines-api-docs/16667115/pan-api/fetch-detailed",
        {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "Application/Json",
            "X-API-Key": 123,
            "X-Auth-Type": 16667108,
          },
        }
      );

      if (res.ok) {
        return await res.json();
      } else {
        alert("pan number is not valid");
        return res;
      }
    } catch (err) {
      return alert("there is some error");
    }
  };
  getPanData();
}

export default PanVarify;
