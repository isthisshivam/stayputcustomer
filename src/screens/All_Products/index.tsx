import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import useStyle from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import usePallete from "../../assets/Pallete";
import useRest from "../../Services/rest/api";
import { CALL_TYPES } from "../../Services/rest/api";
import assets from "../../assets";
import { LOADING_TYPES } from "../../Services/rest/api";
import Back_Header from "../../common_components/Back_Header";
import { CATEGORY_PRODUCTS } from "../../Services/ApiUrls";

import { dW } from "../../utils/dynamicHeightWidth";
import { dH } from "../../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import OrderItems from "../../common_components/Product_Pannel";
import No_Data_Fount from "../../common_components/No_Data_Found";
import NoInternetView from "../../common_components/NoInternetView";
var localProducts = [];
const All_Products = ({ route }) => {
  const orientation = dW > dH ? "LANDSCAPE" : "PORTRAIT";
  const pallete = usePallete();
  const styles = useStyle();

  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [fetchdata, setFetchdata] = useState(false);
  const categoryId = route?.params?.id;

  const products_payload = {
    category: categoryId,
    store: route?.params?.store,
    current_page: 1,
    search: search,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: CATEGORY_PRODUCTS,
    PAYLOAD: products_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    const categoryProd = data?.data;

    if (categoryProd) {
      setProductList(categoryProd?.products);
      if (localProducts.length == 0) {
        localProducts = categoryProd?.products;
      }
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    if (categoryId) {
      fetchData(0);
    }
  }, [categoryId]);

  const onRefresh = () => {
    setFetchdata(true);
    if (fetchData(0)) {
      setFetchdata(false);
    }
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
      const merged_list = [...productList, ...response?.data?.products];

      setProductList(merged_list);
    }
  };

  useEffect(() => {
    if (search) fetchData(0);
  }, [search]);
  const searchView = () => {
    return (
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
          }}
          name={search === "" ? "" : "close-outline"}
          color={assets.Colors.PRODUCT_DETAILS_INPUT_TXT_CLR}
          size={dW(22)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Back_Header
        icon={"angle-left"}
        location={false}
        title={`${route?.params?.category}`}
        subtitle=""
      />
      {searchView()}
      {error ? (
        <NoInternetView onRefresh={fetchData} />
      ) : productList.length != 0 ||
        loading === LOADING_TYPES.LOADING ||
        loading === LOADING_TYPES.FETCHING_MORE ? (
        <>
          <View style={styles.order_list}>
            <FlatList
              data={productList}
              numColumns={orientation == "LANDSCAPE" ? 2 : 2}
              showsVerticalScrollIndicator={false}
              refreshing={fetchdata}
              onRefresh={() => onRefresh()}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
              renderItem={({ item, index }) => (
                <OrderItems
                  onRefresh={() => onRefresh()}
                  Count={""}
                  item={item}
                  depot={route?.params?.store}
                />
              )}
            />
          </View>
        </>
      ) : (
        <No_Data_Fount />
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

export default All_Products;
