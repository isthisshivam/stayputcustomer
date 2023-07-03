import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import assets from '../assets'
import { dW } from '../utils/dynamicHeightWidth';
import { useNavigation } from '@react-navigation/native'

export default ({ title, subtitle, style, edit, change, placeHolderColor, keyboard, type, secure }) => {
    return (<View style={[styles.input_view, style]}>
        <Text style={styles.input_title}>{title}</Text>
        <TextInput placeholder={subtitle} value={edit}
            placeholderTextColor={placeHolderColor || assets.Colors.INPUT_HOLDER_TXT_COLOR}
            style={styles.placeholder}
            keyboardType={keyboard || 'default'}
            returnKeyType={'done'}
            editable={type}
            secureTextEntry={secure}
            onChangeText={change} />
    </View>
    )
}
const styles = StyleSheet.create({
    input_view: {
        flexDirection: 'column',
        marginTop: dW(10),
        justifyContent: 'center',
        borderColor: assets.Colors.INPUT_BORDER_COLOR,
        width: '100%'
    },
    input_title: {
        fontSize: dW(14),
        fontFamily: assets.fonts.ROBOTO_REGULAR,
        color: assets.Colors.INPUT_TITLE_COLOR,
    },
    placeholder: {
        width: '100%',
        marginTop: dW(5),
        paddingVertical: dW(8),
        color: assets.Colors.BLACK_COLOR,
        borderColor: assets.Colors.INPUT_BORDER_COLOR,
        borderBottomWidth: dW(0.5),
        fontSize: dW(16),
        fontFamily: assets.fonts.ROBOTO_REGULAR
    }

})