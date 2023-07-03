import { apiWithHeader } from "./Api";
import { BASE_URL } from "../config/ApiEnvironment";
import { getData, ACCESS_TOKEN } from "../Storage/ApplicationStorage";
import { resetStack, showToastMessage } from "./../utils/Utilities";
import { clearAsyncStorage } from "../Storage/ApplicationStorage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import assets from "../assets";


export const getApiCall = (url, token) => {

  return apiWithHeader(token, BASE_URL)
    .get(url)
    .catch(async function (error) {
      let aToken = await getData(ACCESS_TOKEN);
      console.log("GET API TOKEN=====", aToken);
      console.log("GET API RESPONSE=====", error);

      return error.response;
    });
};
