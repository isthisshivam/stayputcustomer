import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  SafeAreaView,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import assets from "../../assets";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { dW } from "../../utils/dynamicHeightWidth";
import { SEARCH_PRODUCT } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { GetData } from "../../utils/utilities";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";
import { dH } from "../../utils/dynamicHeightWidth";
import OrderItems from "../../common_components/Product_Pannel";
import No_Data_Fount from "../../common_components/No_Data_Found";
import Back_Header from "../../common_components/Back_Header";
const Products_search = () => {
  const styles = useStyle();
  const pallete = usePallete();

  const orientation = dW > dH ? "LANDSCAPE" : "PORTRAIT";
  const [search, setSearch] = useState("");
  const [store, setStore] = useState("");
  const [productList, setProductList] = useState([]);
  const [fetchdata, setFetchdata] = useState(false);

  const orderlist_payLoad = {
    search: search.trim(),
    store: store,
    current_page: "1",
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: SEARCH_PRODUCT,
    PAYLOAD: orderlist_payLoad,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

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

      const merged_list = [...productList, ...response?.data?.products];

      setProductList(merged_list);
    }
  };
  useEffect(() => {
    if (data) {
      const products = data?.data.products;
      setProductList(products);
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    if (search)
      setTimeout(() => {
        global.branchIo.logEvent("Search Product", {
          customData: {
            anonymousid: global.UserId,
            referrer: null,
            Keywords: search,
            screenURL: "Search_Product",
          },
        });
        fetchData(0);
      }, 1200);
  }, [search]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const login = await GetData(LOGIN_KEY);
    if (login) {
      const user_store = JSON.parse(login);
      setStore(user_store?.store);
    }
  };
  const onRefresh = () => {
    setFetchdata(true);
    if (fetchData(0)) {
      setFetchdata(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Back_Header
        icon={"angle-left"}
        location={false}
        title="Search"
        subtitle=""
      />
      <Modal visible={loading === LOADING_TYPES.LOADING} transparent={true}>
        <ActivityIndicator
          size={"large"}
          color={assets.Colors.THEME_COLOR_PRIMARY}
          style={[pallete.loader]}
        />
      </Modal>
      <View style={styles.screen}>
        <View style={styles.search_input}>
          <Ionicons
            name="search-outline"
            color={assets.Colors.PRODUCT_DETAILS_INPUT_TXT_CLR}
            size={dW(20)}
          />
          <TextInput
            placeholder={"Search for products"}
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
            style={styles.placeHolder}
          />
          <Ionicons
            onPress={() => {
              setSearch("");
              setProductList([]);
            }}
            name={search === "" ? "" : "close-outline"}
            color={assets.Colors.PRODUCT_DETAILS_INPUT_TXT_CLR}
            size={dW(22)}
          />
        </View>

        {productList.length !== 0 ? (
          <View style={styles.order_list}>
            <FlatList
              data={productList}
              numColumns={orientation == "LANDSCAPE" ? 2 : 2}
              showsVerticalScrollIndicator={false}
              refreshing={fetchdata}
              onRefresh={() => onRefresh()}
              renderItem={({ item, index }) => (
                <OrderItems Count={""} item={item} depot={store} />
              )}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
            />
          </View>
        ) : (
          <View style={{ flex: 1, marginTop: dW(20) }}>
            <No_Data_Fount
              message={
                search === "" ? "Search for products" : "No products found"
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Products_search;
