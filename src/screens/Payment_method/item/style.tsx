import { StyleSheet } from 'react-native';
import { dW } from '../../../utils/dynamicHeightWidth';
import assets from '../../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            container: {
                flexDirection: 'column',
                flex: 1,
            },
           
           
            text: {
                fontSize: dW(15),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                marginLeft: dW(12),
                color:assets.Colors.ACCOUNT_TXT_COLOR
            },
            cardView: {
                width: "100%",
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: dW(5),
                //backgroundColor:'red',
                padding: dW(10)
            },
            dot: {
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: dW(15),
                marginTop:dW(10),
                //backgroundColor:'green',
                fontSize: dW(25)

            },
            card: {
                color: assets.Colors.INPUT_HOLDER_TXT_COLOR,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: dW(15),
                fontSize: dW(15)
            },
            radiobtnContainer:{
                marginLeft: 10 
            }



        })

    )

};

export default useStyle;