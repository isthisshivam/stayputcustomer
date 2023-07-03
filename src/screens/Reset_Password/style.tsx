import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';
const useStyle = () => {
    return (
        StyleSheet.create({
            scrollContainer: {
                flex: 1,
                padding: dW(25),
            },
            logo: {
                height: dW(120),
                width: dW(120),
                alignSelf: 'center',
                resizeMode: 'contain',
            },
            subtitle: {
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                fontSize: dW(17),
                color: assets.Colors.SUB_TITLE_COLOR,
                textAlign: 'center',
            },
            spaceTop: {
                marginTop: dW(30)
            },

            space_vertical: {
                paddingVertical: dW(10),

            },

        })
    )
}
export default useStyle;