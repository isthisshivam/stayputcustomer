import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  Animated,
  FlatList,
  StatusBar,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useStyle from "./style";
import usePallete from "../../assets/Pallete";
import { dW, windowWidth } from "../../utils/dynamicHeightWidth";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import FirstStep from "./components/first_step";
import SecondStep from "./components/second_step";
import ThirdStep from "./components/third_step";
import FourthStep from "./components/fourth_step";
import assets from "../../assets";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { CUSTOMER_UPDATE } from "../../Services/ApiUrls";
import { WhichDelivery } from "../../utils/enums";
import {
  SaveData,
  GetData,
  showToastMessage,
  validateEmail,
  resetStack,
} from "../../utils/utilities";
import { LOGIN_KEY } from "../../Storage/ApplicationStorage";
import { triggerPushNotification } from "../../utils/PushNotification";
global.date = null;
global.time = null;
const UserType = ({ route }) => {
  var scrollX = React.useRef(new Animated.Value(0)).current;
  const pallete = usePallete();
  const styles = useStyle();
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const value = route?.params;
  const address = route?.params;
  const [userAddrs, setUserAddrs] = useState("");
  const [addressPayload, setAddressPayload] = useState("");
  const [schedule, setSchedule] = useState(0);
  const [store, setStore] = useState("");
  const [userType, setUserType] = useState("");

  const [date, setDate] = useState(route?.params?.date);
  const [time, setTime] = useState(route?.params?.time);
  const [day, setDay] = useState("");

  const [Addr, setAddr] = useState("");
  const [lat, setLat] = useState("");
  const [lan, setLan] = useState("");
  const [isDone, setDone] = useState(false);
  const [finalAddress, setFinalAddress] = useState(null);

  useEffect(() => {
    triggerPushNotification(handleNotification);
  }, []);

  const handleNotification = (notification, way) => {
    const { data } = notification;

    if (way == 1) {
      navigateToSpecificRoute(data.action, data);
    } else {
    }
  };
  const navigateToSpecificRoute = (whereToGo, notificationData) => {
    const { runnerId, customerId, userName, orderId } = notificationData;
    resetStack(assets.NavigationConstants.STACKS.HOME_STACK, null, navigation);
    //#urgent Props
    setTimeout(() => {
      if (whereToGo == "Chatting")
        navigation.navigate(whereToGo, {
          runnerId: runnerId,
          customerId: customerId,
          orderId: orderId,
          userName: userName,
        });
      else if (whereToGo == "Order_Updates") {
        navigation.navigate(assets.NavigationConstants.ORDER_DETAILS.NAME, {
          order_id: orderId,
        });
      }
    }, 500);
  };
  useEffect(() => {
    if (route.params)
      if (route.params.date && route.params.time) {
        global.date = route.params.date;
        global.time = route.params.time;
      }
  });
  const UPDATE_PROFILE_PAYLOAD = {
    user_type: userType,
    address: {
      address: finalAddress?.address,
      city: finalAddress?.city,
      state: finalAddress?.state,
      zip: finalAddress?.zip,
      latitude: finalAddress?.latitude,
      longitude: finalAddress?.longitude,
    },
    schedule: {
      instant: schedule === WhichDelivery.IMMEDIATE,
      date: global.date ? global.date : "",
      time: global.time ? global.time : "",
    },
    store: store,
    is_completed: "1",
  };
  const UPDATE_ADDRESS_PAYLOAD = {
    address: {
      address: finalAddress?.address,
      city: finalAddress?.city,
      state: finalAddress?.state,
      zip: finalAddress?.zip,
      latitude: finalAddress?.latitude,
      longitude: finalAddress?.longitude,
    },
  };
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: CUSTOMER_UPDATE,
    PAYLOAD: global.isProfileCompleted
      ? UPDATE_ADDRESS_PAYLOAD
      : UPDATE_PROFILE_PAYLOAD,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });

  const SLIDER_DATA_SIGNUP = [
    <FirstStep
      onSelect={(type) => {
        setUserType(type);
        gotoNextPage();
      }}
    />,

    <ThirdStep
      schedule={schedule}
      title={day}
      date={date}
      time={time}
      onSelect={(type) => {
        setSchedule(type);
        gotoNextPage();
      }}
      prevPage={() => gotoPrevPage()}
    />,
    <FourthStep
      onSelect={(id) => {
        setStore(id);
        branchIoSelection(id);
        gotoNextPage();
      }}
      prevPage={() => gotoPrevPage()}
    />,
    <SecondStep
      isProfileCompleted={global.isProfileCompleted}
      addrs={userAddrs}
      full_add={addressPayload}
      onSelect={(addrs) => {
        [
          console.log(
            "ADDRESS SECOND STEP CALLBACK when not complete profile====",
            addrs
          ),

          setFinalAddress(addrs),
          setDone(true),
        ];
      }}
      prevPage={() => gotoPrevPage()}
    />,
  ];
  const SLIDER_DATA_HOME = [
    <SecondStep
      isProfileCompleted={global.isProfileCompleted}
      addrs={userAddrs}
      full_add={addressPayload}
      onSelect={(addrs) => {
        setFinalAddress(addrs);
        setDone(true);
      }}
      prevPage={() => gotoPrevPage()}
    />,
  ];
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const value = await GetData(LOGIN_KEY);

    if (value) {
      const userData = JSON.parse(value);
      const userAddress = userData?.address;
      delete userAddress["id"];

      setUserAddrs(userAddress);
      setFinalAddress(userAddress?.address);
      setAddressPayload(userAddress);
      setDone(true);
    }
  };

  useEffect(() => {
    if (finalAddress && isDone) {
      saveUserUpdateData();
    }
  }, [finalAddress]);

  useEffect(() => {}, [addressPayload]);

  const branchIoSelection = (item) => {
    if (item == 1) {
      global.branchIo.logEvent("Store Selected", {
        customData: {
          anonymousid: global.UserId,
          referrer: null,
          Store: "Home Depot",
          screenURL: "User_Type",
        },
      });
    } else if (item == 2) {
      global.branchIo.logEvent("Store Selected", {
        customData: {
          anonymousid: global.UserId,
          referrer: null,
          Store: "Lowes",
          screenURL: "User_Type",
        },
      });
    } else if (item == 3) {
      global.branchIo.logEvent("Store Selected", {
        customData: {
          anonymousid: global.UserId,
          referrer: null,
          Store: "Ace Hardware",
          screenURL: "User_Type",
        },
      });
    }
  };

  const saveUserUpdateData = async () => {
    fetchData(0);
  };

  useEffect(() => {
    if (address) {
      setUserAddrs(address.full_addr);
      setAddressPayload(address.address);
    }
  }, [address]);

  useEffect(() => {
    if (data) {
      showToastMessage(data?.message);
      navigateToHome(data);
    }
  }, [data]);

  useEffect(() => {
    if (value) {
      setDay(value.day);
      setTime(value.time);
      setDate(value.date);
    }
  }, [value]);

  const navigateToHome = async (data) => {
    const value = await GetData(LOGIN_KEY);
    const user_key = JSON.parse(value);
    user_key.is_completed = 1;
    address_data();

    await SaveData(LOGIN_KEY, JSON.stringify(data?.data));
    resetStack(assets.NavigationConstants.STACKS.HOME_STACK, null, navigation);
  };
  const address_data = async () => {
    const value = await GetData("location");

    if (value) {
      const location = JSON.parse(value);
      setAddr(location?.vicinity);
      setLat(location?.geometry?.location.lat);
      setLan(location?.geometry?.location.lan);
    }
  };

  const keyExtractor = React.useCallback((_, index) => index.toString(), []);
  const [activeIndex, setActiveIndex] = React.useState(0);
  let flatListRef = React.useRef(null);
  const gotoNextPage = () => {
    if (activeIndex + 1 < SLIDER_DATA_SIGNUP.length) {
      flatListRef.current.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };
  const gotoPrevPage = () => {
    if (!global.isProfileCompleted) {
      if (activeIndex - 1 < SLIDER_DATA_SIGNUP.length) {
        flatListRef.current.scrollToIndex({
          index: activeIndex - 1,
          animated: true,
        });
      }
    }
  };
  const onViewRef = React.useRef(({ viewableItems }: any) => {
    setActiveIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <View style={styles.parentView}>
        <Animated.FlatList
          ref={flatListRef}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          data={
            global.isProfileCompleted ? SLIDER_DATA_HOME : SLIDER_DATA_SIGNUP
          }
          renderItem={(item, index) => {
            return item.item;
          }}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          decelerationRate={"normal"}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
        />
        {!global.isProfileCompleted && (
          <View style={{ height: "15%" }}>
            <ExpandingDot
              data={SLIDER_DATA_SIGNUP}
              expandingDotWidth={30}
              scrollX={scrollX}
              inActiveDotOpacity={0.6}
              inActiveDotColor={"gray"}
              activeDotColor={assets.Colors.BLACK_COLOR}
              dotStyle={{
                width: dW(30),
                height: dW(10),

                borderRadius: dW(5),
                marginHorizontal: dW(5),
              }}
              containerStyle={{
                top: dW(30),
              }}
            />
          </View>
        )}
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
      </View>
    </SafeAreaView>
  );
};
export default UserType;
