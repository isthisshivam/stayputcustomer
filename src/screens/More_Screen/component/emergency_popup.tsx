import React, { useState, useEffect } from "react";
import { View, Text, Modal, Share, Linking, Pressable } from "react-native";
import useStyle from "./componentStyles";
import assets from "../../../assets";

import { dW } from "../../../utils/dynamicHeightWidth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EMERGENCY_NUM } from "../../../constants/ContactConstants";
const styles = useStyle();
export const Emergency_call = ({ visible, close }) => {
  const emegency_call = () => {
    Linking.openURL(`${EMERGENCY_NUM}`);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        close(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            { backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR },
          ]}
        >
          <Pressable
            onPress={close}
            style={[
              styles.cross,
              { backgroundColor: assets.Colors.SECONDRY_CARDS_BG_COLOR },
            ]}
          >
            <MaterialCommunityIcons
              name={"close"}
              color={assets.Colors.ACCOUNT_TXT_COLOR}
              size={dW(25)}
            />
          </Pressable>
          <View style={styles.contents}>
            <Text style={styles.urgent}>Urgent Contact</Text>
            <Text style={styles.get_discount}>
              If this is an emergency to your health or safety, please call 911.
            </Text>
            <Pressable
              onPress={emegency_call}
              style={[styles.code_view, { borderRadius: dW(40) }]}
            >
              <Ionicons
                name={"call-outline"}
                color={assets.Colors.WHITE}
                size={dW(30)}
                style={styles.call}
              />
            </Pressable>
            <Text style={styles.num}>(800) 745 0078</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
