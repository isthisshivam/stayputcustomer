import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import assets from '../assets'
import { dW } from '../utils/dynamicHeightWidth';
import { useNavigation } from '@react-navigation/native'
import SvgUri from 'react-native-svg-uri'; // SVG Package


interface Props {
    width?: string,
    height?: string,
    path: any
}
export default ({ width = "50", height = "50", path }: Props) => {
    return (
        <View >
            <SvgUri
                width={width}
                height={height}
                source={path}
            // source={{uri:'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg'}}
            />
        </View>
    )
}

