import React from "react";
import { SafeAreaView, View, Text, TextInput, Pressable } from "react-native";
import useStyle from "./style";

import { useNavigation } from "@react-navigation/native";

import { dW } from "../../utils/dynamicHeightWidth";
import assets from "../../assets";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";
import { week } from "../../constants/AppConstants";
const Calender_view = ({ route }) => {
  const styles = useStyle();
  const { navigate, goBack } = useNavigation();

  const navigateWith_params = (date) => {
    if (route?.params?.key === "change-schedule") {
      navigate(assets.NavigationConstants.DELIVERY_SCHEDULE.NAME, {
        date_selected: moment(date.dateString).format("MM-DD-YYYY"),
      });
    } else {
      navigate(assets.NavigationConstants.USER_TYPE.TIME_SCHEDULE, {
        date_selected: moment(date.dateString).format("MM-DD-YYYY"),
      });
    }
  };

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.screen_bg}>
        <View style={styles.topView}>
          <View></View>
          <Text style={styles.title}>Availability</Text>
          <Pressable onPress={() => goBack()}>
            <Ionicons
              name="md-close-sharp"
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={35}
            />
          </Pressable>
        </View>
        <View style={styles.weekContainer}>
          {week.map((_day) => {
            return <Text style={styles.dayName}>{_day.day}</Text>;
          })}
        </View>
        <CalendarList
          onVisibleMonthsChange={(months) => {
            console.log("now these months are visible", months);
          }}
          hideDayNames={true}
          pastScrollRange={50}
          futureScrollRange={50}
          scrollEnabled={true}
          showScrollIndicator={true}
          style={{
            height: "90%",
            backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
          }}
          renderHeader={(date) => {
            const month = date.toDate();
            return (
              <Text style={styles.monthName}>
                {moment(month).format("MMMM YYYY")}
              </Text>
            );
          }}
          dayComponent={({ date, state }) => {
            var new_date = moment(date.dateString);
            var check = new_date.isBefore(new Date(), "day");

            return (
              <View style={{ height: dW(37), alignSelf: "center" }}>
                <Pressable
                  onPress={() => {
                    check ? null : navigateWith_params(date);
                  }}
                  style={[
                    styles.boxConatiner,
                    {
                      backgroundColor: check
                        ? "rgb(237,237,240)"
                        : assets.Colors.BUTTON_THEME_COLOR,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.date_container,
                      {
                        borderRadius: state === "today" ? dW(20) : null,
                        backgroundColor:
                          state === "today"
                            ? assets.Colors.CALENDER_BG_CLR
                            : null,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.date,
                        { color: check ? "rgb(130,133,141)" : "white" },
                      ]}
                    >
                      {date.day}
                    </Text>
                  </View>
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Calender_view;
