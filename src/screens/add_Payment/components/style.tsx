import { StyleSheet } from 'react-native';
import { dW } from '../../../utils/dynamicHeightWidth';
import assets from '../../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            headerView: {
                // padding:dW(10),
                
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom:10,
                
                

            },
            addPayment: {
                fontSize: dW(22),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
            },
            done: {
                fontSize: dW(17),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,

            }
        })

    );

}
export default useStyle;