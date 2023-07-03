import React,{useState} from 'react';
import { View, Text, Pressable } from 'react-native';
import useStyle from './componentStyles';
import assets from '../../../assets';
import { dW } from '../../../utils/dynamicHeightWidth';

const styles = useStyle();

export const Price_pannel = ({ title, price, total }) => {
    return (
        <View>
            {total == false ?
                <View >
                    <View style={styles.subtotal_content}>
                        <Text style={[styles.msg, { color: assets.Colors.PRICE_DETAILS_CLR }]}>{title}</Text>
                        <Text style={styles.msg}>{price}</Text>
                    </View>
                </View> : <View>
                    <View style={[styles.subtotal_content, { paddingVertical: dW(20) }]}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.title}>{price}</Text>
                    </View>
                </View>
            }
        </View>
    )

}

export const Tip_pannel = ({ bg, tip, txtclr,clr }) => {
    return (
        <Pressable onPress={clr} style={[styles.tipContainer, { backgroundColor: bg }]}>
            <Text style={[styles.tipTXT, { color: txtclr }]}>{tip}</Text>
        </Pressable>

    )

}