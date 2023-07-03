import { StyleSheet } from 'react-native';
import { dW } from '../../../utils/dynamicHeightWidth';
import assets from '../../../assets';

const useStyle = () => {
    return StyleSheet.create({
        category_list: {
            marginTop: dW(20),
            paddingHorizontal: dW(20),
            flex: 1
        },
        list: {
            marginTop: dW(25),
        },
        categories_content: {
            margin: dW(5),
            alignItems: 'center',
            backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
            borderWidth: dW(0.8),
            borderRadius: dW(5),
            borderColor: assets.Colors.DEPARTMENT_BORDER_CLR,
            padding: dW(12),
            shadowColor: assets.Colors.ORDER_SHADOW,
            shadowOffset: {
                width: dW(0),
                height: dW(1)
            },
            shadowRadius: dW(8),
            shadowOpacity: dW(1.8),
            elevation: dW(4)
        },
        category_image: {
            marginTop: dW(10),
            height: dW(130),
            width: dW(130),
            alignSelf: 'center',
            resizeMode: 'contain'
        },
        category_Text: {
            fontSize: dW(12),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontFamily: assets.fonts.ROBOTO_MEDIUM,
            textAlign: 'center',
            paddingVertical: dW(10),
            width: dW(100)
        },

        title: {
            fontSize: dW(20),
            color: assets.Colors.SIGN_IN_COLOR,
            fontFamily: assets.fonts.ROBOTO_MEDIUM
        },


    })
}
export default useStyle;