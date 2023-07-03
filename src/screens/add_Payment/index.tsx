import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { showToastMessage } from "../../utils/utilities";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Back_Header from "../../common_components/Back_Header";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Billing_Address_pannel } from "./components/billing_address_pannel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  CREATE_CARD,
  CUSTOMER_DELIVERY_ADDRESSES,
} from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import {} from "../../utils/utilities";
import { LiteCreditCardInput } from "react-native-credit-card-input-view";
var billing = { address: "", zipcode: "", state: "", city: "" };

const addPayment = ({ route }) => {
  const pallete = usePallete();
  const { navigate, goBack, addListener } = useNavigation();
  const styles = useStyle();
  const [cardNumber, setCardNumber] = useState("");
  const [address, setAddress] = useState(false);
  const [cvv, setCvv] = useState("");
  const [exp_month, setExpMonth] = useState("");
  const [exp_year, setExpYear] = useState("");
  const [apt, setApt] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isCardDetailsValid, setCardDetailsValid] = useState(false);

  const payment_payload = {
    cardnumber: cardNumber.trim(),
    exp_month: exp_month,
    exp_year: exp_year,
    cvv: cvv.trim(),
    billing_address: billingAddress,
    apt: apt.trim(),
    billing_zip_code: zipCode.trim(),
  };

  const {
    data: b_data,
    loading: b_loading,
    error: b_error,
    fetchData: b_fetchData,
    responseCode: b_responseCode,
  } = useRest({
    URL: CUSTOMER_DELIVERY_ADDRESSES,
    CALL_TYPE: CALL_TYPES.GET,
    lazy: true,
  });
  useEffect(() => {
    const focusListener = addListener("focus", () => {
      b_fetchData(0);
    });
    return () => {
      focusListener;
    };
  }, [address]);

  useEffect(() => {
    if (b_data) {
      setDeliveryAddress(b_data?.data);
    }
  }, [b_data, b_error, b_responseCode]);

  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: CREATE_CARD,
    PAYLOAD: payment_payload,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  useEffect(() => {
    if (data?.status === 200) {
      if (data?.message === "Your card number is incorrect.") {
        null;
      } else if (data?.message === "Your card's expiration month is invalid.") {
        null;
      } else if (data?.message === "Your card's expiration year is invalid.") {
        null;
      } else if (data?.message === "Your card's security code is invalid.") {
        null;
      } else if (route?.params != undefined) {
        navigate(assets.NavigationConstants.PAYMENT_METHOD.NAME);
      } else {
        navigate(assets.NavigationConstants.CHECK_OUT_SCREEN.NAME);
      }
    }
    setTimeout(() => {
      showToastMessage(data?.message);
    }, 100);
  }, [data, error, responseCode]);

  const isValidCard_create = () => {
    if (!isCardDetailsValid) {
      showToastMessage("Please enter valid card details.");
      return false;
    } else if (!cardNumber) {
      showToastMessage("Please enter your card number.");
      return false;
    } else if (!exp_month) {
      showToastMessage("Please enter expiration date");
      return false;
    } else if (!cvv) {
      showToastMessage("Please enter card cvv number");
      return false;
    } else if (!billingAddress) {
      showToastMessage("Please select billing address.");
      return false;
    } else if (!zipCode) {
      showToastMessage("Please enter billing zip code.");
      return false;
    }
    return true;
  };

  const validCard_created = () => {
    if (isValidCard_create()) {
      fetchData(0);
      global.branchIo.logEvent("Save Payment Info", {
        customData: {
          anonymousid: global.UserId,
          screenURL: "Add_Payment",
        },
      });
    }
  };
  const getExpiryYear = (date) => {
    if (date.length == 5) {
      let dddd = date.split("/");
      if (dddd) {
        let yy = dddd[1];
        let mm = dddd[0];
        setExpYear(yy);
        tempMonth = mm;
      }
    }
  };

  const onChangeValue = (value) => {
    const { values, valid } = value;
    setCardDetailsValid(valid);
    setCvv(values?.cvc);
    setCardNumber(values?.number);
    if (values?.expiry) {
      let data = values?.expiry.split("/");
      let month = data[0];
      let year = data[1];
      setExpMonth(month);
      setExpYear(year);
    }
  };
  const getAddress = () => {
    if (billing.address) {
      return (
        billing.address +
        "\n" +
        billing.zipcode +
        " " +
        billing.city +
        " " +
        billing.state
      );
    } else {
      return "";
    }
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Back_Header
        icon={"angle-left"}
        location={false}
        title="Add payment"
        subtitle=""
      />
      <KeyboardAwareScrollView style={[pallete.screen_container]}>
        <Modal
          visible={
            loading === LOADING_TYPES.LOADING ||
            loading === LOADING_TYPES.FETCHING_MORE
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
        <View style={styles.parentView}>
          <View style={styles.mainContainer}>
            <LiteCreditCardInput
              onChange={onChangeValue}
              inputStyle={{
                height: 45,
                width: "100%",
                flex: 1,
                paddingHorizontal: dW(10),
                borderColor: assets.Colors.INPUT_BORDER_COLOR,
                borderWidth: dW(0.8),
                marginTop: dW(10),
                borderRadius: dW(3),
              }}
              autoFocus
            />

            <TouchableOpacity
              onPress={() => setAddress(!address)}
              style={styles.inputView}
            >
              <Text
                onPressIn={() => setAddress(!address)}
                style={styles.placehoder}
              >
                {billing.address != "" ? getAddress() : "Billing Address"}
              </Text>

              <EvilIcons
                onPress={() => setAddress(!address)}
                name="chevron-down"
                color={assets.Colors.BLACK_COLOR}
                size={30}
              />
            </TouchableOpacity>

            {address == false ? null : (
              <View>
                <Billing_Address_pannel
                  onAddNewAddClick={() => [
                    setDeliveryAddress([]),
                    setAddress(false),
                  ]}
                  onSelect={(item) => {
                    setBillingAddress(item.address);
                    setZipCode(item.zip);
                    setCity(item.city);
                    setState(item.state);
                    setAddress(false);
                    billing = {
                      city: item.city,
                      state: item.state,
                      address: item.address,
                      zipcode: item.zip,
                    };
                  }}
                  data={deliveryAddress}
                />
              </View>
            )}

            <View style={styles.inputView}>
              <TextInput
                placeholder={"Apt# (optional)"}
                value={apt}
                keyboardType="numeric"
                returnKeyType={"done"}
                onChangeText={(text) => setApt(text)}
                placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                style={styles.placehoder}
              />
            </View>
            <View style={styles.code}>
              <View style={styles.codeView}>
                <TextInput
                  placeholder={"Billing Zip Code"}
                  value={zipCode}
                  keyboardType="numeric"
                  returnKeyType={"done"}
                  onChangeText={(text) => setZipCode(text)}
                  placeholderTextColor={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                  style={styles.placehoder}
                />
              </View>
              <View style={styles.textView}>
                <Text style={styles.text}>{city}</Text>
                <Text style={styles.text}>{state}</Text>
              </View>
            </View>
            <Pressable
              disabled={cardNumber.length < 19 ? true : false}
              onPress={validCard_created}
              style={[
                styles.btnView,
                {
                  backgroundColor:
                    cardNumber.length < 19
                      ? assets.Colors.INACTIVE_STORE_BG_COLOR
                      : assets.Colors.BUTTON_THEME_COLOR,
                },
              ]}
            >
              <Text style={styles.btn}>Save</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default addPayment;
