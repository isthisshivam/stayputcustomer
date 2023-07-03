import React, { useState } from "react";
import { View, Text, Image, FlatList, Pressable } from "react-native";
import useStyle from "./componentStyles";

import OrderItems from "../../../common_components/Product_Pannel";
const styles = useStyle();
export default ({ title, data, store, items, onRefresh }) => {
  return (
    <View style={styles.order_list}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <OrderItems
            onRefresh={onRefresh}
            Count={items}
            item={item}
            depot={store}
          />
        )}
      />
    </View>
  );
};
