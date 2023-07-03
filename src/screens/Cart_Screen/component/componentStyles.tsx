import { StyleSheet } from 'react-native';
import { dW } from '../../../utils/dynamicHeightWidth';
import assets from '../../../assets';

const useStyle = () => {
    return StyleSheet.create({
        cart_list: {
            flex: 1,
            borderBottomWidth: dW(0.5),
            borderColor: assets.Colors.CART_BORDER_CLR,
            paddingBottom: dW(35),
        },
        store_content: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: dW(25)
        },
        rightContent: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        store_icon: {
            height: dW(40),
            width: dW(40),
            alignSelf: 'center',
            borderRadius: dW(18),
            resizeMode: 'contain'
        },

        store: {
            textAlign: 'center',
            fontSize: dW(18),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontFamily: assets.fonts.ROBOTO_MEDIUM,
            marginLeft: dW(10),
        },
        items: {
            textAlign: 'center',
            fontSize: dW(14),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontFamily: assets.fonts.ROBOTO_REGULAR,
        },

        cart_content: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: dW(30),
        },

        image: {
            height: dW(50),
            width: dW(50),
            alignSelf: 'center',
            resizeMode: 'contain'
        },

        center_content: {
            flexDirection: 'column',
            marginLeft: dW(15),
        },
        titleTxt: {
            fontSize: dW(14),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            width:dW(150)
        },
        priceTxt: {
            marginTop: dW(10),
            fontSize: dW(16),
            fontFamily: assets.fonts.ROBOTO_BOLD,
            color: assets.Colors.ACCOUNT_TXT_COLOR,
        },
        qntityContent: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: dW(0.8),
            borderColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
            borderRadius: dW(15),
            paddingHorizontal: dW(10)
        },
        qty: {
            fontSize: dW(14),
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            textAlign: 'center',
            paddingVertical: dW(7),
            paddingHorizontal: dW(10),
            color:assets.Colors.ACCOUNT_TXT_COLOR
        },

        category_list: {
            marginTop: dW(35),
        },
        title: {
            fontSize: dW(16),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontFamily: assets.fonts.ROBOTO_MEDIUM
        },
        booster_container: {
            marginTop: dW(17),
            margin: dW(3),
            flexDirection: 'row',
            alignItems: 'center',
            padding: dW(5)
        },
        category_image: {
            height: dW(50),
            width: dW(60),
            alignSelf: 'center',
            resizeMode: 'contain',
            marginTop: dW(5)
        },
        booster_Right: {
            flexDirection: 'column',
            marginLeft: dW(10),
        },
        booster_title: {
            fontSize: dW(8),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontFamily: assets.fonts.ROBOTO_REGULAR,
        },
        booster_price: {
            fontSize: dW(10),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontFamily: assets.fonts.ROBOTO_BOLD,
            marginTop: dW(15)
        },
        booster_icon: {
            alignSelf: 'flex-start',
            borderWidth: dW(0.8),
            borderRadius: dW(15),
            justifyContent: 'center',
            top: dW(-8),
            padding: dW(3)
        },

    })
}
export default useStyle;