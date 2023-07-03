import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  useWindowDimensions,
  Modal,
} from "react-native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { ScrollView } from "react-native-virtualized-view";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";
import Back_Header from "../../common_components/Back_Header";
import { Rating, AirbnbRating } from "react-native-ratings";
import HTMLView from "react-native-htmlview";
import { REVIEWS } from "../../Services/ApiUrls";
import { Tab, TabView } from "react-native-elements";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { FlatList } from "react-native-gesture-handler";

const About_Product = ({ route }) => {
  const pallete = usePallete();
  const styles = useStyle();

  const [reviews, setReviwes] = useState([]);
  const [fetchdata, setFetchdata] = useState(false);
  const [index, setIndex] = React.useState(route?.params?.index);

  const htmlContent = route?.params?.prod_desc;

  const product_detail_payload = {
    hd_id: 315775109,
    store: 1,
    current_page: 1,
  };
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: REVIEWS,
    PAYLOAD: product_detail_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  useEffect(() => {
    fetchData(0);
  }, []);

  useEffect(() => {
    if (data) {
      setReviwes(data?.data?.reviews);
    }
  }, [data, loading, error]);

  const onRefresh = () => {
    setFetchdata(true);
    if (fetchData(0)) {
      setFetchdata(false);
    }
  };
  const loadMoreData = async () => {
    if (
      parseInt(data?.data?.current_page) < parseInt(data?.data?.total_pages)
    ) {
      const currentPage = parseInt(data?.data?.current_page) + 1;

      const [response, setData] = await fetchData(currentPage);

      const merged_list = [...reviews, ...response?.data?.reviews];

      setReviwes(merged_list);
    }
  };
  const renderFooter = () => {
    return (
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

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Back_Header
        icon={"angle-left"}
        location={false}
        title="Product Details"
        subtitle=""
      />
      <Modal visible={loading === LOADING_TYPES.LOADING} transparent={true}>
        <View style={[pallete.loader_View]}>
          <ActivityIndicator
            size={"large"}
            color={assets.Colors.WHITE}
            style={[pallete.loader]}
          />
        </View>
      </Modal>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.screenContainer}
      >
        <View style={styles.product_Container}>
          <Image
            source={{ uri: route?.params?.prod_img }}
            style={styles.image}
          />
          <View style={styles.title_rating_column}>
            <View style={{ width: "90%" }}>
              <Text numberOfLines={2} style={styles.brand_title}>
                {route?.params?.prod_name}{" "}
                {
                  <Text
                    style={[
                      styles.brand_title,
                      { fontFamily: assets.fonts.ROBOTO_REGULAR },
                    ]}
                  ></Text>
                }
              </Text>
            </View>
            <View style={[styles.product_Container, { marginTop: dW(10) }]}>
              <Rating
                readonly={true}
                type="custom"
                ratingColor={assets.Colors.BUTTON_THEME_COLOR}
                ratingBackgroundColor={assets.Colors.BACKGROUND_THEME_COLOR}
                ratingCount={5}
                startingValue={route?.params?.prod_rating}
                imageSize={15}
              />
              <Text style={styles.ratingTxt}>{route?.params?.prod_rev}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabHeader}>
          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            disableIndicator={true}
            variant="default"
            style={{}}
          >
            <Tab.Item
              title="Overview"
              containerStyle={[
                styles.tab_BG,
                {
                  backgroundColor:
                    index === 0
                      ? assets.Colors.BUTTON_THEME_COLOR
                      : assets.Colors.INACTIVE_STORE_BG_COLOR,
                },
              ]}
              titleStyle={[
                styles.tab_title,
                {
                  color:
                    index === 0
                      ? assets.Colors.BACKGROUND_THEME_COLOR
                      : assets.Colors.PRICE_DETAILS_CLR,
                },
              ]}
              onPressOut={() => {
                setIndex(0);
              }}
            />
            <Tab.Item
              title="Specifications"
              containerStyle={[
                styles.tab_BG,
                {
                  backgroundColor:
                    index === 1
                      ? assets.Colors.BUTTON_THEME_COLOR
                      : assets.Colors.INACTIVE_STORE_BG_COLOR,
                },
              ]}
              titleStyle={[
                styles.tab_title,
                {
                  color:
                    index === 1
                      ? assets.Colors.BACKGROUND_THEME_COLOR
                      : assets.Colors.PRICE_DETAILS_CLR,
                },
              ]}
              onPressOut={() => {
                setIndex(1);
              }}
            />
            <Tab.Item
              title="Review"
              containerStyle={[
                styles.tab_BG,
                {
                  backgroundColor:
                    index === 2
                      ? assets.Colors.BUTTON_THEME_COLOR
                      : assets.Colors.INACTIVE_STORE_BG_COLOR,
                },
              ]}
              titleStyle={[
                styles.tab_title,
                {
                  color:
                    index === 2
                      ? assets.Colors.BACKGROUND_THEME_COLOR
                      : assets.Colors.PRICE_DETAILS_CLR,
                },
              ]}
              onPressOut={() => {
                setIndex(2);
              }}
            />
          </Tab>
        </View>

        {index == 0 && (
          <View style={styles.tabContainer}>
            <View style={styles.tabContainer}>
              <View
                style={[styles.model_sku_View, { flexDirection: "column" }]}
              >
                {route?.params?.prod_model && (
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text style={styles.bold_txt}>{"Model"}</Text>
                    <Text style={styles.normal_txt}>
                      {route?.params?.prod_model}
                    </Text>
                  </View>
                )}
                {route?.params?.prod_internet && (
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text style={styles.bold_txt}>{"Internet/Catalog"}</Text>
                    <Text style={styles.normal_txt}>
                      {route?.params?.prod_internet}
                    </Text>
                  </View>
                )}
                {route?.params?.prod_sku && (
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text style={styles.bold_txt}>{"Store SKU"}</Text>
                    <Text style={styles.normal_txt}>
                      {route?.params?.prod_sku}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.htmlContainer}>
                <HTMLView value={htmlContent} stylesheet={styles} />
              </View>
            </View>
          </View>
        )}

        {index == 1 && (
          <View>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                {route?.params?.extra != null ? (
                  route?.params?.extra
                    .filter((value) => Object.keys(value).length !== 0)
                    .map((item, index) => (
                      <View
                        style={
                          index % 2 === 0
                            ? styles.detailsBottom_rowContent
                            : [
                                styles.detailsBottom_rowContent,
                                {
                                  backgroundColor:
                                    assets.Colors.INACTIVE_STORE_BG_COLOR,
                                },
                              ]
                        }
                      >
                        <Text
                          style={[
                            styles.product_qntity,
                            { fontFamily: assets.fonts.ROBOTO_BOLD },
                          ]}
                        >
                          {item?.name} :{" "}
                        </Text>
                        <Text
                          style={[
                            styles.product_qntity,
                            { fontFamily: assets.fonts.ROBOTO_REGULAR },
                          ]}
                        >
                          {item?.value}
                        </Text>
                      </View>
                    ))
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      alignContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{ flex: 1, alignSelf: "center", marginTop: 150 }}
                    >
                      No Specifications Found
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        )}

        {index == 2 && (
          <View style={styles.htmlContainer}>
            <View style={styles.model_sku_View}>
              <FlatList
                data={reviews}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      backgroundColor: assets.Colors.CART_BORDER_CLR,
                      height: 2,
                      margin: 10,
                    }}
                  />
                )}
                renderItem={({ item, index }) => (
                  <View>
                    <Text style={[styles.normal_Txt, { fontWeight: "500" }]}>
                      {"Reviewed By: " + item?.review_by}
                    </Text>
                    <Text
                      style={[
                        styles.normal_Txt,
                        {
                          marginTop: 10,
                          fontSize: dW(13),
                          fontWeight: "300",
                        },
                      ]}
                    >
                      {item?.desc}
                    </Text>

                    {/* <Text
                      style={[
                        styles.normal_Txt,
                        { fontWeight: "300", marginTop: 10, fontSize: dW(10) },
                      ]}
                    >
                      {"Reviewed By: " + item?.review_by}
                    </Text>
                    <Text
                      style={[
                        styles.normal_Txt,
                        { fontWeight: "200", marginTop: 2, fontSize: dW(10) },
                      ]}
                    >
                      {item?.date}
                    </Text> */}
                  </View>
                )}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default About_Product;
