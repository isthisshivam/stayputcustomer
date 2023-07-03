import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
    return (
        StyleSheet.create({
            screenContainer: {
                flex: 1,
                paddingHorizontal: dW(20)
            },
            product_Container: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignContent: 'center',
                marginTop: dW(20)
            },
            image: {
                height: dW(80),
                width: dW(80),
                alignSelf: 'center',
                resizeMode: 'contain',
            },
            title_rating_column: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: dW(20),
            },
            brand_title: {
                fontSize: dW(18),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
            },
            ratingTxt: {
                fontSize: dW(10),
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                textAlign: 'center',
                marginLeft: dW(5)
            },

            tabHeader: {
                backgroundColor: assets.Colors.INACTIVE_STORE_BG_COLOR,
                borderRadius: dW(25),
                marginTop: dW(20),
            },
            tab_title: {
                flex: 1,
                fontSize: dW(13),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                textTransform: 'capitalize',
                paddingHorizontal: dW(0.5),
                textAlign: 'center'
            },
            tab_BG: {
                borderRadius: dW(25),
                justifyContent: 'center',
                
            },
            tabContainer: {
                flex: 1,
                
                backgroundColor: assets.Colors.BACKGROUND_THEME_COLOR,
                alignContent: 'center',
                
            },


            model_sku_View: {
                flexDirection: 'row',
                alignItems: 'center',
                
                
                paddingVertical: dW(25),
               
            },
            normal_txt: { 
                flex:1,
                fontSize: dW(16),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                marginTop: dW(3),
            },
            bold_txt: {
                flex:.75,
                fontSize: dW(16),
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
                marginTop: dW(3),
            },
            normal_Txt: {
                fontSize: dW(13),
                fontFamily: assets.fonts.ROBOTO_REGULAR,
                marginLeft: dW(20),
                marginTop: dW(3),
            },
            htmlContainer: {
                flex: 1,
               
            },
            detailsBottom_rowContent: {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: dW(10),
                padding:dW(8),
                flex:1,

            },
            product_qntity: {
                fontSize: dW(16),
                width:"50%",
                color: assets.Colors.ACCOUNT_TXT_COLOR,
                fontFamily: assets.fonts.ROBOTO_MEDIUM,
            },


        })
    )
}
export default useStyle;