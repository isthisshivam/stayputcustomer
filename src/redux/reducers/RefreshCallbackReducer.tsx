import { PRDUCTS_REFRESH, PRDUCT_DETAIL_REFRESH } from '../../constants/ReduxConstants';
const initialState = {
    refresh: false,
    product_detail_refresh:false
};
const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRDUCTS_REFRESH:
            return {
                ...state,
                refresh: action.payload
            };
        case PRDUCT_DETAIL_REFRESH:
            return {
                ...state,
                product_detail_refresh: action.payload
            };
        default:
            return state;
    }
}
export default countReducer;