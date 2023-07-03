import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';
const useStyle = () => {
    return (
        StyleSheet.create({

            scheduleTime_Txt: {
                fontSize: dW(16),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                color: assets.Colors.TERMS_CONDITION_COLOR,
                marginLeft: dW(10),
                textAlign: 'center',
            },
            cmnt: {
                fontSize: dW(14),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                textAlign: 'center',
            },
            setTime: {
                fontSize: dW(16),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                textAlign: 'center',
                marginLeft: dW(30),
            },

            items_container: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: dW(25),

            },
            rowright: {
                flexDirection: 'row',
                justifyContent: 'space-between',
            },
            items_column: {
                flexDirection: 'column',
                marginLeft: dW(15),
                marginRight:dW(45)
            },
            items_num: {
                fontSize: dW(18),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
            },

            store_icon: {
                height: dW(35),
                width: dW(35),
                borderRadius: dW(18),
                resizeMode: 'contain',
            },
            items_images: {
                marginTop: dW(5),
                flexDirection: 'row',
                alignItems: 'center',
            },
            image: {
                height: dW(60),
                width: dW(60),
                alignSelf: 'center',
                resizeMode: 'contain'
            },

            padding: {
                paddingVertical: dW(20)
            },
            tip_content: {
                marginTop: dW(10),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },

            msg: {
                fontSize: dW(14),
                paddingVertical: dW(5),
                alignSelf: 'center'
            },



            placeOrder: {
                marginLeft: dW(32),
                marginRight: dW(32),
                paddingVertical: dW(5),
            },
            centeredView: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: assets.Colors.MODAL_BACKGROUND_COLOR,
            },
            modalView: {
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
                borderRadius: dW(10),
                padding: dW(40),
                alignItems: "center",
            },
            modalText: {
                fontSize: dW(22),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_BOLD,
                textAlign: "center"
            },
            circle: {
                marginTop: dW(40),
                alignSelf: 'center'
            },
            other_tip:{
                marginTop: dW(5),
                flexDirection: 'row',
                justifyContent:'space-between',
                alignItems: 'center',
                flex:1
            },
            input_view: {
                marginTop: dW(10),
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: dW(0.8),
                borderColor: assets.Colors.INPUT_BORDER_COLOR,
                paddingStart: dW(12),
                paddingTop: dW(12),
                paddingBottom:dW(12),
                borderRadius: dW(5),
                flex:1,marginEnd:dW(10)
                // width: '70%'
            },
            placeHolder: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontSize: dW(16),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                marginLeft: dW(10),
              
            },
            add_tip:{
                color: assets.Colors.WHITE,
                fontSize: dW(16),
                paddingVertical:dW(15),
                paddingHorizontal:dW(12),
                fontFamily: assets.fonts.ROBOTO_BOLD,
                backgroundColor: assets.Colors.BUTTON_THEME_COLOR,
                marginTop: dW(10)
            }


        })
    )
}
export default useStyle;