import api from "../axios";
const getData = (url) => {
  return fetch(api.baseURLApi + url, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((err) => {
      console.error(err);
      return;
    });
};

export default getData;
