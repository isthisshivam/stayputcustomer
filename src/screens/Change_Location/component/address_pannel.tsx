import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import useStyle from "./componentStyles";
import { useNavigation } from "@react-navigation/native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import assets from "../../../assets";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Feather from "react-native-vector-icons/Feather";
import { dW } from "../../../utils/dynamicHeightWidth";
const styles = useStyle();
export const Addresses_pannel = ({ data, event, deliveryAddrs, id }) => {
  const { navigate, goBack } = useNavigation();
  const [address, setAddress] = useState(id);

  const Items = (item) => (
    <View style={styles.categories_content}>
      <RadioButton labelHorizontal={true}>
        <RadioButtonInput
          obj={{ label: "param1", value: 0 }}
          isSelected={item.id === address}
          onPress={() => {
            setAddress(item.id);
            deliveryAddrs(item), goBack();
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
        <Text style={styles.roadTxt} numberOfLines={2}>
          {item?.address} {item?.apt} {item?.bussiness_name}
        </Text>

        <Text style={styles.areaTxt} numberOfLines={1}>
          {item?.city} {item?.state} {item?.zip}
        </Text>
      </View>
      <Pressable
        onPress={() =>
          navigate(assets.NavigationConstants.FULL_DELIVERY_ADDRESS.NAME, {
            addrs_id: item.id,
            street_name: item.address,
            City: item.city,
            code: item.zip,
            state: item.state,
            lat: item.latitude,
            lan: item.longitude,
            apt: item.apt,
            bussiness_name: item.bussiness_name,
          })
        }
      >
        <SimpleLineIcons
          name="pencil"
          color={assets.Colors.INPUT_TITLE_COLOR}
          size={dW(15)}
          style={{ alignSelf: "center", marginRight: dW(6) }}
        />
      </Pressable>
    </View>
  );
  return (
    <View style={styles.address_list}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        listKey={(item) => item.delivery_pannel}
        renderItem={({ item }) => Items(item)}
      />
      <Pressable onPress={event} style={styles.bottomStyle}>
        <Feather
          name="navigation"
          color={assets.Colors.ACCOUNT_TXT_COLOR}
          size={20}
        />
        <Text style={styles.currentLocation}>Use current location</Text>
      </Pressable>
    </View>
  );
};
