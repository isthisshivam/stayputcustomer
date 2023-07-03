import { PRDUCTS_REFRESH,PRDUCT_DETAIL_REFRESH } from '../../constants/ReduxConstants';
export function doRefreshAction(doRefresh) {
    return {
        type: PRDUCTS_REFRESH,
        payload: doRefresh
    }
}

export function productDetailRefreshAction(doRefresh) {
    return {
        type: PRDUCT_DETAIL_REFRESH,
        payload: doRefresh
    }
}