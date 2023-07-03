import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import Header from "../../common_components/Header";
import { Department_pannel } from "./component/department_pannel";
import assets from "../../assets";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";
import { CATEGORY_LIST, STORES_LIST } from "../../Services/ApiUrls";
import { LOCATION_ID } from "../../Storage/ApplicationStorage";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { SaveData, GetData } from "../../utils/utilities";
import No_Data_Fount from "../../common_components/No_Data_Found";
import NoInternetView from "../../common_components/NoInternetView";
const Shop_Screen = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const [store, setStore] = useState("");
  const [storeList, setStoreList] = useState([]);
  const { navigate, goBack } = useNavigation();
  const [input, setInput] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [categoryList, setCategoryList] = useState(null);
  const [cart, setCart] = useState(0);
  const [search, setSearch] = useState("");
  const category_payload = {
    store: store,
    search: search,
  };
  const {
    data: s_data,
    loading: s_loading,
    error: s_error,
    fetchData: s_fetchData,
    responseCode: s_responseCode,
  } = useRest({
    URL: STORES_LIST,
    CALL_TYPE: CALL_TYPES.GET,
  });

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: CATEGORY_LIST,
    PAYLOAD: category_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (s_data) {
      const stores = s_data?.data;
      setStoreList(stores);
    }
  }, [s_data, s_error, s_responseCode]);

  useEffect(() => {
    if (data) {
      console.log("shop category data==", data.data);
      setCart(data?.data?.cart.cart_item_count);
      setCategoryList(data?.data?.category);
    }
  }, [data, error, responseCode]);

  useFocusEffect(
    React.useCallback(() => {
      const focus = getData();
      return () => focus;
    }, [])
  );

  useEffect(() => {
    if (store) {
      fetchData(0);
    }
  }, [store]);

  useEffect(() => {
    if (search) {
      fetchData(0);
    }
  }, [search]);

  useFocusEffect(
    React.useCallback(() => {
      if (store) {
        fetchData(0);
        loading === LOADING_TYPES.STOPPED_LOADING;
      }
    }, [store])
  );
  const getData = async () => {
    const login = await GetData(LOGIN_KEY);
    const value = await GetData("location");
    const location = JSON.parse(value);
    const user_store = JSON.parse(login);
    setStore(user_store?.store);
    setInput(user_store?.store_name);
    if (location?.vicinity) {
      setDeliveryAddress(location?.vicinity);
    } else {
      setDeliveryAddress(location);
    }
  };

  const saveLoginData = async (data) => {
    var login = await GetData(LOGIN_KEY);
    login = JSON.parse(login);
    login.store = data.id;
    login.store_name = data.name;
    login.store_image = data.image;
    await SaveData(LOGIN_KEY, JSON.stringify(login));
  };

  const clearLocationId = async () => {
    global.location_id = null;

    await SaveData(LOCATION_ID, JSON.stringify(null));
  };
  const StoresItems = (item) => {
    return (
      <Pressable
        onPress={() => {
          setStore(item.id);
          saveLoginData(item);
          setInput(item.name);
          clearLocationId();
        }}
      >
        <View style={styles.optional_container}>
          <View
            style={[
              styles.unselected_content,
              {
                backgroundColor:
                  store == item.id
                    ? assets.Colors.ACTIVE_STORES_BG_COLOR
                    : assets.Colors.INACTIVE_STORE_BG_COLOR,
              },
            ]}
          >
            <Text
              style={[
                styles.stores,
                {
                  color:
                    store == item.id
                      ? assets.Colors.BACKGROUND_THEME_COLOR
                      : assets.Colors.INPUT_TITLE_COLOR,
                },
              ]}
            >
              {item.name}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button

      <View style={pallete.footer}>
        {loading === LOADING_TYPES.FETCHING_MORE ? (
          <ActivityIndicator
            size={"large"}
            color={assets.Colors.THEME_COLOR_PRIMARY}
            style={[pallete.loader]}
          />
        ) : null}
      </View>
    );
  };

  const loadMoreData = async () => {
    if (
      parseInt(data?.data?.current_page) < parseInt(data?.data?.total_pages)
    ) {
      const currentPage = parseInt(data?.data?.current_page) + 1;

      const [response, setData] = await fetchData(currentPage);
      const merged_list = [...categoryList, ...response?.data?.category];

      setCategoryList(merged_list);
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      {error ? (
        <NoInternetView onRefresh={fetchData} />
      ) : (
        <View style={{ flex: 1 }}>
          <Header
            store_location=""
            isVisible={false}
            cart={cart}
            title={deliveryAddress}
          />
          <View style={styles.topPadding}>
            <FlatList
              data={storeList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => StoresItems(item)}
            />
            <View style={styles.search_input}>
              <Ionicons
                name="search-outline"
                color={assets.Colors.PRODUCT_DETAILS_INPUT_TXT_CLR}
                size={22}
              />
              <TextInput
                placeholder={`Search ${input}`}
                onPressIn={() =>
                  navigate(assets.NavigationConstants.PRODUCT_SEARCH.NAME)
                }
                editable={false}
                returnKeyType="search"
                placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                style={styles.placeHolder}
              />
            </View>
          </View>
          {data?.data?.category.length !== 0 ||
          loading === LOADING_TYPES.LOADING ||
          loading === LOADING_TYPES.FETCHING_MORE ||
          loading === LOADING_TYPES.SEARCHING ? (
            <Department_pannel
              depot={store}
              title="Departments"
              data={categoryList}
              renderFooter={renderFooter}
              loadMoreData={loadMoreData}
            />
          ) : (
            <View style={{ flex: 1 }}>
              <No_Data_Fount />
            </View>
          )}
        </View>
      )}
      <Modal visible={loading === LOADING_TYPES.LOADING} transparent={true}>
        <View style={[pallete.loader_View]}>
          <ActivityIndicator
            size={"large"}
            color={assets.Colors.WHITE}
            style={[pallete.loader]}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Shop_Screen;
