import { StyleSheet } from 'react-native';
import { dW } from '../../../utils/dynamicHeightWidth';
import assets from '../../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            options_container: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: dW(10),
                marginTop: dW(20)
            },
            left: {
                flexDirection: 'row',
                alignItems: 'center'
            },

            title: {
                fontSize: dW(18),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                marginLeft: dW(20)
            },
            centeredView: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: assets.Colors.MODAL_BACKGROUND_COLOR,

            },
            modalView: {
                borderRadius: dW(8),
                width: '85%',
                alignItems: "center",
                justifyContent: 'center',
                padding: dW(10),
            },
            modal_inner: {
                backgroundColor: assets.Colors.SECONDRY_CARDS_BG_COLOR,
                width: '95%',
                alignItems: "center",
                borderColor: assets.Colors.TERMS_CONDITION_COLOR,
                borderWidth: dW(0.5),
                padding: dW(10),
                margin: dW(10)
            },
            cross: {
                alignSelf: 'flex-end',
                borderRadius: dW(25),
                padding: dW(5)
            },
            contents: {
                alignItems: "center",
                paddingVertical: dW(40)

            },
            invite_friends: {
                fontSize: dW(18),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                textAlign: 'center'
            },
            get_discount: {
                fontSize: dW(15),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.INPUT_TITLE_COLOR,
                textAlign: 'center',
                marginTop: dW(15)
            },
            discount: {
                fontSize: dW(15),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                color: assets.Colors.TERMS_CONDITION_COLOR,
                textAlign: 'center',
            },
            code_view: {
                backgroundColor: assets.Colors.BUTTON_THEME_COLOR,
                alignItems: "center",
                marginTop: dW(50)
            },
            code: {
                fontSize: dW(18),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                color: assets.Colors.WHITE,
                textAlign: 'center',
                paddingHorizontal: dW(25),
                paddingVertical: dW(15)
            },
            copy: {
                fontSize: dW(15),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                color: assets.Colors.TERMS_CONDITION_COLOR,
                textAlign: 'center',
                marginTop: dW(20)
            },
            urgent: {
                fontSize: dW(18),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                color: assets.Colors.SIGN_IN_COLOR,
                textAlign: 'center'
            },
            call: {
                alignSelf: 'center',
                padding: dW(20)
            },
            num: {
                fontSize: dW(18),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                textAlign: 'center',
                marginTop: dW(30),
                textDecorationLine: 'underline'
            }



        })
    )
}
export default useStyle;