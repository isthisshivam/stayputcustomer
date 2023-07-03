import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import assets from '../../../assets'
import { dW } from '../../../utils/dynamicHeightWidth';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default () => {
    const { goBack } = useNavigation()
    return (
        <View style={styles.header}>
            <Pressable onPress={goBack} >
                <Ionicons name={"arrow-back"} color={assets.Colors.BLACK_COLOR} size={dW(28)} />
            </Pressable>
            <Text style={styles.title}>Help</Text>
            <FontAwesome name={"question-circle-o"} color={assets.Colors.BLACK_COLOR} size={dW(22)} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: dW(18),
        backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
        shadowColor: assets.Colors.SEARCH_SHADOW_COLOR,
        shadowOffset: {
            width: dW(0),
            height: dW(8),
        },
        shadowRadius: dW(5),
        shadowOpacity: dW(0.6),
        elevation: 5,


    },
    title: {
        textAlign: 'center',
        fontSize: dW(18),
        color: assets.Colors.ACCOUNT_TXT_COLOR,
        fontFamily: assets.fonts.ROBOTO_MEDIUM,

    },


})