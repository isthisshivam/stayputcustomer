import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            container: {
                flexDirection: 'column',
                // justifyContent: 'center',
                // width: windowWidth(),
                flex: 1,
                marginTop: dW(20),
                padding: dW(20)
            },
            headerView: {
                width: "100%",
                //padding:dW(10),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: dW(50)
            },
            headerText: {
                fontSize: dW(23),
                fontFamily: assets.fonts.ROBOTO_MEDIUM
            },
            creditCardView: {
                width: "100%",
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: dW(40),
                paddingRight: dW(20),
                marginLeft: dW(10),
                paddingHorizontal: dW(10)
            },
            creditdebitView: {
                fontSize: dW(16),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                marginBottom: dW(10),
                color: assets.Colors.ACCOUNT_TXT_COLOR
            },
            text: {
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                marginLeft: dW(8)
            },
            cancel: {
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: dW(15),
                fontSize: dW(15)
            },
            addcard: {
                width: "100%",
                //  backgroundColor:'red',
                padding: dW(15),
                alignItems: 'flex-end'
            },
            addCardText: {
                fontSize: dW(15),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.THEME_COLOR_PRIMARY,
            },
            btnView: {
                marginTop: dW(30),
                padding: dW(12),
                // margin:dW(15),
                position: 'absolute',
                bottom: 30,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: assets.Colors.BUTTON_THEME_COLOR,

            },
            btn: {
                fontSize: dW(20),
                color: 'white',
                textAlign: 'center',
                fontFamily: assets.fonts.ROBOTO_BOLD
            },






        })

    )

};

export default useStyle;