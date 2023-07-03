import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            bg: {
                flex: 1,
                backgroundColor: assets.Colors.SHADOW_COLOR,
            },
            screen_bg: {
                flex: 1,
                marginTop: dW(20),
                borderTopRightRadius: dW(14),
                borderTopLeftRadius: dW(14),
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
            },
            topView: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: dW(20),
            },
            title: {
                alignSelf: 'center',
                fontSize: dW(22),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_MEDIUM
            },
            weekContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderColor: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                borderBottomWidth: dW(0.5),
                paddingHorizontal: dW(35),
                paddingVertical: dW(8)
            },
            dayName: {
                fontSize: dW(16),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                textAlign: 'center',
                color: assets.Colors.PRICE_DETAILS_CLR
            },
            monthName: {
                textTransform: 'uppercase',
                fontSize: dW(16),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center',
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                paddingVertical: dW(20),
                right: dW(88),
            },
            boxConatiner: {
                // backgroundColor: assets.Colors.BUTTON_THEME_COLOR,
                height: dW(48),
                width: dW(48),
                justifyContent: 'center',
            },
            date_container: {
                height: dW(38),
                width: dW(38),
                justifyContent: 'center',
                alignSelf: 'center'
            },
            date: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textAlign: 'center',
            }




        })

    );
};
export default useStyle;