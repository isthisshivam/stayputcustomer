import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';
const useStyle = () => {
    return (
        StyleSheet.create({
           
            bottom: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: dW(25),
                bottom: 0
            },
            bottom_left: {
                flexDirection: 'column',
                alignItems: 'center'
            },
            subtotal: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                fontSize: dW(14)
            },
            price: {
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_BOLD,
                fontSize: dW(24),
                marginTop: (5)
            },
            bottom_right: {
                backgroundColor: assets.Colors.ACTIVE_STORES_BG_COLOR,
                justifyContent: 'center',
                borderRadius: dW(3)
            },
            checkOut: {
                fontSize: dW(18),
                fontFamily: assets.fonts.ROBOTO_BOLD,
                color: assets.Colors.BACKGROUND_THEME_COLOR,
                padding: dW(15)
            }

        })
    )
}
export default useStyle;