import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            input_view: {
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: dW(1),
                borderRadius: dW(5),
                borderColor: assets.Colors.INPUT_BORDER_COLOR,
                paddingHorizontal: dW(15),
                paddingVertical: dW(10),
                marginTop:dW(25)
            },
            placeHolder: {
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                fontSize: dW(16),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                marginLeft: dW(10),
                width: '90%'
            }



        })
    )
}
export default useStyle;