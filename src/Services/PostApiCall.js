import { apiWithHeader, apiWithCustomHeader } from "./Api";
import { BASE_URL } from "../config/ApiEnvironment";

export const postApiCall = async (params, url, RESPONSE_TYPE) => {
  return apiWithHeader(params.accessToken, BASE_URL, RESPONSE_TYPE)
    .post(url, params)
    .catch(function (error) {
      console.log("apiWithHeader.catch==", error);
      return error.response;
    });
};

export const postApiCallFCM = (headerParams, params, url) => {
  return apiWithCustomHeader(headerParams, BASE_URL)
    .post(url, params)
    .catch(function (error) {
      return error.response;
    });
};

export const postApiCallImage = (token, formData, url) => {
  const CONTENT_TYPE = "multipart/form-data";
  return apiWithHeader(token, BASE_URL, CONTENT_TYPE)
    .post(url, formData)
    .catch(function (error) {
      return error.response;
    });
};
