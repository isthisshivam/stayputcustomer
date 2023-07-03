import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  Modal,
  ActivityIndicator,
  Share,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { Booster_pannel } from "../Home_Page/components/booster_pannel";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import assets from "../../assets";
import { dW } from "../../utils/dynamicHeightWidth";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import Button from "../../common_components/Button";

import {
  PRODUCT_DETAILS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  MARK_AS_FAV,
} from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import HTMLView from "react-native-htmlview";
import { showToastMessage, GetData } from "../../utils/utilities";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  doRefreshAction,
  productDetailRefreshAction,
} from "../../redux/actions/RefeshCallbackActions";
import NoInternetView from "../../common_components/NoInternetView";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";
import GetLocation from "react-native-get-location";
import Geocoder from "react-native-geocoding";
const Product_Detail = ({ route }) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();
  const navigation = useNavigation();
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [rating, setRating] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);
  const [productName, setProductName] = useState("");
  const [rev_count, setRevCount] = useState("");
  const [inStock, setInstock] = useState("");
  const [cartCount, setCartCount] = useState(null);
  const [primaryImage, setPrimaryImage] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [booster_products, setBooster_products] = useState([]);
  const [internet, setInternet] = useState("");
  const [store_sku, setStoreSKU] = useState("");
  const [reviews, setReviews] = useState([]);
  const [Spcs_key, setSpacKeys] = useState([]);
  const [Spcs_value, setSpacValues] = useState([]);
  const [isCartUpdated, setCartUpdated] = useState(false);
  const [favourite, setFavourite] = useState("favourite");
  const [store_name, setStore_name] = useState("");
  const [storeList, setStoreList] = useState([]);
  const [category_name, setCategoryName] = useState("");

  const [plusPress, setPlusPress] = useState(false);
  const dispatch = useDispatch();
  const doRefreshStoreData = useSelector(
    (store) => store.RefreshCallbackReducer
  );

  const product_detail_payload = {
    id: route.params.prod_id,
    store: route?.params?.store,
  };

  const fav_product_payload = {
    product_id: route?.params?.prod_id,

    store: route?.params?.store,
  };

  const add_to_cart_payload = {
    product_id: route?.params?.prod_id,
    qty: count,
    store: route?.params?.store,
    store_location_id: global?.location_id,
    hd_id: route?.params?.hd_id,
  };
  const remove_cart = {
    id: route?.params?.prod_id,
    store: route?.params?.store,
  };

  const {
    data: r_data,
    loading: r_loading,
    error: r_error,
    fetchData: r_fetchData,
    responseCode: r_responseCode,
  } = useRest({
    URL: REMOVE_FROM_CART,
    PAYLOAD: remove_cart,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (r_data) {
      setIsRemoved(false);
      setTimeout(() => {
        showToastMessage(r_data?.message);
      }, 100);
      fetchData(0);
    }
  }, [r_data, r_error, r_responseCode]);

  const {
    data: f_data,
    loading: f_loading,
    error: f_error,
    fetchData: f_fetchData,
    responseCode: f_responseCode,
  } = useRest({
    URL: MARK_AS_FAV,
    PAYLOAD: fav_product_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: PRODUCT_DETAILS,
    PAYLOAD: product_detail_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const {
    data: c_data,
    loading: c_loading,
    error: c_error,
    fetchData: c_fetchData,
    responseCode: c_responseCode,
  } = useRest({
    URL: ADD_TO_CART,
    PAYLOAD: add_to_cart_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      if (doRefreshStoreData.product_detail_refresh) {
        fetchData(0);
        dispatch(productDetailRefreshAction(false));
      }
    });
    return () => {
      focus;
    };
  }, [doRefreshStoreData]);
  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      if (doRefreshStoreData.product_detail_refresh) {
        fetchData(0);
        dispatch(productDetailRefreshAction(false));
      }
    });
    return () => {
      focus;
    };
  }, []);

  "route?.params", route?.params;
  useEffect(() => {
    if (f_data) {
      setFavourite(f_data?.data?.status);
      dispatch(doRefreshAction(true));
      setTimeout(() => {
        showToastMessage(f_data?.message);
      }, 100);
    }
  }, [f_data, f_error, f_responseCode]);
  useEffect(() => {
    fetchData(0);
  }, [route.params.prod_id]);

  useEffect(() => {
    if (data) {
      const detail = data?.data;
      setDetails(detail);
      setCartCount(detail?.cart.cart_item_count);
      setProductName(detail?.product_name);
      setRating(detail?.rating);
      setRevCount(detail?.total_reviews_count);
      setImages(detail?.images);
      setPrice(detail?.price);
      setCount(details?.cart_count);
      setInstock(detail?.in_stock);
      setDescription(detail?.description);
      setModel(detail?.model);
      setInternet(detail?.internet);
      setStoreSKU(detail?.store_sku);
      setReviews(detail?.reviews);
      setBooster_products(details?.booster_products);
      setFavourite(detail?.favourite);
      setCategoryName(detail?.category_name);
      global.branchIo.logEvent("View Product Details", {
        customData: {
          anonymousid: detail?.id,
          referrer: null,
          "Product Name": detail?.product_name,
          "Product Price": detail?.price,
          screenURL: "Product_Details",
        },
      });
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    if (c_data) {
      fetchData(0);

      setTimeout(() => {
        showToastMessage(c_data?.message);
        setCartUpdated(false);
      }, 100);
    }
  }, [c_data, c_error, c_responseCode]);

  useEffect(() => {
    if (c_data && plusPress) {
      navigate(assets.NavigationConstants.MY_CART.NAME);
    }
  }, [plusPress]);

  useEffect(() => {
    if (count !== "0" && isCartUpdated) {
      c_fetchData(0);
    } else if (count === "0" && isRemoved) {
      r_fetchData(0);
    }
  }, [count]);

  const additem = () => {
    setCartUpdated(true);
    if (count == "0") {
      setCount(parseInt(count) + 1 + "");
    } else {
      setCount(count);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const focus = getData();
      return () => focus;
    }, [])
  );

  const getData = async () => {
    const login = await GetData(LOGIN_KEY);

    if (login) {
      const user_store = JSON.parse(login);
      setStore_name(user_store?.store_name);
    }
    const value = await GetData("location");
    const location = JSON.parse(value);

    if (location) {
      if (location?.vicinity) {
        setDeliveryAddress(location.vicinity);
      } else {
        setDeliveryAddress(location);
      }
    } else {
      setDeliveryAddress(global.customer_default_address);
    }

    setStoreList(global.storeList);
  };

  const goToDetailTabs = (index) => {
    navigate(assets.NavigationConstants.ABOUT_PRODUCT.NAME, {
      prod_name: productName,
      prod_rating: rating,
      prod_img: images && images[0],
      prod_model: model,
      prod_desc: description,
      prod_sku: store_sku ? store_sku : null,
      prod_internet: internet,
      prod_rev: rev_count,
      prod_review: reviews,
      index: index,
      prod_spec_key: Spcs_key,
      prod_spec_value: Spcs_value,
      extra: data?.data?.extra,
    });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: data?.data.product_name + " " + data?.data.product_url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result?.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const cartControl = () => {
    return (
      <>
        {count === "0" ? (
          <View style={{ flex: 0.5, alignSelf: "flex-start" }}></View>
        ) : (
          <View
            style={[
              styles.icon,
              styles.topMargin,
              {
                width: dW(102),
                alignSelf: "flex-start",
                flexDirection: "row",
                marginTop: dW(29),
                borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
              },
            ]}
          >
            <MaterialCommunityIcons
              onPress={() => {
                if (parseInt(count) === 1) {
                  setIsRemoved(true);
                  setCount("0");
                } else {
                  setCartUpdated(true);
                  setCount(parseInt(count) - 1 + "");
                }
              }}
              name={count == "1" ? "delete" : "minus"}
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={22}
            />
            <Text
              style={[styles.qty, { color: assets.Colors.ACCOUNT_TXT_COLOR }]}
            >
              {count}
            </Text>
            <MaterialCommunityIcons
              onPress={() => {
                setCartUpdated(true);
                setPlusPress(true);
                setCount(parseInt(count) + 1 + "");
              }}
              name="plus"
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={22}
            />
          </View>
        )}
      </>
    );
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Modal
        visible={
          loading === LOADING_TYPES.LOADING ||
          loading === LOADING_TYPES.FETCHING_MORE ||
          loading === LOADING_TYPES.REFRESHING ||
          c_loading === LOADING_TYPES.LOADING ||
          c_loading === LOADING_TYPES.FETCHING_MORE ||
          f_loading === LOADING_TYPES.LOADING ||
          f_loading === LOADING_TYPES.FETCHING_MORE ||
          r_loading === LOADING_TYPES.LOADING ||
          r_loading === LOADING_TYPES.FETCHING_MORE
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
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Pressable onPress={goBack}>
            <FontAwesome
              name={"angle-left"}
              color={assets.Colors.BLACK_COLOR}
              size={dW(40)}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              navigate(assets.NavigationConstants.CHANGE_LOCATION.NAME)
            }
            style={[styles.headerTxt_container, { marginLeft: dW(10) }]}
          >
            {deliveryAddress?.address ? (
              <Text
                numberOfLines={1}
                style={[styles.headerTxt, { marginLeft: dW(5), width: dW(70) }]}
              >
                {deliveryAddress?.address} {deliveryAddress?.apt}
                {deliveryAddress?.bussiness_name} {deliveryAddress?.city}
              </Text>
            ) : (
              <Text
                numberOfLines={1}
                style={[styles.headerTxt, { marginLeft: dW(5), width: dW(70) }]}
              >
                {deliveryAddress?.apt} {deliveryAddress?.bussiness_name}
                {deliveryAddress?.city} {deliveryAddress?.address}
              </Text>
            )}
          </Pressable>

          <SelectDropdown
            data={global.storeList}
            onSelect={(selectedItem, index) => {
              setStore_name(selectedItem.name);
            }}
            defaultButtonText={store_name}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
            renderDropdownIcon={() => {
              return (
                <FontAwesome5
                  name="caret-down"
                  color={assets.Colors.INPUT_TITLE_COLOR}
                  size={15}
                  style={{ marginLeft: dW(8) }}
                />
              );
            }}
            buttonStyle={styles.headerTxt_container_drop}
            buttonTextStyle={styles.headerTxt}
            dropdownStyle={styles.dropdown}
          />
          {/* add dropdown */}
        </View>
        <Pressable
          onPress={() =>
            navigate(assets.NavigationConstants.MY_CART.NAME, {
              storeID: route?.params?.store,
            })
          }
          style={styles.cart_container}
        >
          <FontAwesome5
            name="shopping-cart"
            color={assets.Colors.BACKGROUND_THEME_COLOR}
            size={16}
            style={{ alignSelf: "center" }}
          />
          {cartCount !== 0 && <Text style={styles.cartTxt}>{cartCount}</Text>}
        </Pressable>
      </View>
      <View style={{ paddingHorizontal: dW(20) }}>
        <View style={styles.input_view}>
          <Icon
            name="search"
            color={assets.Colors.PRODUCT_DETAILS_INPUT_TXT_CLR}
            size={20}
            style={{ marginLeft: dW(5) }}
          />
          <TextInput
            placeholder="Start searching for items"
            editable={false}
            onPressIn={() =>
              navigate(assets.NavigationConstants.PRODUCT_SEARCH.NAME)
            }
            placeholderTextColor={assets.Colors.Product_INPUT_HOLDER_TXT}
            style={styles.placeHolder}
          />
        </View>
      </View>
      {error ? (
        <NoInternetView onRefresh={fetchData} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <ScrollView horizontal={true} style={styles.horizontalScroll}>
            <View style={styles.productFlow}>
              <Text
                style={[
                  styles.txt,
                  {
                    color: assets.Colors.PRODUCT_FLOW_TXT,
                    paddingLeft: dW(5),
                    marginLeft: 10,
                  },
                ]}
              >
                {details?.category_name}
              </Text>
              <Icon
                name="chevron-right"
                color={assets.Colors.ACCOUNT_TXT_COLOR}
                size={dW(18)}
                style={{ paddingHorizontal: dW(8) }}
              />
              {/* <Text
                numberOfLines={1}
                style={[
                  styles.txt,
                  { color: assets.Colors.PRODUCT_FLOW_TXT, maxWidth: 150 },
                ]}
              >
                {category_name}
              </Text> */}
              {/* <Icon
                name="chevron-right"
                color={assets.Colors.ACCOUNT_TXT_COLOR}
                size={dW(18)}
                style={{ paddingHorizontal: dW(8) }}
              /> */}
              <Text
                style={[styles.txt, { color: assets.Colors.ACCOUNT_TXT_COLOR }]}
              >
                {details?.product_name}
              </Text>
            </View>
          </ScrollView>
          <View style={styles.topMargin}>
            <View style={styles.headerContainer}>
              <View style={{ width: "70%" }}>
                <Text style={styles.brand_title}>
                  {productName}
                  {
                    <Text
                      numberofLines={2}
                      style={[
                        styles.brand_title,
                        { fontFamily: assets.fonts.ROBOTO_REGULAR },
                      ]}
                    ></Text>
                  }
                </Text>
              </View>
              <Pressable onPress={onShare}>
                <Image source={assets.Images.SHARE_ICON} style={styles.share} />
              </Pressable>
              <Pressable onPress={() => f_fetchData(0)}>
                <Icon
                  name="heart"
                  color={
                    favourite === "1"
                      ? assets.Colors.THEME_COLOR_PRIMARY
                      : assets.Colors.ACCOUNT_TXT_COLOR
                  }
                  size={dW(25)}
                />
              </Pressable>
            </View>
            <View style={styles.ratingView}>
              <Rating
                readonly={true}
                type="custom"
                ratingColor={assets.Colors.BUTTON_THEME_COLOR}
                ratingBackgroundColor={assets.Colors.BACKGROUND_THEME_COLOR}
                ratingCount={5}
                startingValue={rating}
                imageSize={18}
                style={{}}
              />
              <Text style={styles.ratingTxt}>{rev_count}</Text>
            </View>
            <View style={styles.productImage_view}>
              <Image
                source={
                  primaryImage === ""
                    ? { uri: images[0] }
                    : { uri: primaryImage }
                }
                style={styles.image_style}
              />
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.horizontal_image}>
                {images.map((item) => {
                  return (
                    <Pressable onPress={() => setPrimaryImage(item)}>
                      <Image
                        source={{ uri: item }}
                        style={styles.images_style}
                      />
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
            <View style={[styles.headerContainer, styles.topMargin]}>
              <Text style={styles.product_price}>{price}</Text>
              {inStock === "1" ? (
                <View style={styles.headerLeft}>
                  <FontAwesome5
                    name="check"
                    color={assets.Colors.BUTTON_THEME_COLOR}
                    size={15}
                    style={{ marginRight: dW(8) }}
                  />
                  <Text style={styles.in_Stock}>In Stock</Text>
                  <View></View>
                </View>
              ) : (
                <Text style={styles.in_Stock}>Not in Stock</Text>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,

                marginLeft: 30,
              }}
            >
              {cartControl()}
              <Button
                imgBG={""}
                style={[
                  styles.topMargin,
                  styles.bttn,
                  styles.flex_end,
                  inStock !== "1" && { opacity: 0.3 },
                  ,
                ]}
                img={""}
                event={() => {
                  inStock === "1"
                    ? count == "0"
                      ? additem()
                      : navigate(assets.NavigationConstants.MY_CART.NAME)
                    : showToastMessage("Not in stock");
                }}
                title={"Add to Cart"}
                bgcolor={assets.Colors.ACTIVE_STORES_BG_COLOR}
                image={false}
              />
            </View>
          </View>
          <Pressable
            style={[styles.headerContainer, styles.topMargin]}
            onPress={() => goToDetailTabs(0)}
          >
            <Text style={styles.product_detail}>Product Details</Text>
            <Icon
              name="chevron-right"
              color={assets.Colors.BUTTON_THEME_COLOR}
              size={30}
            />
          </Pressable>
          <View style={styles.paddinghorizontal}>
            <View style={styles.productDetails_container}>
              {/* {description && <HTMLView value={description} />} */}
              <HTMLView value={description} />
              <View
                style={[styles.model_sku_View, { flexDirection: "column" }]}
              >
                {model != "" && model != null && (
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text style={styles.bold_txt}>{"Model"}</Text>
                    <Text style={styles.normal_txt}>{model}</Text>
                  </View>
                )}
                {internet != "" && internet != null && (
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text style={styles.bold_txt}>{"Internet/Catalog"}</Text>
                    <Text style={styles.normal_txt}>{internet}</Text>
                  </View>
                )}
                {store_sku != "" && store_sku != null && (
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text style={styles.bold_txt}>{"Store SKU"}</Text>
                    <Text style={styles.normal_txt}>{store_sku}</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.productDetails_container}>
              <Text style={styles.product_detail}>Specifications</Text>
              <View style={styles.topMargin}>
                {data?.data?.extra != null &&
                  data?.data?.extra?.slice(0, 6).map((item, index) => (
                    <View style={styles.detailsBottom_rowContent}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.product_details,
                          {
                            fontFamily: assets.fonts.ROBOTO_MEDIUM,
                            fontSize: dW(13),
                          },
                        ]}
                      >
                        {item?.name} :{" "}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.product_details,
                          {
                            fontFamily: assets.fonts.ROBOTO_REGULAR,
                            fontSize: dW(13),
                          },
                        ]}
                      >
                        {item?.value}
                      </Text>
                    </View>
                  ))}
                <Pressable
                  onPress={() => goToDetailTabs(1)}
                  style={styles.seeAll_spec}
                >
                  <Text
                    style={[
                      styles.product_details,
                      { color: assets.Colors.BUTTON_THEME_COLOR },
                    ]}
                  >
                    See All Specifications
                  </Text>
                  <Icon
                    name="chevron-right"
                    color={assets.Colors.BUTTON_THEME_COLOR}
                    size={25}
                  />
                </Pressable>
              </View>
            </View>
          </View>
          <Booster_pannel
            onRefresh={() => fetchData(0)}
            items={cartCount}
            data={booster_products}
            store={global.store_name}
            title="Energize - Need a Booster"
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
export default Product_Detail;
