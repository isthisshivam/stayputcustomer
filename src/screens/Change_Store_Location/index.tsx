import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Modal,
  ActivityIndicator,
  Pressable,
  Platform,
  AppState,
  TouchableOpacity,
  FlatList,
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import useStyle from "./style";
import { dW } from "../../utils/dynamicHeightWidth";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Feather from "react-native-vector-icons/Feather";
import usePallete from "../../assets/Pallete";
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import assets from "../../assets";
import Back_Header from "../../common_components/Back_Header";
import { LOCATION_ID } from "../../Storage/ApplicationStorage";
import { SaveData, GetData, showToastMessage } from "../../utils/utilities";
const ChangeStoreLocation = () => {
  const pallete = usePallete();
  const styles = useStyle();
  const navigation = useNavigation();
  const [store_location_id, setStoreLocationId] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      setStoreLocationId(global.location_id);
    }, [])
  );
  const saveLoctionId = async (location_id, location_name) => {
    global.location_id = location_id;
    let locationInfo = {
      location_name: location_name,
      location_id: location_id,
    };
    await SaveData(LOCATION_ID, JSON.stringify(locationInfo)).then(() => {
      navigation.goBack();
    });
  };

  const StoreLocationItems = (item) => {
    return (
      <View style={styles.categories_content}>
        <RadioButton labelHorizontal={true}>
          <RadioButtonInput
            obj={{ label: "param1", value: 0 }}
            isSelected={item.id === global.location_id}
            onPress={() => {
              setStoreLocationId(item.id);
              saveLoctionId(item.id, item.name);
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
            {item?.name}
          </Text>

          <Text style={styles.areaTxt} numberOfLines={1}>
            {item?.address}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Back_Header
        icon={"angle-left"}
        location={false}
        title="Store Location"
        subtitle=""
      />
      <ScrollView style={[pallete.screen_container]}>
        <FlatList
          data={global.store_locations}
          style={{ marginTop: 10 }}
          renderItem={({ item, index }) => StoreLocationItems(item)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default ChangeStoreLocation;
