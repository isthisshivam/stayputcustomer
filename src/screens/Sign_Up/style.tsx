import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            bottom_space: {
                flex: 1,
                backgroundColor:assets.Colors.BACKGROUND_THEME_COLOR,
                marginBottom: dW(60)
            },
            center_content: {
                marginTop: dW(20),
                justifyContent: 'center'
            },
            logoStyle: {
                marginTop: dW(40),
                height: dW(70),
                width: dW(100),
                alignSelf: 'center',
                resizeMode: 'contain'
            },

            subtitle: {
                fontSize: dW(18),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.SUB_TITLE_COLOR,
                textAlign: 'center',
                marginTop: dW(20),
            },
            accountSignin_View: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: dW(30),
            },
            hveAccnt: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                alignSelf: 'center',
            },
            sign_in: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.SIGN_IN_COLOR,
                alignSelf: 'center',
                textDecorationLine: 'underline'
            },
            bttn_width: {
                marginTop: dW(10),
            },
            row_inputs_view: {
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            input_row: {
                width: '45%',
            },
            horizontal_spacer: {
                width: dW(10)
            },
            space_vertical: {
                paddingVertical: dW(10)
            },

            input_view: {
                flexDirection: 'column',
                marginTop: dW(10),
                justifyContent: 'center',
                borderColor: assets.Colors.INPUT_BORDER_COLOR,
                width: '100%'
            },
            input_title: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.INPUT_TITLE_COLOR,
            },
            placeholder: {
                width: '100%',
                marginTop: dW(5),
                paddingVertical: dW(8),
                color: assets.Colors.BLACK_COLOR,
                borderColor: assets.Colors.INPUT_BORDER_COLOR,
                borderBottomWidth: dW(0.5),
                fontSize: dW(16),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
            },

            show: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.INPUT_TITLE_COLOR,
                position: 'absolute',
                textAlign: 'center',
                right: dW(0),
                bottom: dW(20)
            },
            bottom_view: {
                flexDirection: 'column',
                marginTop: dW(20),
                alignItems: 'center',
                height: dW(50)
            },
            bottom_row: {
                flexDirection: 'row',
            },
            bottomTxt: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.TITLE_COLOR
            },
            terms_condition: {
                fontSize: dW(14),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                color: assets.Colors.TERMS_CONDITION_COLOR,
                textAlign: 'auto',
            },
            spaceTop: {
                marginTop: dW(20)
            },


        })
    )
}
export default useStyle;
