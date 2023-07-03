import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import useStyle from "./style";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import usePallete from "../../assets/Pallete";
import { ScrollView } from "react-native-virtualized-view";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";
import Back_Header from "../../common_components/Back_Header";
import { Common_pannel } from "./component/common_pannel";
import { Delivery_pannel } from "./component/deliveryaddress_pannel";
import {
  MobileNum_pannel,
  Scheduled_pannel,
} from "./component/mobileNum_pannel";
import { Payment_pannel } from "./component/payment_pannel";
import { Tip_pannel, Price_pannel } from "./component/priceDetails_pannel";
import Button from "../../common_components/Button";

import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { CHECK_OUT, CREATE_ORDER } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  SaveData,
  GetData,
  showToastMessage,
  resetStack,
} from "../../utils/utilities";
import NoInternetView from "../../common_components/NoInternetView";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";
import { Images } from "../../assets/image";

const Check_Out = ({ route }) => {
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const [deue, setDeue] = useState(null);
  const [address, setAddress] = useState(false);
  const [mobileNum, setMobileNum] = useState(false);
  const [card, setCard] = useState(false);
  const [popup, setPopup] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [store_img, setStoreImage] = useState(null);
  const [store, setStore] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [addressID, setAddressID] = useState("");
  const [addressTitle, setAddressTitle] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [locationSubHeading, setLoctionSubHeading] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [tipclr, setTipClr] = useState(null);
  const [tipPrice, setTipPrice] = useState(0);
  const [otherTip, setOtherTip] = useState(false);
  const [statndardDelivery, setStandardDelivery] = useState("1~2hrs");
  const [time, setTime] = useState("");
  const [scheduled_time, setScheduledTime] = useState(false);
  const [scheduled_icons, setSchedulesIcons] = useState(true);
  const [standard_time, setStandardTime] = useState(true);
  const [tip, setTip] = useState("");
  const [cardDigit, setCardDigit] = useState("");
  const [cardList, setCardList] = useState([]);
  const [cardId, setCardId] = useState("");
  const [cus_id, setCusID] = useState("");
  const [item_img, setItemImg] = useState([]);
  const [subTotal, setSubTotal] = useState("");
  const [delivery_fee, setDelivery_fee] = useState(0);
  const [orderTotalWeight, setOrderTotalWeight] = useState(0);
  const [orderTotalWidth, setOrderTotalWidth] = useState(0);
  const [orderTotalLength, setOrderTotalLength] = useState(0);
  const schedule_delivery = route?.params;

  const checkOut_payLoad = {
    store: store,
  };

  const {
    data: c_data,
    loading: c_loading,
    error: c_error,
    fetchData: c_fetchData,
    responseCode: c_responseCode,
  } = useRest({
    URL: CHECK_OUT,
    PAYLOAD: checkOut_payLoad,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  useEffect(() => {
    if (c_data) {
      var img = [];
      setDeliveryAddress(
        c_data?.data?.address ? c_data?.data?.address : deliveryAddress
      );
      if (c_data?.data?.address) {
        setDeue(c_data?.data?.address[0]);
      }
      setPhoneNum(c_data?.data?.phone ? c_data?.data?.phone : phoneNum);
      setCardList(c_data?.data?.cards);
      setDelivery_fee(c_data?.data?.delivery_fee);
      setOrderTotalLength(c_data?.data?.order_total_length);
      setOrderTotalWeight(c_data?.data?.order_total_weight);
      setOrderTotalWidth(c_data?.data?.order_total_widht);
      if (c_data?.data?.schedule?.date != "") {
        setStandardDelivery(c_data?.data?.schedule?.date);
        setTime(c_data?.data?.schedule?.time);
        setScheduledTime(true);
        setSchedulesIcons(false);
        setStandardTime(false);
      }
      if (c_data?.data?.cards.length !== 0) {
        setCardDigit(c_data?.data?.cards[0]?.last4);
        setCardId(c_data?.data?.cards[0]?.id);
        setCusID(c_data?.data?.cards[0]?.customer);
      }
      c_data?.data?.cartDetails?.items.map((item) => {
        img.push(item.images);
        setItemImg(img);
      });
      var subtotal = 0;
      for (let i = 0; i < c_data?.data?.cartDetails?.items.length; i++) {
        const removeChar = c_data?.data?.cartDetails?.items[i].price.replace(
          "$",
          ""
        );

        subtotal +=
          parseFloat(removeChar) * c_data?.data?.cartDetails?.items[i].qty;
      }
      setSubTotal(subtotal + "");
    }
  }, [c_data, c_error, c_responseCode, c_loading]);

  useEffect(() => {
    if (deue) {
      getLocationData();
    }
  }, [deue]);
  const Total =
    parseFloat(subTotal.replace("$", "")) +
    parseFloat(c_data?.data?.delivery_fee) +
    parseFloat(c_data?.data?.service_fee) +
    parseFloat(c_data?.data?.tax) +
    parseFloat(tipPrice);

  const order_payLoad = {
    store: store,
    delivery_fee: delivery_fee,
    delivery_tip: `$${tipPrice}`,
    tax: c_data?.data?.tax,
    service_fee: c_data?.data?.service_fee,
    total_price: `$${Total.toFixed(2)}`,
    schedule: `${statndardDelivery} ${time}`,
    delivery_address: addressID,
    card_id: cardId,
    stripe_customer_id: cus_id,
    phone_number: phoneNum,
    order_total_weight: orderTotalWeight,
    order_total_widht: orderTotalWidth,
    order_total_length: orderTotalLength,
  };
  const {
    data: o_data,
    loading: o_loading,
    error: o_error,
    fetchData: o_fetchData,
    responseCode: o_responseCode,
  } = useRest({
    URL: CREATE_ORDER,
    PAYLOAD: order_payLoad,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  useEffect(() => {
    if (o_data)
      if (o_data?.status == 200) {
        setPopup(true);
        setTimeout(() => {
          setPopup(false);
          goToOrder();
          showToastMessage(o_data?.message);
        }, 1000);
      }
  }, [o_data, o_error, o_responseCode]);

  useFocusEffect(
    React.useCallback(() => {
      const focus = getUserDetails();
      return () => focus;
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (store) {
        const focus = c_fetchData(0);
        return () => focus;
      }
    }, [store])
  );

  useEffect(() => {
    setTimeout(() => {
      if (schedule_delivery != undefined) {
        setStandardDelivery(schedule_delivery?.date);
        setTime(schedule_delivery?.time);
        setScheduledTime(true);
        setSchedulesIcons(false);
      } else if (schedule_delivery === undefined) {
        setStandardDelivery("1~2hrs");
        setTime("");
        setScheduledTime(false);
        setSchedulesIcons(true);
      }
    }, 1000);
  }, [schedule_delivery]);

  const getLocationData = async () => {
    const value = await GetData("location");
    if (value) {
      const location = JSON.parse(value);
      setAddressID(location.id);

      setAddressTitle(
        `${location?.address} ${location?.apt} ${location?.bussiness_name} ${location?.city}`
      );
      setCity(location.city);
      setZipCode(location.zip);
      setState(location?.state);
      setLoctionSubHeading(location?.apt + " " + location?.state);
    } else {
      setAddressID(deue?.id);
      setAddressTitle(
        deue?.address +
          ` ` +
          deue?.apt +
          ` ` +
          deue.bussiness_name +
          ` ` +
          deue.city
      );
      setCity(deue?.city);
      setZipCode(deue?.zip);
      setState(deue?.state);
    }
  };

  const getUserDetails = async () => {
    const login = await GetData(LOGIN_KEY);

    if (login) {
      const user = JSON.parse(login);
      setStore(user?.store);
      setStoreImage(user?.store_image);
    }
  };

  const goToOrder = () => {
    setTimeout(() => {
      navigate(assets.NavigationConstants.ORDER_SCREEN.NAME);
    }, 500);
  };

  const location = async (addr) => {
    await SaveData("location", JSON.stringify(addr));
    setAddress(false);
  };

  const other_tip = () => {
    if (!tip) {
      showToastMessage("Please enter tip.");
      setOtherTip(false);
    } else if (tip <= "0") {
      showToastMessage("this tip is not valid.");
      setOtherTip(false);
    } else {
      setTipPrice(parseFloat(tip));
      setOtherTip(false);
    }
  };

  const isValid_order = () => {
    if (!statndardDelivery) {
      showToastMessage("Please select delivery schedule.");
    } else if (standard_time === false && scheduled_time === false) {
      showToastMessage("Please select delivery schedule.");
    } else if (!phoneNum) {
      showToastMessage("Mobile number is required.");
    } else if (phoneNum.length !== 10) {
      showToastMessage(" Enter valid mobile number.");
    } else if (cardList.length === 0) {
      showToastMessage("Please add your payment card.");
    } else if (!cardId) {
      showToastMessage("Please select your payment card.");
    } else {
      o_fetchData(0);
      global.branchIo.logEvent("Place Order", {
        customData: {
          anonymousid: global?.UserId,
          "Order Amount": Total.toString(),
          Tax: c_data?.data?.tax.toString(),
          Tip: tipPrice.toString(),
          "email address": phoneNum.toString(),
          screenURL: "Checkout_Screen",
        },
      });
    }
  };

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Back_Header
        icon={"angle-left"}
        location={false}
        title="Check out"
        subtitle=""
      />
      {c_error ? (
        <NoInternetView onRefresh={() => c_fetchData(0)} />
      ) : (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={[pallete.screen_container]}
        >
          {address == false ? (
            <View>
              <Common_pannel
                icon1={"map-marker-outline"}
                icon={"arrow-down"}
                bottom={true}
                numberOfLines={2}
                event={() => setAddress(true)}
                title={addressTitle}
                subtitle={`${city} ${state} ${zipCode}`}
                subHeadingVisible={true}
                subHeading={locationSubHeading}
              />
            </View>
          ) : (
            <View>
              <Common_pannel
                icon1={"map-marker-outline"}
                icon={"arrow-up"}
                bottom={false}
                event={() => setAddress(false)}
                title="Delivery addresses"
                subtitle={""}
              />
              <Delivery_pannel
                confirm={() => [
                  setAddress(false),
                  global.branchIo.logEvent("Checkout Step 1", {
                    customData: {
                      anonymousid: global?.UserId,
                      Address: deliveryAddress,
                      screenURL: "Checkout_Screen",
                    },
                  }),
                ]}
                id={addressID}
                data={deliveryAddress}
                close={() => setAddress(false)}
                click={(item) => {
                  location(item);
                  setAddressTitle(
                    item.address +
                      ` ` +
                      item?.apt +
                      " " +
                      item?.bussiness_name +
                      ` ` +
                      item?.city
                  );

                  setAddressID(item.id);
                  setCity(item.state);
                  setZipCode(item.zip);
                  setLoctionSubHeading(item?.apt + " " + item?.bussiness_name);
                }}
              />
            </View>
          )}

          {!schedule && (
            <View>
              <Common_pannel
                icon1={"clock-time-four-outline"}
                icon={"arrow-down"}
                bottom={true}
                event={() => setSchedule(true)}
                title="Scheduled delivery"
                subtitle={`${statndardDelivery} ${time}`}
              />
            </View>
          )}
          {schedule && (
            <View>
              <Common_pannel
                icon1={"clock-time-four-outline"}
                icon={"arrow-up"}
                bottom={true}
                event={() => setSchedule(false)}
                title="Scheduled delivery"
                subtitle={`${statndardDelivery} ${time}`}
              />
              <Scheduled_pannel
                change1={() => {
                  setStandardTime(true);
                  setScheduledTime(false);
                  setStandardDelivery("1~2hrs");
                  setTime("");
                  setSchedulesIcons(true);
                }}
                change2={() => {
                  setStandardTime(false);
                  setScheduledTime(true);
                  setStandardDelivery("");
                  navigate(assets.NavigationConstants.CALENDER_VIEW.NAME, {
                    key: "change-schedule",
                  });
                }}
                icon1={standard_time}
                icon2={scheduled_time}
                bolt={scheduled_icons}
                title={statndardDelivery === "1~2hrs" ? "" : statndardDelivery}
              />
              <View style={styles.items_container}>
                <View style={styles.rowright}>
                  <View></View>
                  <Text style={styles.setTime}>{time}</Text>
                </View>
                <Pressable
                  onPress={() => [
                    navigate(assets.NavigationConstants.CALENDER_VIEW.NAME, {
                      key: "change-schedule",
                    }),
                    global.branchIo.logEvent("Checkout Step 2", {
                      customData: {
                        anonymousid: global?.UserId,
                        screenURL: "Checkout_Screen",
                      },
                    }),
                  ]}
                >
                  <Text style={styles.scheduleTime_Txt}>Change</Text>
                </Pressable>
              </View>
              <Button
                imgBG={""}
                style={{ marginTop: dW(40) }}
                event={() => [
                  global.branchIo.logEvent("Select Delivery Window", {
                    customData: {
                      anonymousid: global?.UserId,
                      screenURL: "Checkout_Screen",
                    },
                  }),
                  setSchedule(false),
                ]}
                bgcolor={assets.Colors.BUTTON_THEME_COLOR}
                image={false}
                img={""}
                title="Continue "
              />
            </View>
          )}

          {mobileNum == false ? (
            <View>
              <Common_pannel
                icon1={"cellphone"}
                icon={"arrow-down"}
                bottom={false}
                event={() => [
                  setMobileNum(true),
                  global.branchIo.logEvent("Add Mobile Number", {
                    customData: {
                      anonymousid: global?.UserId,
                      screenURL: "Checkout_Screen",
                    },
                  }),
                ]}
                title={phoneNum}
                subtitle=""
              />
            </View>
          ) : (
            <View>
              <Common_pannel
                icon1={"cellphone"}
                icon={"arrow-up"}
                bottom={false}
                event={() => {
                  phoneNum.length < 10 ? null : setMobileNum(false);
                }}
                title="Mobile number"
                subtitle={""}
              />
              <MobileNum_pannel
                num={phoneNum}
                bg={
                  phoneNum.length < 10
                    ? assets.Colors.INACTIVE_STORE_BG_COLOR
                    : assets.Colors.BUTTON_THEME_COLOR
                }
                change={(text) => setPhoneNum(text)}
                click={() => {
                  phoneNum.length < 10
                    ? null
                    : [
                        setMobileNum(false),
                        global.branchIo.logEvent("Add Mobile Number", {
                          customData: {
                            anonymousid: global?.UserId,
                            screenURL: "Checkout_Screen",
                          },
                        }),
                      ];
                }}
              />
            </View>
          )}

          {card == false ? (
            <View>
              <Common_pannel
                icon1={"credit-card-outline"}
                icon={"arrow-down"}
                bottom={false}
                event={() => setCard(true)}
                title={
                  cardList.length === 0
                    ? "Add your payment card"
                    : `**** - **** - **** - ${cardDigit}`
                }
                subtitle=""
              />
            </View>
          ) : (
            <View>
              <Common_pannel
                icon1={"credit-card-outline"}
                icon={"arrow-up"}
                bottom={false}
                event={() => setCard(false)}
                title="Credit or debit card"
                subtitle={""}
              />
              <Payment_pannel
                id={cardId}
                selected={(item) => {
                  setCardDigit(item.last4);
                  setCardId(item.id);
                  setCusID(item.customer);
                  setCard(false);
                }}
                data={cardList}
                click={() => [
                  setCard(false),
                  global.branchIo.logEvent("Checkout Step 3", {
                    customData: {
                      anonymousid: global?.UserId,
                      screenURL: "Checkout_Screen",
                    },
                  }),
                ]}
              />
            </View>
          )}
          <View style={styles.items_container}>
            <View style={styles.rowright}>
              <Image source={{ uri: store_img }} style={styles.store_icon} />
              <View style={styles.items_column}>
                <Text style={styles.items_num}>
                  {c_data?.data?.cartDetails?.cart_item_count}{" "}
                  {c_data?.data?.cartDetails?.cart_item_count === 1
                    ? "Item"
                    : "Items"}
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ flex: 1 }}
                >
                  <View style={styles.items_images}>
                    {item_img.map((img) => {
                      return (
                        <Image source={{ uri: img[0] }} style={styles.image} />
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
          <View style={styles.padding}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ height: 25, width: 25 }}
                source={Images.coin}
              ></Image>
              <View style={styles.items_column}>
                <Text
                  style={[
                    styles.items_num,
                    { color: assets.Colors.ACCOUNT_TXT_COLOR },
                  ]}
                >
                  Delivery Tip
                </Text>
                <Text
                  style={[
                    styles.msg,
                    { color: assets.Colors.INPUT_HOLDER_TXT_COLOR },
                  ]}
                >
                  100% of your Tip goes to the runner
                </Text>
              </View>
            </View>
            <View style={styles.tip_content}>
              {c_data?.data?.tip.map((item, index) => {
                return (
                  <Tip_pannel
                    clr={() => {
                      setTipClr(index);
                      setTipPrice(
                        (parseFloat(subTotal) * item.slice(0, -1)) / 100
                      );
                      if (index === 3) {
                        setTimeout(() => {
                          setOtherTip(!otherTip);
                        }, 100);
                        setTipPrice(0);
                      } else {
                        setOtherTip(false);
                        setTip("");
                        setTipPrice(
                          (parseFloat(subTotal) * item.slice(0, -1)) / 100
                        );
                      }
                    }}
                    bg={
                      tipclr === index
                        ? assets.Colors.ACTIVE_STORES_BG_COLOR
                        : assets.Colors.INACTIVE_STORE_BG_COLOR
                    }
                    tip={item}
                    txtclr={
                      tipclr === index
                        ? assets.Colors.BACKGROUND_THEME_COLOR
                        : assets.Colors.ACCOUNT_TXT_COLOR
                    }
                  />
                );
              })}
            </View>
            {otherTip === true ? (
              <View style={styles.other_tip}>
                <View style={styles.input_view}>
                  <TextInput
                    placeholder="Enter Tip Amount"
                    value={tip}
                    keyboardType="numeric"
                    returnKeyType={"done"}
                    onChangeText={(text) => setTip(text)}
                    placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                    style={[styles.placeHolder, { width: "90%" }]}
                  />
                </View>
                <Pressable onPress={other_tip}>
                  <Text style={styles.add_tip}>Add Tip</Text>
                </Pressable>
              </View>
            ) : null}
            <Text
              style={[styles.msg, { color: assets.Colors.INPUT_TITLE_COLOR }]}
            >
              You will receive a message when your runners arrives at the store.
              You will have 5 minutes from when the runner arrives at the store
              to add items to your order.
            </Text>
            <View>
              <Price_pannel
                title="Subtotal"
                price={`$${parseFloat(subTotal).toFixed(2)}`}
                total={false}
              />
              <Price_pannel
                title="Delivery Fee"
                price={`$${parseFloat(c_data?.data?.delivery_fee).toFixed(2)}`}
                total={false}
              />
              <Price_pannel
                title="Service Fee"
                price={`$${parseFloat(c_data?.data?.service_fee).toFixed(2)}`}
                total={false}
              />

              <FontAwesome5
                name="question-circle"
                color={assets.Colors.PRICE_DETAILS_CLR}
                size={dW(14)}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: "31%",
                  left: "26%",
                  alignSelf: "center",
                }}
              />
              <Price_pannel
                title="Est. Tax"
                price={`$${parseFloat(c_data?.data?.tax).toFixed(2)}`}
                total={false}
              />
              <Price_pannel
                title="Tip"
                price={"$" + `${tipPrice?.toFixed(2)}`}
                total={false}
              />
              <Price_pannel
                title="Total"
                price={`$${Total?.toFixed(2)}`}
                total={true}
              />
            </View>
          </View>
          <Modal
            visible={
              c_loading === LOADING_TYPES.LOADING ||
              c_loading === LOADING_TYPES.FETCHING_MORE ||
              o_loading === LOADING_TYPES.LOADING ||
              o_loading === LOADING_TYPES.FETCHING_MORE
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
        </KeyboardAwareScrollView>
      )}
      <Button
        imgBG={""}
        style={[styles.placeOrder, { marginBottom: 20 }]}
        event={isValid_order}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Place order"
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={popup}
        onRequestClose={() => {
          setPopup(!popup);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Payment successful</Text>
            <AntDesign
              name="checkcircleo"
              color={assets.Colors.BUTTON_THEME_COLOR}
              style={styles.circle}
              size={90}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default Check_Out;
