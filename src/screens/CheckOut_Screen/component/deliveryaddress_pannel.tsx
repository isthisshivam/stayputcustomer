import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import useStyle from "./componentStyles";
import { useNavigation } from "@react-navigation/native";
import assets from "../../../assets";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Button from "../../../common_components/Button";
import { dW } from "../../../utils/dynamicHeightWidth";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
const styles = useStyle();
export const Delivery_pannel = ({ data, click, id, confirm, close }) => {
  const { navigate } = useNavigation();
  const [address, setAddress] = useState(id);
  return (
    <View style={styles.address_list}>
      {data.map((item) => {
        return (
          <View style={styles.delivery_content}>
            <View style={styles.icon_right}>
              <RadioButton labelHorizontal={true}>
                <RadioButtonInput
                  obj={{ label: "param1", value: 0 }}
                  isSelected={item.id === address}
                  onPress={() => {
                    setAddress(item.id);
                    click(item);
                  }}
                  borderWidth={1}
                  buttonInnerColor={assets.Colors.BUTTON_THEME_COLOR}
                  buttonOuterColor={"black"}
                  buttonSize={17}
                  buttonOuterSize={22}
                  buttonStyle={{}}
                />
              </RadioButton>
              <View style={styles.address_content}>
                <Text style={styles.roadTxt} numberOfLines={1}>
                  {item.address} {item?.apt} {item?.bussiness_name} {item?.city}
                </Text>

                <Text style={styles.areaTxt} numberOfLines={1}>
                  {item?.city} {item?.state} {item?.zip}
                </Text>
              </View>
            </View>
            <SimpleLineIcons
              name="pencil"
              color={assets.Colors.INPUT_TITLE_COLOR}
              size={dW(15)}
              style={{ marginRight: dW(5) }}
              onPress={() =>
                navigate(
                  assets.NavigationConstants.FULL_DELIVERY_ADDRESS.NAME,
                  {
                    addrs_id: item.id,
                    street_name: item.address,
                    City: item.city,
                    code: item.zip,
                    state: item.state,
                    lat: item.latitude,
                    lan: item.longitude,
                    apt: item.apt,
                    bussiness_name: item.bussiness_name,
                  }
                )
              }
            />
          </View>
        );
      })}
      <Text
        onPress={() => [
          close(),
          navigate(assets.NavigationConstants.CHANGE_LOCATION.NAME),
        ]}
        style={styles.addAddress}
      >
        Add address
      </Text>
      <Button
        imgBG={""}
        style={styles.address_list}
        event={confirm}
        bgcolor={assets.Colors.BUTTON_THEME_COLOR}
        image={false}
        img={""}
        title="Confirm address"
      />
    </View>
  );
};
