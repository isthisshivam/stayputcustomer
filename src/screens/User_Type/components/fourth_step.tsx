import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import assets from "../../../assets";
import usePallete from "../../../assets/Pallete";
import { dW, windowWidth } from "../../../utils/dynamicHeightWidth";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { STORES_LIST } from "../../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../../Services/rest/api";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default ({ onSelect, prevPage }) => {
  const { navigate } = useNavigation();
  const pallete = usePallete();
  const [storeList, setStoreList] = useState([]);
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: STORES_LIST,
    CALL_TYPE: CALL_TYPES.GET,
    lazy: false,
  });
  useEffect(() => {
    if (data) {
      const stores = data.data;

      setStoreList(stores);
    }
  }, [data, error, responseCode]);

  useFocusEffect(
    React.useCallback(() => {
      const focus = fetchData(0);
      return () => focus;
    }, [])
  );
  const stores_list = (item) => {
    return (
      <Pressable onPress={() => onSelect(item.id)} style={styles.cardView}>
        <View style={styles.logoView}>
          <Image source={{ uri: item.image }} style={styles.logoStyle} />
          <Text style={styles.depotText}>
            {item.name == "Ace Hardware" ? "ACE Hardware" : item.name}
          </Text>
        </View>
        <View>
          <EvilIcons
            name="chevron-right"
            color={assets.Colors.ACCOUNT_TXT_COLOR}
            size={45}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FontAwesome
        name={"angle-left"}
        color={assets.Colors.BLACK_COLOR}
        size={45}
        onPress={prevPage}
      />
      <Text style={styles.title}>Select store</Text>
      <Text style={styles.subtitle}>You can always change stores later.</Text>
      <FlatList
        data={storeList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => stores_list(item)}
      />
      <Modal
        visible={
          loading === LOADING_TYPES.LOADING ||
          loading === LOADING_TYPES.FETCHING_MORE ||
          loading === LOADING_TYPES.REFRESHING
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",

    width: windowWidth(),
    marginTop: dW(20),
    padding: dW(15),
  },
  cardView: {
    flexDirection: "row",
    padding: dW(23),
    alignItems: "center",
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    marginTop: dW(30),
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
    height: dW(40),
    width: dW(50),
    resizeMode: "contain",
    alignSelf: "center",
  },
  logoView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  depotText: {
    marginLeft: dW(20),
    fontSize: dW(18),
    fontFamily: assets.fonts.ROBOTO_BOLD,
    color: assets.Colors.BLACK_COLOR,
  },
});
