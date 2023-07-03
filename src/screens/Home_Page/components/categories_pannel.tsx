import React from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import useStyle from './componentStyles';
import assets from '../../../assets';
const styles = useStyle();
export const Categories_pannel = ({ data,depot }) => {
    const { navigate } = useNavigation();
    const CategoryItems = (item) => (
        <Pressable onPress={() => navigate(assets.NavigationConstants.PRODUCT_LIST.NAME,{id:item.id,category:item.name,store:depot})} style={styles.categories_content}>
            <Image source={{ uri: item.image }}
                style={styles.category_image} />
            <Text numberOfLines={2} style={styles.category_Text}>{item.name}</Text>
        </Pressable>
    )
    return (
        <View style={styles.category_list}>
            <FlatList
                data={data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => CategoryItems(item)}
            />
        </View>

    )

}