import { StyleSheet } from 'react-native';
import { dW } from '../../utils/dynamicHeightWidth';
import assets from '../../assets';

const useStyle = () => {
return(
    StyleSheet.create({
    
        parentView:{
            flex:1,
            //padding:dW(20),
            
        },
       
    })

);
};
export default useStyle;