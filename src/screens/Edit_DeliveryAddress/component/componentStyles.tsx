import { StyleSheet } from 'react-native';
import { dW } from '../../../utils/dynamicHeightWidth';
import assets from '../../../assets';

const useStyle = () => {
    return StyleSheet.create({
        address_list: {
            flex: 1,
            marginTop: dW(15),
        },
        categories_content: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: dW(10),
        },
        icon_addrs: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        address_content: {
            flexDirection: 'column',
            marginLeft: dW(15),
        },
        roadTxt: {
            fontSize: dW(18),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontFamily: assets.fonts.ROBOTO_REGULAR
        },
        areaTxt: {
            marginTop: dW(10),
            fontSize: dW(14),
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
        },
        bottomStyle: {
            flexDirection: 'row',
            marginTop: dW(30),
            alignContent: 'center',
        },
        currentLocation: {
            fontSize: dW(16),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontFamily: assets.fonts.ROBOTO_MEDIUM
        }

    })
}
export default useStyle;