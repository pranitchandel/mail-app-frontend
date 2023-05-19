import axios from "axios";
import Loading from "../Components/Loading";

export const request = ({
  url,
  method = "GET",
  data,
  isLoader = true,
  responseType,
  token,
  //   token = getUserToken(),
  params,
  //   showToast = true,
  signal,
}) =>
  new Promise((resolve, reject) => {
    let config = {
      url: "https://mail-app-backend.onrender.com" + url,
      method: method,
      params: params ? params : null,
      data: data ? data : null,
      responseType: responseType ? responseType : null,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      ...(signal
        ? {
            signal: signal,
          }
        : {}),
    };
    config.params == null && delete config.params;
    config.data == null && delete config.data;
    config.responseType == null && delete config.responseType;

    showLoader(isLoader);
    axios(config)
      .then((response) => {
        showLoader(false);
        return resolve(response);
      })
      .catch((error) => {
        showLoader(false);
        return reject(error);
      });
  });

const showLoader = (status) => {
  if (status) {
    <Loading />;
  }
};
