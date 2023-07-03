import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import assets from "../../assets";
// import { usePersistantResponseStore } from "../../store/peristResponse";
import { BASE_URL } from "../../config/ApiEnvironment";
import { getApiCall } from "../GetApiCall";
import { postApiCall } from "../PostApiCall";
import { deleteApiCallWithHeader } from "../DeleteApiCall";
import {
  getData,
  ACCESS_TOKEN,
  LOGIN_TYPE_TOKEN_KEY,
} from "../../Storage/ApplicationStorage";
import { clearAsyncStorage } from "../../Storage/ApplicationStorage";
import {
  navigateTo,
  resetStack,
  showToastMessage,
} from "../../utils/utilities";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { putApiCall } from "../PutApiCall";
import Toast from "react-native-simple-toast";

interface UseRestProps {
  URL: string;
  PAYLOAD?: any;
  paginationEnabled?: boolean;
  useUrlOnly?: boolean;
  lazy?: boolean;
  persist?: boolean;
  optimisticResponse?: any;
  CALL_TYPE: number;
  RESPONSE_TYPE?: string;
}
interface UseRestReturnProps<T> {
  data: T | null;
  loading: number;
  error: string | null;
  responseCode: number;
  fetchData: (
    currentDataLength: number
  ) => Promise<[T, Dispatch<SetStateAction<T | null>>]>;
  search: CallableFunction;
}

export const LOADING_TYPES = {
  STOPPED_LOADING: 0,
  LOADING: 1,
  FETCHING_MORE: 2,
  STOPPED_FETCHING_MORE: 3,
  REFRESHING: 4,
  STOP_REFRESHING: 5,
  SEARCHING: 6,
  STOP_SEARCHING: 7,
};
export const CALL_TYPES = {
  GET: 1,
  POST: 2,
  DELETE: 3,
  PUT: 4,
};

export const useRest = <T>({
  URL,
  PAYLOAD,
  CALL_TYPE,
  paginationEnabled = true,
  useUrlOnly = false,
  lazy = false,
  persist = false,
  optimisticResponse,
  RESPONSE_TYPE,
}: UseRestProps): UseRestReturnProps<T> => {
  /**
   * Base code for getting data from rest
   */
  //const { data: persistantData, setDataToStore } = usePersistantResponseStore();
  //const persistantResponse: T = !persist ? null : persistantData[URL];
  // const { navigate, dispatch } = useNavigation();
  const navigation = useNavigation();

  const { baseUrl } = BASE_URL;
  // const login = useLogin();
  const [loading, setLoading] = useState(LOADING_TYPES.REFRESHING);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [isOptimisticInitialized, setOptimisticInitialized] = useState(false);
  const [searchText, setSearchText] = useState("");
  var isreset = false;

  // const setPersistantData = async (data: T) => {
  //   await setDataToStore({ ...persistantData, [URL]: data });
  // };

  const fetchData: (
    currentDataLength: number
  ) => Promise<[T, Dispatch<SetStateAction<T | null>>]> = async (
    currentDataLength: number
  ) => {
    setLoading(
      data
        ? currentDataLength === -1
          ? LOADING_TYPES.REFRESHING
          : currentDataLength === -2
          ? LOADING_TYPES.SEARCHING
          : LOADING_TYPES.FETCHING_MORE
        : LOADING_TYPES.LOADING
    );
    // if (optimisticResponse && !isOptimisticInitialized) {
    //   setData(optimisticResponse);
    //   setOptimisticInitialized(true);
    // }
    let responseJson;
    console.log("Fetching data =========", currentDataLength, "     ", loading);

    try {
      let aToken = await getData(ACCESS_TOKEN);
      let token_key = await getData(LOGIN_TYPE_TOKEN_KEY);
      console.log("TOKEN ======= ", token_key);
      console.log("PAYLOAD RECEIVED ======= ", PAYLOAD);
      let url = BASE_URL + URL;
      if (CALL_TYPE === CALL_TYPES.GET) {
        responseJson = await getApiCall(url, aToken);
      } else if (CALL_TYPE === CALL_TYPES.DELETE) {
        responseJson = await deleteApiCallWithHeader(aToken, url, token_key);
      } else if (CALL_TYPE === CALL_TYPES.PUT) {
        responseJson = await putApiCall(aToken, url, token_key);
      } else {
        PAYLOAD.accessToken = aToken;
        PAYLOAD.searchTerm = PAYLOAD.searchTerm || searchText;
        PAYLOAD.current_page = currentDataLength < 1 ? 1 : currentDataLength;
        console.log("Api___Request", url, "-------" + JSON.stringify(PAYLOAD));
        try {
          responseJson = await postApiCall(PAYLOAD, url, RESPONSE_TYPE);
          console.log("Api___Response", JSON.stringify(responseJson));
        } catch (e) {
          console.log(" responseJson EXCEPTION=========", e);
        }
      }
      console.log("Response JSON: ", JSON.stringify(responseJson));
      if (responseJson) {
        if (responseJson.status === 401) {
          showToastMessage("Session expired, please login again");
          clearAsyncStorage();
          resetStack(
            assets.NavigationConstants.AUTH_STACK.NAME,
            null,
            navigation
          );
        } else {
          responseJson = responseJson.data;
          await setError(null);
          await setData(responseJson);
          await setResponseCode(responseJson.status);
        }
      }
    } catch (exception) {
      console.log("Error fetching", exception);
      setTimeout(() => {
        setError("Please check your internet connection");
      }, 300);
    }
    setLoading(
      data
        ? currentDataLength === -1
          ? LOADING_TYPES.STOP_REFRESHING
          : currentDataLength === -2
          ? LOADING_TYPES.STOP_SEARCHING
          : LOADING_TYPES.STOPPED_FETCHING_MORE
        : LOADING_TYPES.STOPPED_LOADING
    );
    return [responseJson, setData];
  };

  const search = (keyword: any) => {
    console.log("SEARCH TEXT IN API============", keyword);
    setSearchText(keyword);
  };

  useEffect(() => {
    if (!lazy && searchText === "") fetchData(0);
    if (!lazy) fetchData(-2);
  }, [URL, baseUrl, searchText]);

  return {
    data,
    loading,
    error,
    fetchData,
    search,
    responseCode,
  };
};

export default useRest;
