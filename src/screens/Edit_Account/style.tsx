import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            profile_container: {
                marginTop: dW(30),
                alignSelf: 'center',
                alignItems:'center',
                height: dW(129),
                width: dW(129),
                borderRadius: dW(65),
                shadowColor: assets.Colors.ORDER_SHADOW,
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
                shadowOffset: {
                    width: dW(1),
                    height: dW(8)
                },
                shadowRadius: dW(5),
                shadowOpacity: dW(1.8),
                elevation: dW(5)
            },
            profile:{
                height: dW(129),
                width: dW(129),
                borderRadius: dW(65),
                resizeMode:'contain',
                alignSelf:'center'
            },
            add_photo: {
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                fontSize: dW(14),
                color: assets.Colors.PRICE_DETAILS_CLR,
                marginTop: dW(8),
                textAlign: 'center'
            },
            topmargin: {
                marginTop: dW(40)
            },
            row_inputs_view: {
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            input_row: {
                width: '50%',
            },
            horizontal_spacer: {
                width: dW(10)
            },
            space_vertical: {
                paddingVertical: dW(10)
            },
            row_center: {
                flexDirection: 'row',
                alignItems: 'center'
            },
            change: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                position: 'absolute',
                textAlign: 'center',
                right: dW(0)
            }


        })
    )
}
export default useStyle;