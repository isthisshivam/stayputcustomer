import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import assets from '../assets'
import { dW } from '../utils/dynamicHeightWidth';
import SVG_View from './SVG_View';

export default ({ bgcolor, title, event, img, image, style, imgBG }) => {
    return (<View style={[{ backgroundColor: bgcolor, borderRadius: dW(5) }, style]}>
        { image == true ? <Pressable onPress={event} style={styles.bttn_style}>
            <View style={[styles.icon_Bg, { backgroundColor: imgBG }]}>
                <Image source={img} style={styles.bttn_icon} />
            </View>
            <Text style={styles.bttn_txt}>{title}</Text>
        </Pressable>
            :
            <Pressable onPress={event} style={styles.bttn_style}>
                <Text style={styles.bttn_txt}>{title}</Text>
            </Pressable>}
    </View>
    )
}

const styles = StyleSheet.create({
    bttn_style: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    icon_Bg: {
        alignSelf: 'center',
        marginRight: dW(15),
        borderRadius: dW(18),
        height: dW(35),
        width: dW(35),
        justifyContent: 'center',

    },
    bttn_icon: {
        height: dW(25),
        width: dW(25),
        resizeMode: 'contain',
        alignSelf: 'center',
        borderRadius: dW(15),
    },
    bttn_txt: {
        fontSize: dW(18),
        fontFamily: assets.fonts.ROBOTO_BOLD,
        alignSelf: 'center',
        color: assets.Colors.BACKGROUND_THEME_COLOR,
        paddingVertical: dW(15),
    }

})