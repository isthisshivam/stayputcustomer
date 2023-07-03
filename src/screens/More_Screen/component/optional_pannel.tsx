import React from 'react';
import { View, Text, Pressable } from 'react-native';
import useStyle from './componentStyles';
import assets from '../../../assets'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const styles = useStyle();
export const Optional_pannel = ({ title, icon, OnClick,rightIconVisibility=true }) => {

    return (
        <Pressable style={styles.options_container} onPress={OnClick}>
            <View style={styles.left}>
                <MaterialCommunityIcons name={icon} color={assets.Colors.INPUT_HOLDER_TXT_COLOR} size={30} />
                <Text style={styles.title}>{title}</Text>
            </View>

               {rightIconVisibility && <EvilIcons name="chevron-right" color={assets.Colors.INPUT_HOLDER_TXT_COLOR} size={40} />}
           
        </Pressable>
    )

}