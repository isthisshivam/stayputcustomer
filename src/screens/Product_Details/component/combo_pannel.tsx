import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import useStyle from "./componentStyles";
import assets from "../../../assets";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const styles = useStyle();

export const Combo_pannel = ({ data, title }) => {
  const ComboItems = (item) => (
    <View style={styles.booster_container}>
      <Image source={{ uri: item.img }} style={styles.category_image} />
      <View style={styles.booster_Right}>
        <Text style={styles.booster_title}>{item.title}</Text>
        <Text style={styles.booster_title}>{item.type}</Text>
        <Text style={styles.booster_title}>{item.qty}</Text>
        <Text style={styles.booster_price}>{item.price}</Text>
      </View>
      <View
        style={[
          styles.booster_icon,
          { borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR },
        ]}
      >
        <MaterialCommunityIcons
          name="plus"
          color={assets.Colors.ACCOUNT_TXT_COLOR}
          size={18}
        />
      </View>
    </View>
  );
  return (
    <View style={styles.order_list}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => ComboItems(item)}
      />
    </View>
  );
};
