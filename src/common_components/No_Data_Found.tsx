import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import assets from '../assets'
import { dW } from '../utils/dynamicHeightWidth';
import { useNavigation } from '@react-navigation/native';


export default ({message}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message || "No Data Found"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontFamily: assets.fonts.ROBOTO_MEDIUM,
        color: assets.Colors.ACCOUNT_TXT_COLOR,
        fontSize: dW(16)
    }

})