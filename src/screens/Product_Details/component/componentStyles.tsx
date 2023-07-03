import { StyleSheet } from 'react-native';
import { dW } from '../../../utils/dynamicHeightWidth';
import assets from '../../../assets';

const useStyle = () => {
    return StyleSheet.create({
        category_list: {
            marginLeft: dW(20),
        },
        category_image: {
            marginTop: dW(5),
            height: dW(50),
            width: dW(50),
            alignSelf: 'center',
            resizeMode: 'contain'
        },
        order_list: {
            marginTop: dW(30),
            marginLeft: dW(20),
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