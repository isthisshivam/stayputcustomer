import { StyleSheet } from 'react-native';
import assets from '../../assets';
import { dW } from '../../utils/dynamicHeightWidth';

const useStyle = () => {
    return (
        StyleSheet.create({
            title: {
                textAlign: 'center',
                fontSize: dW(18),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_MEDIUM
            },
            header: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: dW(15),
                marginRight: dW(15),
            },
            webView: {
                height: '95%',
                width: '100%',
                alignSelf: 'center',
            },

        })
    )
}
export default useStyle;