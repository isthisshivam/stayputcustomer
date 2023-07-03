import React, { useState, useEffect } from "react";
import { View, Text, Modal, Image, Pressable } from "react-native";
import useStyle from "./componentStyles";
import assets from "../../../assets";

import { dW } from "../../../utils/dynamicHeightWidth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const styles = useStyle();
export const Invite_friends = ({ visible, close, handelCopy }) => {
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
            { backgroundColor: assets.Colors.SECONDRY_CARDS_BG_COLOR },
          ]}
        >
          <View style={styles.modal_inner}>
            <Pressable
              onPress={close}
              style={[
                styles.cross,
                { backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR },
              ]}
            >
              <MaterialCommunityIcons
                name={"close"}
                color={assets.Colors.ACCOUNT_TXT_COLOR}
                size={dW(25)}
              />
            </Pressable>
            <View style={styles.contents}>
              <Text style={styles.invite_friends}>Invite Friends</Text>
              <Text style={styles.get_discount}>
                Get a {<Text style={styles.discount}>$30.00</Text>} discount
                when a new sign up is made with your referral code.
              </Text>
              <View style={styles.code_view}>
                <Text style={styles.code}>R7XC528VC</Text>
              </View>
              <Pressable
                onPress={() => [close(), handelCopy(`R7XC528VC`)]}
                style={{ alignSelf: "center" }}
              >
                <Text style={styles.copy}>Copy</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
