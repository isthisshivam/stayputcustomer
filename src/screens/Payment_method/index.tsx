import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Modal,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import assets from "../../assets";
import usePallete from "../../assets/Pallete";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import useStyle from "./style";
import Item from "./item/index";
import { Mode } from "../../utils/enums";
import Back_Header from "../../common_components/Back_Header";
import { CARD_LIST, CARD_DELETE } from "../../Services/ApiUrls";
import { useRest, CALL_TYPES, LOADING_TYPES } from "../../Services/rest/api";
import { ScrollView } from "react-native-virtualized-view";
import { showToastMessage } from "../../utils/utilities";
import NoInternetView from "../../common_components/NoInternetView";
const PaymentMethod = () => {
  const styles = useStyle();
  const pallete = usePallete();
  const { navigate, goBack } = useNavigation();
  const [mode, setMode] = useState(Mode.EDIT);
  const [selctedPayment, setSelectedPayment] = useState(0);
  const [cardList, setCardList] = useState([]);
  const [card_id, setCard_ID] = useState("");

  const delete_card = {
    card_id: card_id,
  };
  const { data, loading, error, fetchData, responseCode } = useRest({
    URL: CARD_LIST,
    PAYLOAD: {},
    CALL_TYPE: CALL_TYPES.POST,
    lazy: false,
  });
  const {
    data: d_data,
    loading: d_loading,
    error: d_error,
    fetchData: d_fetchData,
    responseCode: d_responseCode,
  } = useRest({
    URL: CARD_DELETE,
    PAYLOAD: delete_card,
    CALL_TYPE: CALL_TYPES.POST,
    lazy: true,
  });
  useEffect(() => {
    if (data) {
      setCardList(data?.data);
    }
  }, [data, error, responseCode]);

  useEffect(() => {
    if (d_data?.status === 200) {
      fetchData(0);
      setTimeout(() => {
        showToastMessage(d_data?.message);
      }, 100);
    }
  }, [d_data, d_error, d_responseCode]);

  useFocusEffect(
    React.useCallback(() => {
      const focus = fetchData(0);
      return () => focus;
    }, [])
  );

  useEffect(() => {
    if (card_id) d_fetchData(0);
  }, [card_id]);

  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Modal
        visible={
          loading === LOADING_TYPES.LOADING ||
          loading === LOADING_TYPES.FETCHING_MORE ||
          loading === LOADING_TYPES.REFRESHING ||
          d_loading === LOADING_TYPES.LOADING ||
          d_loading === LOADING_TYPES.FETCHING_MORE
        }
        transparent={true}
      >
        <View style={[pallete.loader_View]}>
          <ActivityIndicator
            size={"large"}
            color={assets.Colors.WHITE}
            style={[pallete.loader]}
          />
        </View>
      </Modal>
      <Back_Header
        location={false}
        title="Payment methods"
        icon={"angle-left"}
        subtitle=""
      />
      {error ? (
        <NoInternetView onRefresh={fetchData} />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={styles.creditCardView}>
              <Text style={styles.creditdebitView}>Credit or debit card</Text>
              {mode === Mode.EDIT ? (
                <EvilIcons
                  name="pencil"
                  color={assets.Colors.INPUT_HOLDER_TXT_COLOR}
                  size={30}
                  onPress={() => setMode(Mode.DELETE)}
                />
              ) : (
                <Pressable onPress={() => setMode(Mode.EDIT)}>
                  <Text style={styles.cancel}>Cancel</Text>
                </Pressable>
              )}
            </View>
            <View style={{ flex: 1, marginBottom: "20%" }}>
              <FlatList
                data={cardList}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                renderItem={({ item, index }) => {
                  return Item(
                    mode,
                    selctedPayment,
                    index,
                    setSelectedPayment,
                    item,
                    card_id,
                    setCard_ID
                  );
                }}
              />
              <Pressable
                style={styles.addcard}
                onPress={() =>
                  navigate(assets.NavigationConstants.ADD_PAYMENT.NAME, {
                    key: "card-list",
                  })
                }
              >
                <Text style={styles.addCardText}>Add new card</Text>
              </Pressable>
            </View>
          </ScrollView>
          <Pressable style={styles.btnView}>
            <Text style={styles.btn}>Save</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};
export default PaymentMethod;
