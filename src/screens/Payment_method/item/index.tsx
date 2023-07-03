import React, { useState } from "react";
import { View, Text, Alert } from "react-native";

import useStyle from "./style";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { Mode, WhichDelivery } from "../../../utils/enums";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import assets from "../../../assets";

const item = (
  mode,
  selctedPayment,
  index,
  setSelectedPayment,
  item,
  card_id,
  setCard_ID
) => {
  const styles = useStyle();
  const remove = () => {
    Alert.alert("", "Do you want to delete this card?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setCard_ID(item.id);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <View style={styles.radiobtnContainer}>
          {mode === Mode.EDIT ? (
            <RadioButton labelHorizontal={true}>
              <RadioButtonInput
                obj={{ label: "param1", value: 0 }}
                isSelected={selctedPayment === index}
                onPress={() => setSelectedPayment(index)}
                borderWidth={1}
                buttonInnerColor={assets.Colors.THEME_COLOR_PRIMARY}
                buttonOuterColor={assets.Colors.THEME_COLOR_PRIMARY}
                buttonSize={17}
                buttonOuterSize={22}
                buttonStyle={{}}
              />
            </RadioButton>
          ) : (
            <FontAwesome
              name="minus-circle"
              color={assets.Colors.DELETE_ICON_COLOR}
              size={25}
              onPress={remove}
            />
          )}
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>{item.brand}</Text>
        </View>
        <Text style={styles.dot}>**** **** ****</Text>
        <Text style={styles.card}>{item.last4}</Text>
      </View>
    </View>
  );
};
export default item;
