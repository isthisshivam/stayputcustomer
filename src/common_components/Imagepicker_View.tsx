import React from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import assets from "../assets";
import { dW } from "../utils/dynamicHeightWidth";

export default ({ visible, setVisible, camera, gallery }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Add Photo!</Text>
          <View style={styles.thickBorder}></View>
          <Pressable
            onPress={() => {
              setVisible(false);
              camera();
            }}
          >
            <Text style={styles.subTitle}>Take Photo</Text>
            <View style={styles.thinBorder}></View>
          </Pressable>
          <Pressable
            onPress={() => {
              setVisible(false);
              gallery();
            }}
          >
            <Text style={styles.subTitle}>Choose from Gallery</Text>
            <View style={styles.thinBorder}></View>
          </Pressable>
          <Pressable onPress={() => setVisible(false)}>
            <Text style={styles.subTitle}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
    marginLeft: dW(30),
    marginRight: dW(30),
    borderRadius: dW(10),
  },
  title: {
    padding: dW(18),
    fontSize: dW(20),
    color: assets.Colors.BUTTON_THEME_COLOR,
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
  },
  thickBorder: {
    borderBottomWidth: dW(2),
    borderColor: assets.Colors.BUTTON_THEME_COLOR,
  },
  subTitle: {
    padding: dW(18),
    fontSize: dW(16),
    color: assets.Colors.ACCOUNT_TXT_COLOR,
    fontFamily: assets.fonts.ROBOTO_MEDIUM,
  },
  thinBorder: {
    borderBottomWidth: dW(1),
    borderColor: assets.Colors.INPUT_BORDER_COLOR,
  },
  bttns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bttnSpace: {
    marginTop: dW(50),
    width: dW(100),
    alignSelf: "center",
  },
});
