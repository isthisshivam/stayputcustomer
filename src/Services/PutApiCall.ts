import { apiWithHeader, apiWithCustomHeader } from "./Api";
import { BASE_URL } from "../config/ApiEnvironment";

export const putApiCall = (token, url, token_key) => {
  console.log("PUT API CALL========", token_key);

  return apiWithHeader(token, BASE_URL, null, token_key)
    .put(url)
    .catch(function (error) {
      return error.response;
    });
};
