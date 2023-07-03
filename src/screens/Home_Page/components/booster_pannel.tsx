import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import useStyle from "./componentStyles";

import BoosterItems from "../../../common_components/Booster_Products";
const styles = useStyle();

export const Booster_pannel = ({ data, title, onRefresh, items, store }) => {
  return (
    <View style={styles.order_list}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <BoosterItems
            onRefresh={() => onRefresh()}
            Count={items}
            item={item}
            depot={store}
          ></BoosterItems>
        )}
      />
    </View>
  );
};
