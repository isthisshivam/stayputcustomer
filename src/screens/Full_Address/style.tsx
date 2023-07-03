import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            mapview: {
                width: "100%",
                backgroundColor: 'white',
                height: "30%",
                borderRadius: dW(15),
                marginTop: dW(30),
            },
            map: {
                width: "100%",
                height: "100%",
                borderRadius: dW(10),
            },
            marker: {
                height: dW(40),
                width: dW(40),
                resizeMode: 'contain',
                alignSelf: 'center'
            },
            space_vertical: {
                paddingVertical: dW(10)
            },
            topMargin: {
                flex: 1,
                marginTop: dW(30),
            },
            row_inputs_view: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            addrsName: {
                fontSize: dW(16),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.BLACK_COLOR
            },
            input_row: {
                width: '50%',
            },
            horizontal_spacer: {
                width: dW(10)
            },
            container: {
                flex: 1,
                marginBottom: '50%'
            }

        })
    )
}
export default useStyle;