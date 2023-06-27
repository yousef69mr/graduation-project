import {backendAPI} from "../axios";

const getData = (url) => {
  console.log(backendAPI + url)
  return fetch(backendAPI + url, {
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
