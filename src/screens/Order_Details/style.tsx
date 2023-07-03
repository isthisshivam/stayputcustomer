import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            mainContainer: {
                flex: 1,
                backgroundColor: assets.Colors.WHITE,
                marginBottom: dW(10)
            },
            close: {
                padding: dW(9),
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
                borderRadius: dW(22),
                position: 'absolute',
                zIndex: 1,
                top: '5%'
            },
            gps: {
                padding: dW(9),
                right: dW(20),
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
                borderRadius: dW(22),
                position: 'absolute',
                zIndex: 1,
                top: '11%'
            },
            mapView: {
                width: "100%",
                height: dW(300)
            },
            help: {
                fontSize: dW(15),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center',
                paddingHorizontal: dW(10),
                paddingVertical: dW(5)
            },
            map: {
                width: "100%",
                height: "100%",
            },
            marker: {
                height: dW(40),
                width: dW(40),
                resizeMode: 'contain',
                alignSelf: 'center'
            },
            priceView: {
                width: "100%",
                paddingHorizontal: dW(20),
                marginTop: dW(30),
            },

            recieved: {
                fontSize: dW(22),
                color: assets.Colors.SIGN_IN_COLOR,
                fontFamily: assets.fonts.ROBOTO_BOLD
            },
            deliveryfees: {
                fontSize: dW(17),
                marginTop: dW(10),
                fontFamily: assets.fonts.ROBOTO_LIGHT,
                color: assets.Colors.ACCOUNT_TXT_COLOR,
            },
            timing: {
                fontSize: dW(17),
                marginTop: dW(10),
                fontFamily: assets.fonts.ROBOTO_BOLD,
                color: assets.Colors.ACCOUNT_TXT_COLOR,
            },
            border: {
                borderBottomWidth: dW(0.6),
                marginLeft: dW(20),
                marginRight: dW(20),
                marginTop: dW(25),
                borderColor: assets.Colors.INPUT_HOLDER_TXT_COLOR
            },
            homeDepotText: {
                fontSize: dW(19),
                color: assets.Colors.BLACK_COLOR,
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                marginTop: dW(10),
                paddingHorizontal: dW(20)
            },
            ShoppingView: {
                width: "100%",
                flexDirection: 'column',
                // alignItems: 'center',
                paddingHorizontal: dW(20)
            },

            viewTxt: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_BOLD,
                color: assets.Colors.ACCOUNT_TXT_COLOR,
            },
            shopping: {
                width: "100%",
                flexDirection: 'row',
                alignItems: 'center'
            },
            ViewOrder: {
                width: "100%",
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: dW(10),
            },
            address: {
                justifyContent: 'flex-start',

            },
            right: {
                borderWidth: dW(0.8),
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
                borderColor: assets.Colors.ACCOUNT_TXT_COLOR,
                alignSelf: 'flex-end',
                borderRadius: dW(17),
                marginTop: dW(20),
                paddingVertical: dW(8),
                paddingHorizontal: dW(10),
            },
            btnView: {
                padding: dW(10),
                // backgroundColor: assets.Colors.BUTTON_COLOR,
                marginTop: dW(50),
                margin: dW(15),
                borderRadius: dW(7),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            },
            arrow: {
                backgroundColor: assets.Colors.BUTTON_THEME_COLOR,
                alignItems: 'center',
                borderRadius: dW(5),
                padding: dW(8)
            },
            slideToText: {
                fontSize: dW(20),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                color: assets.Colors.BLACK_COLOR
            },
            order: {
                fontSize: dW(15),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                width: dW(250)
            },
            netPrice: {
                fontSize: dW(15),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
            },
            addressText: {
                fontSize: dW(15),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                alignSelf: 'flex-start',
                marginTop: dW(10)
            },
            input_box:{
                paddingVertical: dW(10),
                borderWidth: dW(0.8),
                borderColor: assets.Colors.INPUT_BORDER_COLOR,
                borderRadius: dW(5),
                alignItems: 'center',
                width: '100%',
                height: dW(80),
                marginTop: dW(20)
            },
            placeholder: {
                fontSize: dW(13),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                width: '90%',

            }

        })
    )

}
export default useStyle;