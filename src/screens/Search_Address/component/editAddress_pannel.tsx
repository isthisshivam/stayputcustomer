import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import useStyle from "./componentStyles";
import { useNavigation } from "@react-navigation/native";
import assets from "../../../assets";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

const styles = useStyle();
export const EditAddrs_pannel = ({ Data, click }) => {
  const { navigate, goBack } = useNavigation();

  const Items = (item) => (
    <Pressable
      onPress={() => {
        click(item);
      }}
      style={styles.categories_content}
    >
      <View style={styles.icon_addrs}>
        <MaterialCommunityIcons
          name="map-marker-outline"
          color={assets.Colors.ACCOUNT_TXT_COLOR}
          size={25}
        />
        <View style={styles.address_content}>
          <Text style={styles.roadTxt}>{item.name}</Text>
          <Text style={styles.areaTxt}>{item.vicinity}</Text>
        </View>
      </View>
      <View></View>
    </Pressable>
  );
  return (
    <View style={styles.address_list}>
      <FlatList
        data={Data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => Items(item)}
      />
      <View style={styles.bottomStyle}>
        <Feather
          name="navigation"
          color={assets.Colors.ACCOUNT_TXT_COLOR}
          size={18}
        />
        <View style={styles.address_content}>
          <Text style={styles.currentLocation}>Don't see your address</Text>
          <Text
            onPress={() => [
              (global.fullAddressRoute = true),
              navigate(assets.NavigationConstants.FULL_DELIVERY_ADDRESS.NAME),
            ]}
            style={[
              styles.areaTxt,
              { color: assets.Colors.TERMS_CONDITION_COLOR },
            ]}
          >
            Enter your delivery address manually
          </Text>
        </View>
      </View>
    </View>
  );
};
