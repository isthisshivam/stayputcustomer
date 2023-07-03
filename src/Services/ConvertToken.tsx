import React from "react";
import axios from "axios";
import { Secrets } from "../assets/Secrets/index";
import { RUNNER_CONVERT_TOKEN } from "./ApiUrls";
const methodName = "POST";
var timeout = 500000;
var pckName = "com.stayput.dev";
const ConvertTokenInstance = async (token) => {
  let payload = {
    application: pckName,
    sandbox: true,
    apns_tokens: [token],
  };
  const instance = await axios({
    method: methodName,
    url: RUNNER_CONVERT_TOKEN,
    timeout: timeout,
    headers: {
      Authorization: Secrets.CONVERT_TOKEN_AUTH_KEY,
      "Content-Type": "application/json",
    },
    data: payload,
  });
  return instance;
};
export default ConvertTokenInstance;
