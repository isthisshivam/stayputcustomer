import { StyleSheet, Platform } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            topPadding: {
                padding: dW(20)
            },
            optional_container: {
                paddingHorizontal: dW(3)
            },
            unselected_content: {
                backgroundColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
                borderRadius: dW(20),
            },
            stores: {
                fontSize: dW(12),
                fontFamily: assets.fonts.ROBOTO_BOLD,
                paddingHorizontal: dW(15),
                paddingVertical: dW(15)
            },

            search_input: {
                marginTop: dW(15),
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
                paddingHorizontal: dW(20),
                paddingVertical: Platform.OS === 'android' ? dW(5) : dW(10),
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: assets.Colors.SEARCH_SHADOW_COLOR,
                shadowOffset: {
                    width: dW(0),
                    height: dW(10)
                },
                shadowRadius: dW(8),
                shadowOpacity: dW(1.8),
                elevation: 5,
                //backgroundColor : "#0000" // invisible color
            },
            search: {
                marginTop: dW(15),
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
                padding: dW(12),
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: dW(0.8),
                borderColor: assets.Colors.THEME_COLOR_PRIMARY,
                borderRadius: dW(5),
                marginLeft: dW(20),
                marginRight: dW(20)
            },
            placeHolder: {
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                fontSize: dW(16),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                marginLeft: dW(10),
                width: '82%'
            }


        })
    )
}
export default useStyle;