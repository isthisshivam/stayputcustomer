import { StyleSheet } from 'react-native';
import { dW } from '../../../utils/dynamicHeightWidth';
import assets from '../../../assets';

const useStyle = () => {
    return StyleSheet.create({
        common_content: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: dW(30),
            width: '100%'
        },
        icon_right: {
            flexDirection: 'row',
            justifyContent: 'space-between',

        },
        center_content: {
            flexDirection: 'column',
            alignSelf: 'flex-start',
            width: '80%',
            marginRight: dW(22)
        },
        address_content: {
            flexDirection: 'column',
            width: '80%',
            marginRight: dW(20),
            alignSelf: 'flex-start'
        },
        title: {
            fontSize: dW(18),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontFamily: assets.fonts.ROBOTO_MEDIUM,

        },
        subtitle: {
            marginTop: dW(8),
            fontSize: dW(14),
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
        },



        address_list: {
            marginTop: dW(30),
        },
        delivery_content: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: dW(10),
        },
        roadTxt: {
            fontSize: dW(18),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            width: '78%'
        },
        areaTxt: {
            marginTop: dW(10),
            fontSize: dW(14),
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
        },
        addAddress: {
            fontSize: dW(14),
            fontFamily: assets.fonts.ROBOTO_MEDIUM,
            color: assets.Colors.SIGN_IN_COLOR,
            marginTop: dW(15),
            alignSelf: 'flex-end'
        },

        msg: {
            fontSize: dW(14),
            color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
            paddingVertical: dW(5)
        },

        input_view: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: dW(0.8),
            borderColor: assets.Colors.INPUT_BORDER_COLOR,
            padding: dW(15),
            borderRadius: dW(5)
        },
        placeHolder: {
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            fontSize: dW(16),
            fontFamily: assets.fonts.ROBOTO_REGULAR,
            marginLeft: dW(10),
            width: '90%'
        },
        tipContainer: {
            borderRadius: dW(3),
            marginLeft: dW(3),
        },
        tipTXT: {
            fontSize: dW(16),
            fontFamily: assets.fonts.ROBOTO_BOLD,
            padding: dW(20)
        },
        paymantTxt: {
            fontSize: dW(18),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            marginLeft: dW(15),
        },
        subtotal_content: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        items_container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: dW(25),

        },
        rowright: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        scheduleTime_Txt: {
            fontSize: dW(16),
            fontFamily: assets.fonts.ROBOTO_MEDIUM,
            color: assets.Colors.TERMS_CONDITION_COLOR,
            marginLeft: dW(10),
            textAlign: 'center',
        },
        cmnt: {
            fontSize: dW(14),
            color: assets.Colors.ACCOUNT_TXT_COLOR,
            textAlign: 'center',
        },

    })
}
export default useStyle;