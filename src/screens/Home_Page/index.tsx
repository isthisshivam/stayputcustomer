import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import Header from "../../common_components/Header";
import assets from "../../assets";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Categories_pannel } from "./components/categories_pannel";
import { Booster_pannel } from "./components/booster_pannel";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CUSTOMER_DASHBOARD } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { SaveData, GetData, showToastMessage } from "../../utils/utilities";
import { LOGIN_KEY, LOCATION_ID } from "../../Storage/ApplicationStorage";
import Product_types from "./components/Products_by_type";
import { useDispatch, useSelector } from "react-redux";
import {
  doRefreshAction,
  productDetailRefreshAction,
} from "../../redux/actions/RefeshCallbackActions";
import NoInternetView from "../../common_components/NoInternetView";
global.storeList = [];
var __delivery = "";
const Home_Screen = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();
  const [store, setStore] = useState("");
  const [storeList, setStoreList] = useState([]);

  const [storeLocationName, setStoreLocationName] = useState("");
  const [input, setInput] = useState("");
  const navigation = useNavigation();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [category, setCategory] = useState([]);
  const [cartCount, setCartCount] = useState("");
  const [order_again, setOrderAgain] = useState([]);
  const [recently_review, set_recently_review] = useState([]);
  const [booster_products, setBooster_products] = useState([]);
  const [popular_items, set_popular_items] = useState([]);
  const doRefreshStoreData = useSelector(
    (store) => store.RefreshCallbackReducer
  );
  const dispatch = useDispatch();

  const dashBoard_payload = {
    store: store,
  };

  const {
    data: d_data,
    loading: d_loading,
    error: d_error,
    fetchData: d_fetchData,
    responseCode: d_responseCode,
  } = useRest({
    URL: CUSTOMER_DASHBOARD,
    PAYLOAD: dashBoard_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (doRefreshStoreData.refresh) {
      d_fetchData(0);
      dispatch(doRefreshAction(false));
    }
  }, [doRefreshStoreData]);

  useEffect(() => {
    if (doRefreshStoreData.product_detail_refresh) {
      d_fetchData(0);
      dispatch(productDetailRefreshAction(false));
    }
  }, [doRefreshStoreData]);

  useEffect(() => {
    if (d_data?.status === 200) {
      const dashboard = d_data?.data;

      const index = dashboard?.store.findIndex((item) => item.dafult === "1");
      saveLoginData(dashboard?.store[index]);
      setStoreList(dashboard?.store);
      if (dashboard?.store) {
        global.storeList = dashboard?.store;
        getStoreLocationData(dashboard?.store);
      }
      setCartCount(dashboard?.cart?.cart_item_count);
      setCategory(dashboard?.categories);
      set_recently_review(dashboard?.recently_review);
      set_popular_items(dashboard?.popular_items);
      setOrderAgain(dashboard?.order_again);
      setBooster_products(dashboard?.booster_products);

      __delivery = d_data?.data?.customer_information?.address;
      global.customer_default_address =
        d_data?.data?.customer_information?.address;

      getUserLocation();
    }
  }, [d_data, d_error, d_responseCode]);

  const getStoreLocationData = async (list) => {
    let data = list.filter((item) => item.id == store);
    global.store_locations = data[0]?.locations; //store locations
    if (data[0]?.locations.length > 0) {
      const locationId = await GetData(LOCATION_ID);

      const store_location_info = JSON.parse(locationId);

      if (store_location_info != null) {
        global.location_id = store_location_info.location_id;
        setStoreLocationName(store_location_info?.location_name);
      } else {
        global.location_id = data[0]?.locations[0]?.id;
        setStoreLocationName(data[0]?.locations[0]?.name);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [])
  );
  useFocusEffect(
    React.useCallback(() => {
      if (store) {
        d_fetchData(0);
        d_loading === LOADING_TYPES.STOPPED_LOADING;
      }
    }, [store])
  );

  const getUserLocation = async () => {
    const value = await GetData("location");
    const location = JSON.parse(value);
    if (location?.vicinity) {
      setDeliveryAddress(location.vicinity);
    } else {
      setDeliveryAddress(location);
    }
  };
  const getUserData = async () => {
    const login = await GetData(LOGIN_KEY);
    const user_store = JSON.parse(login);

    setStore(user_store?.store);
    global.store_name = user_store?.store;
  };
  useEffect(() => {
    if (deliveryAddress) {
      setDeliveryAddress(deliveryAddress);
    } else {
      setDeliveryAddress(__delivery);
    }
  }, [deliveryAddress]);
  const saveLoginData = async (data) => {
    var login = await GetData(LOGIN_KEY);
    login = JSON.parse(login);
    login.store = data.id;
    login.store_name = data.name;
    login.store_image = data.image;
    setInput(login.store_name);

    await SaveData(LOGIN_KEY, JSON.stringify(login));
  };
  const clearLocationId = async () => {
    global.location_id = null;
    setStoreLocationName("");
    await SaveData(LOCATION_ID, JSON.stringify(null));
  };
  const StoresItems = (item) => {
    return (
      <Pressable
        onPress={() => {
          setStore(item.id);
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
              {item.name == "Ace Hardware" ? "ACE Hardware" : item.name}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      {d_error ? (
        <NoInternetView onRefresh={d_fetchData} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header
            isVisible={true}
            store_location={storeLocationName}
            title={deliveryAddress}
            cart={cartCount}
          />
          <View style={styles.topPadding}>
            <FlatList
              data={storeList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => StoresItems(item)}
            />

            <Pressable
              onPress={() =>
                navigate(assets.NavigationConstants.PRODUCT_SEARCH.NAME)
              }
              style={[styles.search_input, { marginTop: 20 }]}
            >
              <Ionicons
                name="search-outline"
                color={assets.Colors.PRODUCT_DETAILS_INPUT_TXT_CLR}
                size={22}
              />
              <TextInput
                editable={false}
                value={`Search ${input} `}
                onPressIn={() =>
                  navigate(assets.NavigationConstants.PRODUCT_SEARCH.NAME)
                }
                placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                style={styles.placeHolder}
              />
            </Pressable>
          </View>
          <View style={styles.topMargin}>
            <Categories_pannel data={category} depot={store} />
            {order_again.length !== 0 && (
              <Product_types
                onRefresh={() => d_fetchData(0)}
                items={cartCount}
                data={order_again}
                store={store}
                title={"Order again"}
              />
            )}
            {recently_review.length !== 0 && (
              <Product_types
                onRefresh={() => d_fetchData(0)}
                items={cartCount}
                data={recently_review}
                store={store}
                title={"Recently viewed"}
              />
            )}
            {booster_products.length !== 0 && (
              <Booster_pannel
                onRefresh={() => console.log("onRefresh")}
                items={cartCount}
                data={booster_products}
                store={store}
                title="Energize - Need a Booster"
              />
            )}
            {popular_items.length !== 0 && (
              <Product_types
                onRefresh={() => d_fetchData(0)}
                items={cartCount}
                data={popular_items}
                store={store}
                title={"Popular items"}
              />
            )}
          </View>
          <Modal
            visible={
              d_loading === LOADING_TYPES.LOADING ||
              d_loading === LOADING_TYPES.FETCHING_MORE
            }
            transparent={true}
          >
            <View style={[pallete.loader_View]}>
              <ActivityIndicator
                size={"large"}
                color={assets.Colors.WHITE}
                style={[pallete.loader]}
              />
            </View>
          </Modal>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default Home_Screen;
