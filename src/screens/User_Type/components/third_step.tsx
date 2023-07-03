import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import assets from "../../../assets";
import { dW, windowWidth } from "../../../utils/dynamicHeightWidth";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { WhichDelivery } from "../../../utils/enums";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default ({ onSelect, schedule, title, date, time, prevPage }) => {
  const { navigate, goBack } = useNavigation();
  const [whicSelected, setWhichSelected] = useState(0);
  const [delivery_type, setDelivery_Type] = useState(0);

  const selectedSchedule = () => {
    setWhichSelected(WhichDelivery.SCHEDULE);
    navigate(assets.NavigationConstants.CALENDER_VIEW.NAME);
  };
  useFocusEffect(
    React.useCallback(() => {
      const focus = delivery_type;
      return () => focus;
    }, [])
  );

  return (
    <View style={styles.container}>
      <FontAwesome
        name={"angle-left"}
        color={assets.Colors.BLACK_COLOR}
        size={45}
        onPress={prevPage}
      />
      <Text style={styles.title}>{"When do you need \nyour delivery?"}</Text>
      <Text style={styles.subtitle}>(You can change this later)</Text>
      <Pressable
        style={styles.cardView}
        onPress={() => {
          setWhichSelected(WhichDelivery.IMMEDIATE),
            setDelivery_Type(WhichDelivery.IMMEDIATE),
            global.branchIo.logEvent("Standard Delivery Selected", {
              customData: {
                anonymousid: global.UserId,
                referrer: null,
                screenURL: "User_Type",
              },
            });
          global.branchIo.logEvent("Scheduled Delivery Speed Selected", {
            customData: {
              anonymousid: global.UserId,
              referrer: null,
              screenURL: "User_Type",
            },
          });
        }}
      >
        <View style={styles.logoView}>
          <RadioButton labelHorizontal={true}>
            <RadioButtonInput
              obj={{ label: "param1", value: 0 }}
              isSelected={whicSelected === WhichDelivery.IMMEDIATE}
              onPress={() => setWhichSelected(WhichDelivery.IMMEDIATE)}
              borderWidth={1}
              buttonInnerColor={assets.Colors.BUTTON_THEME_COLOR}
              buttonOuterColor={assets.Colors.ACCOUNT_TXT_COLOR}
              buttonSize={17}
              buttonOuterSize={25}
              buttonStyle={{}}
              buttonWrapStyle={{ marginLeft: dW(10) }}
            />
          </RadioButton>

          <FontAwesome
            name="bolt"
            color={assets.Colors.BUTTON_THEME_COLOR}
            size={dW(20)}
            style={{ marginLeft: dW(15), alignItems: "center" }}
          />
          <Text style={styles.depotText}>1~2hrs</Text>
        </View>
        <View>
          <Text style={styles.deliveryText}>Standard Delivery</Text>
        </View>
      </Pressable>
      {/* scheduled delivery selection */}
      <Pressable
        style={styles.cardView}
        onPress={() => {
          selectedSchedule();
          setDelivery_Type(WhichDelivery.SCHEDULE);
          global.branchIo.logEvent("Scheduled Delivery Selected", {
            customData: {
              anonymousid: global.UserId,
              referrer: null,
              screenURL: "User_Type",
            },
          });
          global.branchIo.logEvent("Scheduled Delivery Speed Selected", {
            customData: {
              anonymousid: global.UserId,
              referrer: null,
              screenURL: "User_Type",
            },
          });
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <View style={styles.logoView}>
            <RadioButton labelHorizontal={true}>
              {/*  You can set RadioButtonLabel before RadioButtonInput */}
              <RadioButtonInput
                obj={{ label: "param1", value: 0 }}
                // index={i}
                isSelected={whicSelected === WhichDelivery.SCHEDULE}
                onPress={() => {
                  setWhichSelected(WhichDelivery.SCHEDULE);
                  selectedSchedule();
                }}
                borderWidth={1}
                buttonInnerColor={assets.Colors.BUTTON_THEME_COLOR}
                buttonOuterColor={assets.Colors.ACCOUNT_TXT_COLOR}
                buttonSize={17}
                buttonOuterSize={27}
                buttonStyle={{}}
                buttonWrapStyle={{ marginLeft: dW(10) }}
              />
            </RadioButton>
            {date === undefined && (
              <View style={styles.logoView}>
                <FontAwesome
                  name="clock-o"
                  color={assets.Colors.THEME_COLOR_PRIMARY}
                  size={dW(25)}
                  style={{ marginLeft: dW(15), alignItems: "center" }}
                />
                <FontAwesome5
                  name="car"
                  color={assets.Colors.THEME_COLOR_PRIMARY}
                  size={dW(25)}
                  style={{ marginLeft: dW(8), alignItems: "center" }}
                />
              </View>
            )}

            {date !== undefined && (
              <Text style={styles.selected_schedule}>{title}</Text>
            )}
          </View>
          {date !== undefined && (
            <Text style={styles.timming}>
              {date}, {time}
            </Text>
          )}
        </View>
        <View>
          <Text style={styles.deliveryText}>Scheduled Delivery</Text>
          {date !== undefined && <Text style={styles.change}>Change</Text>}
        </View>
      </Pressable>

      <Pressable
        onPress={() =>
          whicSelected !== 0
            ? whicSelected === WhichDelivery.SCHEDULE
              ? date
                ? [
                    onSelect(whicSelected),
                    global.branchIo.logEvent("Select Delivery Option", {
                      customData: {
                        anonymousid: global.UserId,
                        referrer: null,
                        screenURL: "User_Type",
                      },
                    }),
                  ]
                : null
              : [
                  onSelect(whicSelected),
                  global.branchIo.logEvent("Select Delivery Option", {
                    customData: {
                      anonymousid: global.UserId,
                      referrer: null,
                      screenURL: "User_Type",
                    },
                  }),
                ]
            : null
        }
        style={
          whicSelected !== 0
            ? whicSelected === WhichDelivery.SCHEDULE
              ? date
                ? styles.btnView
                : styles.disable_btnView
              : styles.btnView
            : styles.disable_btnView
        }
      >
        <Text style={styles.btn}>Continue</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    //justifyContent: 'center',
    width: windowWidth(),
    padding: dW(15),
    marginTop: dW(20),
  },
  cardView: {
    flexDirection: "row",
    padding: dW(25),
    alignItem: "center",
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    marginTop: dW(20),
    shadowColor: assets.Colors.SHADOW_COLOR,
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderRadius: dW(6),
    justifyContent: "space-between",
    width: "100%",
    elevation: 5,
  },
  title: {
    fontSize: dW(30),
    textAlign: "center",
    marginTop: dW(40),
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    color: assets.Colors.ACCOUNT_TXT_COLOR,
  },
  subtitle: {
    marginTop: dW(15),
    fontSize: dW(18),
    color: assets.Colors.PLACEHOLDER_TEXT_COLOR,
    textAlign: "center",
    fontFamily: assets.fonts.ROBOTO_REGULAR,
  },
  logoStyle: {
    height: dW(50),
    width: dW(50),
    //alignSelf: 'center'
    //marginLeft: dW(15)
  },
  logoView: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    alignItem: "center",
  },
  depotText: {
    marginLeft: dW(5),
    fontSize: dW(18),
    color: assets.Colors.BUTTON_THEME_COLOR,
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
  },
  selected_schedule: {
    marginLeft: dW(15),
    fontSize: dW(15),
    color: assets.Colors.BUTTON_THEME_COLOR,
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
  },
  timming: {
    marginLeft: dW(25),
    fontSize: dW(15),
    color: assets.Colors.ACCOUNT_TXT_COLOR,
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    textAlign: "center",
  },
  change: {
    alignSelf: "flex-end",
    fontSize: dW(15),
    marginTop: dW(14),
    color: assets.Colors.BUTTON_THEME_COLOR,
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
    textAlign: "center",
  },
  deliveryText: {
    fontSize: dW(15),
    fontFamily: assets.fonts.ROBOTO_REGULAR,
    color: assets.Colors.ACCOUNT_TXT_COLOR,
  },
  btnView: {
    marginTop: dW(30),
    padding: dW(20),
    backgroundColor: assets.Colors.BUTTON_THEME_COLOR,
  },
  btn: {
    fontSize: dW(20),
    color: "white",
    textAlign: "center",
    fontFamily: assets.fonts.ROBOTO_BOLD,
  },
  disable_btnView: {
    marginTop: dW(30),
    padding: dW(20),
    backgroundColor: "silver",
  },
});
