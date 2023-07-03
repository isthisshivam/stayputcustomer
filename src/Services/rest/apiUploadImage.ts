import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
// import { usePersistantResponseStore } from "../../store/peristResponse";
import { BASE_URL } from "../../config/ApiEnvironment";
import { getApiCall } from "../GetApiCall";
import { postApiCallImage } from "../PostApiCall";
import { getData, ACCESS_TOKEN } from "../../Storage/ApplicationStorage";
import { apiWithHeader, apiWithCustomHeader } from "../Api";
import RNFetchBlob from "rn-fetch-blob";

interface UseRestProps {
  URL: string;
  PAYLOAD?: any;
  useUrlOnly?: boolean;
  lazy?: boolean;
  CALL_TYPE: number;
  fileList: [any];
}
interface UseRestReturnProps<T> {
  data: T | null;
  loading: number;
  error: string | null;
  responseCode: number
  fetchData: (
    currentDataLength: number, fileList: [any]
  ) => Promise<[T, Dispatch<SetStateAction<T | null>>]>;
}

export const LOADING_TYPES = {
  STOPPED_LOADING: 0,
  LOADING: 1,
};
export const CALL_TYPES = {
  GET: 1,
  POST: 2,
};

const useRest = <T>({
  URL,
  PAYLOAD,
  CALL_TYPE,
  lazy = false,
  fileList,
}: UseRestProps): UseRestReturnProps<T> => {
  /**
   * Base code for getting data from rest
   */

  const { baseUrl } = BASE_URL;
  const [loading, setLoading] = useState(LOADING_TYPES.STOPPED_LOADING);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [responseCode, setResponseCode] = useState(null);

  const fetchData: (
    currentDataLength: number, fileList: [any]
  ) => Promise<[T, Dispatch<SetStateAction<T | null>>]> = async (
    currentDataLength: number,fileList: [any]
  ) => {
      setLoading(LOADING_TYPES.LOADING);

      let responseJson;

      try {
        let aToken = await getData(ACCESS_TOKEN);
        let url = BASE_URL + URL;



        var files = [];
        // if (PAYLOAD)
        //   files.push({ name: "postedMessage", data: JSON.stringify(PAYLOAD) });

        console.log("UPLOADING FILE====", fileList);
        if (fileList.length < 1)
          return
        fileList.map((item, index) =>
          files.push({
            name: "profile_pic",
            filename: Platform.OS == "ios" ? item : item,
            type: 'image/jpeg',
            data:
              Platform.OS == "ios"
                ? RNFetchBlob.wrap(
                  decodeURIComponent(item.replace("file://", ""))
                )
                : RNFetchBlob.wrap("file://" + item),

          })
        ),
          await RNFetchBlob.config({
            timeout: 240000
          }).fetch(
            "POST",
            url,
            {
              Authorization: "Basic " + aToken,
              "Content-Type": "multipart/form-data",
            },

            files
          )
            .then((resp) => {
              console.log("Response JSON SUCCESS: ", JSON.stringify(resp.data));
              setData(resp.data);
              setLoading(LOADING_TYPES.STOPPED_LOADING);
              return [resp.data, setData];
            })
            .catch((err) => {
              // ...
              // alert("ERROR===" + JSON.stringify(err));
              console.log("Response JSON ERROR DIRECT: ", err);
              console.log("Response JSON ERROR: ", JSON.stringify(err));
              if (responseJson.status === 401) {
                setResponseCode(401)
              }
              else {
                setError(err);
                setLoading(LOADING_TYPES.STOPPED_LOADING);
              }
              return [responseJson.data, setData];
            });
        //console.log("Response JSON: ", JSON.stringify(responseJson));
      } catch (exception) {
        console.log("Error fetching", exception);

        setError(error);
      }
    };

  useEffect(() => {
    if (!lazy) fetchData(-2);
  }, [URL, baseUrl]);

  return {
    data,
    loading,
    error,
    fetchData,
    responseCode
  };
};

export default useRest;
