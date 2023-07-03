import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from "react-native";
import assets from "../../assets";
import { dW, windowWidth } from "../../utils/dynamicHeightWidth";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { SCHEDULE_URL, CUSTOMER_UPDATE } from "../../Services/ApiUrls";

import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import usePallete from "../../assets/Pallete";

const Schedule = ({
  route: {
    params: { date_selected },
  },
}) => {
  const pallete = usePallete();
  const { navigate, goBack } = useNavigation();
  const [daySelected, setDaySelected] = useState(0);
  const [timeSelected, setTimeSelected] = useState(0);
  const [day, setDay] = useState("");

  const [date, setDate] = useState(date_selected);
  const [dayData, setDayData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [ref, setRef] = useState(null);

  const PAYLOAD = {
    date: date,
  };
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: SCHEDULE_URL,
    CALL_TYPE: CALL_TYPES.POST,
    PAYLOAD: PAYLOAD,
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      const schedule: [] = data.data.days;
      const timeSlotAll = data.data.time_slot_all;
      const timeSlot = data.data.time_slot;
      const existense = schedule.findIndex(
        (item) => item.date === date_selected
      );
      if (existense == 0) {
        setTimeData(timeSlot);
      } else {
        setTimeData(timeSlotAll);
      }
      setDaySelected(existense === -1 ? 0 : existense);
      setDayData(schedule);
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    if (dayData) {
      try {
        setTimeout(() => ref?.scrollToIndex({ index: daySelected }), 500);
      } catch (e) {
        console.log("Schedule Error===", e);
      }
    }
  }, [dayData]);

  useEffect(() => {
    fetchData(0);
  }, [date]);

  const dayItem = ({ item, index }) => {
    return (
      <Pressable
        style={[
          styles.listCardView,
          index === daySelected && {
            backgroundColor: assets.Colors.THEME_COLOR_PRIMARY,
          },
        ]}
        onPress={() => {
          setDaySelected(index), setDay(item.day), setDate(item.date);
        }}
      >
        <Text
          style={[
            styles.daysname,
            index === daySelected && {
              color: assets.Colors.BACKGROUND_THEME_COLOR,
            },
          ]}
        >
          {item.day}
        </Text>
        <Text
          style={[
            styles.numberText,
            index === daySelected && {
              color: assets.Colors.BACKGROUND_THEME_COLOR,
            },
          ]}
        >
          {item.date}
        </Text>
      </Pressable>
    );
  };

  const timeItem = ({ item, index }) => (
    <Pressable
      style={[styles.listColumnView]}
      onPress={() => {
        setTimeSelected(index),
          navigate(assets.NavigationConstants.CHECK_OUT_SCREEN.NAME, {
            day: day,
            date: date,
            time: item.time,
          });
      }}
    >
      <View style={styles.timeschedule}>
        <RadioButton labelHorizontal={true}>
          <RadioButtonInput
            obj={{ label: "param1", value: 0 }}
            isSelected={item.id === timeSelected}
            onPress={() => {
              setTimeSelected(index),
                navigate(assets.NavigationConstants.CHECK_OUT_SCREEN.NAME, {
                  day: day,
                  date: date,
                  time: item.time,
                });
            }}
            borderWidth={1}
            buttonInnerColor={assets.Colors.BUTTON_THEME_COLOR}
            buttonOuterColor={assets.Colors.ACCOUNT_TXT_COLOR}
            buttonSize={17}
            buttonOuterSize={22}
            buttonStyle={{}}
            buttonWrapStyle={{ marginLeft: 10 }}
          />
        </RadioButton>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.price}>{item.price}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.bg}>
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
      <View style={styles.screen_bg}>
        <View style={styles.headerView}>
          <EvilIcons
            name="chevron-left"
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={45}
            onPress={goBack}
          />
          <Text style={styles.headerText}>Schedule</Text>
          <View></View>
        </View>

        <View style={styles.flatlistRowView}>
          <FlatList
            ref={(ref) => {
              setRef(ref);
            }}
            data={dayData}
            horizontal={true}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 700));
              wait.then(() => {
                ref.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              });
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => dayItem({ item, index })}
          />
        </View>
        <View style={styles.flatlistColumnView}>
          <FlatList
            data={timeData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => timeItem({ item, index })}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: assets.Colors.SHADOW_COLOR,
  },
  screen_bg: {
    flex: 1,
    marginTop: dW(20),
    borderTopRightRadius: dW(14),
    borderTopLeftRadius: dW(14),
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
  },
  headerView: {
    width: "100%",
    padding: dW(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: dW(15),
  },
  headerText: {
    fontSize: dW(25),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.ACCOUNT_TXT_COLOR,
  },
  flatlistRowView: {
    width: "100%",
    flexDirection: "row",
    marginTop: dW(15),
    marginLeft: dW(20),
  },
  listCardView: {
    marginHorizontal: dW(5),
    backgroundColor: assets.Colors.SECONDRY_CARDS_BG_COLOR,
    padding: dW(18),
    borderRadius: dW(5),
    position: "relative",
    alignItems: "center",
  },
  daysname: {
    fontSize: dW(17),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.THEME_COLOR_PRIMARY,
  },
  numberText: {
    fontSize: dW(15),
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    marginTop: dW(5),
    textAlign: "center",
    color: assets.Colors.THEME_COLOR_PRIMARY,
  },
  flatlistColumnView: {
    flexDirection: "column",
    marginTop: dW(20),
    width: "100%",
    height: "100%",
    paddingHorizontal: dW(12),
    flex: 1,
  },
  listColumnView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    //marginTop:dW(15),
    padding: dW(10),
    alignItems: "center",
  },
  timeschedule: {
    flexDirection: "row",
  },
  time: {
    marginLeft: dW(10),
    fontSize: dW(17),
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    color: assets.Colors.ACCOUNT_TXT_COLOR,
  },
  price: {
    fontSize: dW(17),
    color: assets.Colors.BUTTON_THEME_COLOR,
    fontFamily: assets.fonts.ROBOTO_REGULAR,
  },
});
