import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            need_help: {
                textAlign: 'center',
                fontSize: dW(25),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_BOLD,
                marginTop: dW(30)
            },
            faq: {
                textAlign: 'center',
                fontSize: dW(18),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                marginTop: dW(30)
            },
            faqs_containor: {
                backgroundColor: 'white',
                marginTop: dW(15),
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: dW(5),
                borderRadius: dW(6),
                elevation: dW(5)
            },
            bottom_row: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: dW(20),
                paddingHorizontal: dW(10)
            },
            icon_text: {
                flexDirection: 'row',
                alignItems: 'center'
            },
            icon_bg: {
                alignItems: 'center',
                backgroundColor: assets.Colors.SECONDRY_CARDS_BG_COLOR,
                borderRadius: dW(25)
            },
            iconStyle: {
                paddingHorizontal: dW(5),
                paddingVertical: dW(5),
            },
            live_chat: {
                textAlign: 'center',
                fontSize: dW(15),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                marginLeft: dW(15)
            },




        })
    )
}
export default useStyle;