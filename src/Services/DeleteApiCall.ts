import { apiWithHeader, apiWithoutHeader } from "./Api";
import { BASE_URL } from "../config/ApiEnvironment";
import { getData, ACCESS_TOKEN } from "../Storage/ApplicationStorage";
import { resetStack, showToastMessage } from "./../utils/Utilities";
import { clearAsyncStorage } from "../Storage/ApplicationStorage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import assets from "../assets";







export const deleteApiCall = (url) => {

  console.log("DELETE API URL=====", url);
  return apiWithoutHeader(BASE_URL)
    .delete(url)
    .catch(async function (error) {

      console.log("DELETE API RESPONSE=====", error);

      return error.response;
    });
};


export const deleteApiCallWithHeader = (token, url, token_key) => {

  console.log("DELETE API URL=====", url);
  const CONTENT_TYPE = "application/json";
  return apiWithHeader(token, BASE_URL, CONTENT_TYPE, token_key)
    .delete(url)
    .catch(async function (error) {

      console.log("DELETE API RESPONSE WITH HEADER=====", error);

      return error.response;
    });
};