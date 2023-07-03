import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image } from "react-native";
import useStyle from "./componentStyles";

import Cart_Item from "./cart_item";
const styles = useStyle();
export const Cart_pannel = ({
  img,
  store,
  items,
  data,
  storeName,
  onRefresh,
}) => {
  return (
    <View style={styles.cart_list}>
      <View style={styles.store_content}>
        <View style={styles.rightContent}>
          <Image source={{ uri: img }} style={styles.store_icon} />
          <Text style={styles.store}>{storeName}</Text>
        </View>
        <Text style={styles.items}>{items}</Text>
      </View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        listKey={(item) => item.cart_pannel}
        renderItem={({ item, index }) => (
          <Cart_Item onRefresh={onRefresh} item={item} depot={store} />
        )}
      />
    </View>
  );
};
