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

import usePallete from "../../assets/Pallete";

import assets from "../../assets";
import Back_Header from "../../common_components/Back_Header";
import { FAV_PRODUCTS } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";

import { dW } from "../../utils/dynamicHeightWidth";
import { dH } from "../../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import OrderItems from "../../common_components/Product_Pannel";
import No_Data_Fount from "../../common_components/No_Data_Found";
import NoInternetView from "../../common_components/NoInternetView";

const My_Favourite_Products = ({ route }) => {
  const orientation = dW > dH ? "LANDSCAPE" : "PORTRAIT";
  const pallete = usePallete();
  const styles = useStyle();

  const { navigate } = useNavigation();

  const [productList, setProductList] = useState([]);
  const [fetchdata, setFetchdata] = useState(false);

  const products_payload = {
    store: global.store_name,
    current_page: 1,
  };

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: FAV_PRODUCTS,
    PAYLOAD: products_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      const products = data?.data?.products;
      setProductList(products);
    }
  }, [data, error, responseCode]);

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
    fetchData(0);
  }, []);

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Back_Header
        icon={"angle-left"}
        location={false}
        title={`Products`}
        subtitle=""
      />

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
                  onRefresh={() => fetchData(0)}
                  onRefreshFav={() => true}
                  Count={""}
                  item={item}
                  depot={global.store_name}
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

export default My_Favourite_Products;
