import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';
const useStyle = () => {
    return (
        StyleSheet.create({
            scrollContainer: {
                flex: 1,
                padding: dW(25),
            },
            logo: {
                marginTop: dW(30),
                height: dW(120),
                width: dW(120),
                alignSelf: 'center',
                resizeMode: 'contain',
            },
            subtitle: {
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                fontSize: dW(17),
                color: assets.Colors.SUB_TITLE_COLOR,
                textAlign: 'center',
            },
            spaceTop: {
                marginTop: dW(30)
            },

            space_vertical: {
                paddingVertical: dW(10),

            },
            char: {
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                fontSize: dW(14),
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
            },
            forgot_Pass: {
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                fontSize: dW(14),
                color: assets.Colors.TERMS_CONDITION_COLOR,
                textAlign: 'center',
                marginTop: dW(20)
            },
            or: {
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                fontSize: dW(14),
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                textAlign: 'center',
                marginTop: dW(20)
            },

            icons: {
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: dW(10)
            },
            iconStyle: {
                height: dW(25),
                width: dW(25),
                alignSelf: 'center',
                resizeMode: 'contain',

            },
            icon_bg: {
                height: dW(45),
                width: dW(45),
                borderRadius: dW(30),
                justifyContent: 'center',
                margin: dW(10),
                borderWidth: dW(0.8),
                borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR
            },

            accnt: {
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                fontSize: dW(14),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                textAlign: 'center',
                marginTop: dW(30)
            },
            sign_up: {
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                fontSize: dW(14),
                color: assets.Colors.TERMS_CONDITION_COLOR,
                textAlign: 'center',
                marginTop: dW(30),
                textDecorationLine: 'underline'
            }

        })
    )
}
export default useStyle;