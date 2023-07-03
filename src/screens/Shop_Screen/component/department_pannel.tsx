import React from "react";
import { View, Text, Image, FlatList, Pressable } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import useStyle from "./componentStyles";
import { dW } from "../../../utils/dynamicHeightWidth";
import { dH } from "../../../utils/dynamicHeightWidth";
import assets from "../../../assets";
const styles = useStyle();
const orientation = dW > dH ? "LANDSCAPE" : "PORTRAIT";
export const Department_pannel = ({
  data,
  title,
  depot,
  loadMoreData,
  renderFooter,
}) => {
  const { navigate } = useNavigation();
  const Items = (item) => (
    <Pressable
      onPress={() =>
        navigate(assets.NavigationConstants.PRODUCT_LIST.NAME, {
          id: item.id,
          category: item.name,
          store: depot,
        })
      }
      style={styles.categories_content}
    >
      <Image source={{ uri: item.image }} style={styles.category_image} />
      <Text numberOfLines={2} style={styles.category_Text}>
        {item.name}
      </Text>
    </Pressable>
  );
  return (
    <View style={styles.category_list}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        style={styles.list}
        numColumns={orientation == "LANDSCAPE" ? 2 : 2}
        data={data}
        listKey={(item) => item.department_pannel}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => Items(item)}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};
