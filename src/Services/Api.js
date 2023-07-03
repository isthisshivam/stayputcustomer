import axios from "axios";
const CONTENT_TYPE = "application/json";
const TIMEOUT = 50000;

export const apiWithoutHeader = (baseUrl) =>
  axios.create({
    baseURL: baseUrl,
    timeout: TIMEOUT,
    headers: {
      "Content-Type": CONTENT_TYPE,
    },
  });

export const apiWithHeader = (
  accessToken,
  baseUrl,
  contentType,
  token_key,
  RESPONSE_TYPE
) =>
  axios.create({
    baseURL: baseUrl,
    timeout: TIMEOUT,
    responseType: RESPONSE_TYPE,
    headers: {
      "Content-Type": contentType ? contentType : CONTENT_TYPE,
      Authorization: "Basic " + accessToken,
      LoginTypeTokenKey: token_key,
    },
  });

export const apiWithCustomHeader = (headerparams, baseUrl) =>
  axios.create({
    baseURL: baseUrl,
    timeout: TIMEOUT,
    headers: headerparams,
  });
